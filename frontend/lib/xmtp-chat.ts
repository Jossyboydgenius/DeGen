import { Client, type XmtpEnv, type DecodedMessage } from "@xmtp/node-sdk";
import { TransactionReferenceCodec, type TransactionReference } from "@xmtp/content-type-transaction-reference";
import {
  ContentTypeWalletSendCalls,
  WalletSendCallsCodec,
  type WalletSendCallsParams,
} from "@xmtp/content-type-wallet-send-calls";
import { createSigner, getEncryptionKeyFromHex } from "./helpers/client";
import { USDCHandler } from "./usdc-service";
import Groq from "groq-sdk";
import { useState } from "react";

// Define the union type for all content types
type ContentTypes = string | TransactionReference | WalletSendCallsParams;

// XMTP Chat Handler Class
export class XMTPChatHandler {
  private client: Client<ContentTypes> | null = null;
  private usdcHandler: USDCHandler;
  private groq: Groq;
  private agentAddress: string = "";

  constructor(
    private walletKey: string,
    private encryptionKey: string,
    private xmtpEnv: XmtpEnv,
    private networkId: string,
    private groqApiKey: string
  ) {
    this.usdcHandler = new USDCHandler(networkId);
    this.groq = new Groq({
      apiKey: groqApiKey,
      dangerouslyAllowBrowser: true // Enable for browser usage
    });
  }

  // Initialize XMTP client
  async initialize(): Promise<void> {
    try {
      const signer = createSigner(this.walletKey);
      const dbEncryptionKey = getEncryptionKeyFromHex(this.encryptionKey);

      this.client = await Client.create(signer, {
        dbEncryptionKey,
        env: this.xmtpEnv,
        codecs: [new WalletSendCallsCodec(), new TransactionReferenceCodec()],
      }) as Client<ContentTypes>;

      const identifier = await signer.getIdentifier();
      this.agentAddress = identifier.identifier;

      console.log("✓ XMTP Client initialized");
      await this.client.conversations.sync();
      console.log("✓ Conversations synced");
    } catch (error) {
      console.error("Failed to initialize XMTP client:", error);
      throw error;
    }
  }

  // Get agent address
  getAgentAddress(): string {
    return this.agentAddress;
  }

  // Start listening for messages
  async startMessageListener(onMessage: (message: any) => void): Promise<void> {
    if (!this.client) {
      throw new Error("Client not initialized");
    }

    console.log("Waiting for messages...");
    const stream = await this.client.conversations.streamAllMessages();

    for await (const message of stream) {
      if (
        message?.senderInboxId.toLowerCase() === this.client.inboxId.toLowerCase() ||
        message?.contentType?.typeId !== "text"
      ) {
        continue;
      }

      console.log(
        `Received message: ${message.content as string} by ${message.senderInboxId}`
      );

      const conversation = await this.client.conversations.getConversationById(
        message.conversationId
      );

      if (!conversation) {
        console.log("Unable to find conversation, skipping");
        continue;
      }

      const inboxState = await this.client.preferences.inboxStateFromInboxIds([
        message.senderInboxId,
      ]);
      const memberAddress = inboxState[0]?.identifiers[0]?.identifier;
      
      if (!memberAddress) {
        console.log("Unable to find member address, skipping");
        continue;
      }

      onMessage({
        content: message.content as string,
        senderAddress: memberAddress,
        conversation: conversation,
        timestamp: new Date().toISOString()
      });
    }
  }

  // Process AI command using Groq
  async processAICommand(command: string, senderAddress: string): Promise<string> {
    const lowerCommand = command.toLowerCase().trim();

    try {
      // Handle specific commands
      if (lowerCommand === "/balance") {
        const result = await this.usdcHandler.getUSDCBalance(this.agentAddress);
        return `Your USDC balance is: ${result} USDC`;
      } 
      
      if (lowerCommand.startsWith("/tx ")) {
        const amount = parseFloat(lowerCommand.split(" ")[1]);
        if (isNaN(amount) || amount <= 0) {
          return "Please provide a valid amount. Usage: /tx <amount>";
        }
        return `Transaction prepared for ${amount} USDC. Wallet interaction required to complete.`;
      }

      if (lowerCommand === "/help") {
        return `Available commands:

/balance - Check your USDC balance
/tx <amount> - Send USDC to the agent (e.g. /tx 0.1)
/help - Show available commands

You can also ask me about DeFi, trading, or any blockchain-related questions!`;
      }

      // Use Groq for general AI responses
      const completion = await this.groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a helpful DeFi and blockchain assistant. You can help users with:
            - Understanding DeFi protocols and concepts
            - Explaining blockchain transactions
            - Providing market insights
            - Answering crypto-related questions
            
            Keep responses concise and helpful. If users need to perform transactions, guide them to use the /tx command.`
          },
          {
            role: "user",
            content: command
          }
        ],
        model: "llama3-8b-8192",
        temperature: 0.7,
        max_tokens: 500,
      });

      return completion.choices[0]?.message?.content || "I'm sorry, I couldn't process your request.";
    } catch (error) {
      console.error("Error processing AI command:", error);
      return "Sorry, I encountered an error processing your command.";
    }
  }

  // Send message to conversation
  async sendMessage(conversationId: string, content: string): Promise<void> {
    if (!this.client) {
      throw new Error("Client not initialized");
    }

    const conversation = await this.client.conversations.getConversationById(conversationId);
    if (!conversation) {
      throw new Error("Conversation not found");
    }

    await conversation.send(content);
  }

  // Create USDC transfer transaction
  async createUSDCTransfer(recipientAddress: string, amount: number): Promise<any> {
    const amountInDecimals = Math.floor(amount * Math.pow(10, 6));
    return this.usdcHandler.createUSDCTransferCalls(
      recipientAddress,
      this.agentAddress,
      amountInDecimals
    );
  }

  // Send wallet send calls
  async sendWalletCalls(conversationId: string, walletSendCalls: WalletSendCallsParams): Promise<void> {
    if (!this.client) {
      throw new Error("Client not initialized");
    }

    const conversation = await this.client.conversations.getConversationById(conversationId);
    if (!conversation) {
      throw new Error("Conversation not found");
    }

    await conversation.send(walletSendCalls, ContentTypeWalletSendCalls);
  }

  // Check if client is initialized
  isInitialized(): boolean {
    return this.client !== null;
  }
}

// React Hook for XMTP Chat
export function useXMTPChat() {
  const [chatHandler, setChatHandler] = useState<XMTPChatHandler | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialize = async (config: {
    walletKey: string;
    encryptionKey: string;
    xmtpEnv: XmtpEnv;
    networkId: string;
    groqApiKey: string;
  }) => {
    try {
      setError(null);
      const handler = new XMTPChatHandler(
        config.walletKey,
        config.encryptionKey,
        config.xmtpEnv,
        config.networkId,
        config.groqApiKey
      );

      await handler.initialize();
      setChatHandler(handler);
      setIsInitialized(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to initialize XMTP';
      setError(errorMessage);
      setIsInitialized(false);
      console.error('XMTP initialization error:', err);
      throw new Error(errorMessage);
    }
  };

  const sendMessage = async (conversationId: string, content: string) => {
    if (!chatHandler || !chatHandler.isInitialized()) {
      throw new Error('Chat handler not initialized');
    }
    await chatHandler.sendMessage(conversationId, content);
  };

  const processAIMessage = async (message: string, senderAddress: string) => {
    if (!chatHandler || !chatHandler.isInitialized()) {
      throw new Error('Chat handler not initialized');
    }
    return await chatHandler.processAICommand(message, senderAddress);
  };

  const createTransaction = async (recipientAddress: string, amount: number) => {
    if (!chatHandler || !chatHandler.isInitialized()) {
      throw new Error('Chat handler not initialized');
    }
    return await chatHandler.createUSDCTransfer(recipientAddress, amount);
  };

  const getAgentAddress = () => {
    return chatHandler?.getAgentAddress() || '';
  };

  const startListening = async (onMessage: (message: any) => void) => {
    if (!chatHandler || !chatHandler.isInitialized()) {
      throw new Error('Chat handler not initialized');
    }
    await chatHandler.startMessageListener(onMessage);
  };

  const reset = () => {
    setChatHandler(null);
    setIsInitialized(false);
    setError(null);
  };

  return {
    initialize,
    sendMessage,
    processAIMessage,
    createTransaction,
    getAgentAddress,
    startListening,
    reset,
    isInitialized,
    error,
    chatHandler
  };
}