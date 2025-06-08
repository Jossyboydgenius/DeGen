'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MessageSquare, 
  Bell, 
  ShieldAlert, 
  CheckCircle, 
  AlertCircle,
  Info,
  MessageCircle,
  Bot,
  Send,
  Plus,
  Trash2,
  X,
  User,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

type MessageCategory = 'all' | 'notifications' | 'security' | 'transactions' | 'chats' | 'ai-chat';
type MessageStatus = 'read' | 'unread';

interface Message {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
  category: 'notifications' | 'security' | 'transactions';
  status: MessageStatus;
  actionable: boolean;
}

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai' | 'other';
  timestamp: string;
  senderAddress?: string;
}

interface Chat {
  id: string;
  name: string;
  lastMessage?: string;
  timestamp: string;
  unreadCount: number;
  isAI?: boolean;
  participantAddress?: string;
}

interface MessageListProps {
  className?: string;
}

// Mock data for regular messages
const mockMessages: Message[] = [
  {
    id: 'm1',
    title: 'Transaction Approved',
    preview: 'Your payment of ₵250 to ABC Store has been approved and processed.',
    timestamp: '2025-01-15 15:30',
    category: 'transactions',
    status: 'unread',
    actionable: false,
  },
  {
    id: 'm2',
    title: 'Security Alert',
    preview: 'A new device was used to access your account. Please verify if this was you.',
    timestamp: '2025-01-14 09:15',
    category: 'security',
    status: 'unread',
    actionable: true,
  },
  {
    id: 'm3',
    title: 'Yield Farming Update',
    preview: 'Your staked assets generated 2.5 USDC in rewards today.',
    timestamp: '2025-01-13 22:45',
    category: 'notifications',
    status: 'read',
    actionable: false,
  },
  {
    id: 'm4',
    title: 'Approval Request',
    preview: 'Mobile Money agent 0277123456 is requesting approval for a withdrawal of ₵500.',
    timestamp: '2025-01-13 14:20',
    category: 'security',
    status: 'unread',
    actionable: true,
  },
  {
    id: 'm5',
    title: 'Transaction Failed',
    preview: 'Your transfer of ₵75 to Utility Co. has failed due to insufficient funds.',
    timestamp: '2025-01-10 16:10',
    category: 'transactions',
    status: 'read',
    actionable: false,
  },
];

// XMTP AI Chat Component with Groq Integration
function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const [config, setConfig] = useState({
    groqApiKey: '',
    walletKey: '',
    encryptionKey: ''
  });
  const [showConfig, setShowConfig] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load AI chat messages and config from localStorage
    const savedMessages = JSON.parse(localStorage?.getItem('ai-chat-messages') || '[]');
    const savedConfig = JSON.parse(localStorage?.getItem('xmtp-config') || '{}');
    setMessages(savedMessages);
    
    if (savedConfig.groqApiKey && savedConfig.walletKey && savedConfig.encryptionKey) {
      setConfig(savedConfig);
      setIsConfigured(true);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const saveMessages = (newMessages: ChatMessage[]) => {
    setMessages(newMessages);
    localStorage?.setItem('ai-chat-messages', JSON.stringify(newMessages));
  };

  const saveConfig = (newConfig: typeof config) => {
    setConfig(newConfig);
    localStorage?.setItem('xmtp-config', JSON.stringify(newConfig));
    setIsConfigured(true);
    setShowConfig(false);
  };

  const processAICommand = async (command: string): Promise<string> => {
    const lowerCommand = command.toLowerCase().trim();
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      if (lowerCommand.includes('/balance')) {
        return "🔍 Checking your balance...\n\n💰 Your USDC balance is: 125.50 USDC\n\nNetwork: Base Sepolia\nLast updated: Just now";
      } 
      
      if (lowerCommand.startsWith('/tx ')) {
        const amount = lowerCommand.split(' ')[1];
        if (!amount || isNaN(parseFloat(amount))) {
          return "❌ Invalid amount. Please use: /tx <amount>\n\nExample: /tx 10.5";
        }
        return `🔄 Transaction initiated for ${amount} USDC\n\n⏳ Please confirm in your wallet to complete the transfer.\n\nThis will send ${amount} USDC to the AI agent address.`;
      }
      
      if (lowerCommand.includes('/help')) {
        return `🤖 **AI DeFi Assistant Commands**

**Transaction Commands:**
• /balance - Check your USDC balance
• /tx <amount> - Send USDC to agent (e.g., /tx 0.1)

**General Commands:**
• /help - Show this help menu
• /status - Check system status

**What I can help with:**
• DeFi protocol explanations
• Market analysis and insights  
• Blockchain transaction guidance
• Cryptocurrency education

Just type your question and I'll help! 🚀`;
      }
      
      if (lowerCommand.includes('/status')) {
        return `🟢 **System Status**

✅ XMTP Client: Connected
✅ Groq AI: Operational  
✅ Base Network: Online
✅ USDC Contract: Active

🔗 Network: Base Sepolia
🤖 AI Model: Llama3-8B
📡 Last sync: Just now`;
      }

      // For general questions, simulate Groq AI response
      if (config.groqApiKey) {
        const responses = [
          "That's a great question about DeFi! Based on current market conditions, I'd recommend starting with established protocols like Uniswap or Aave for beginners.",
          "Yield farming can be profitable but comes with risks like impermanent loss. Always DYOR (Do Your Own Research) and start with small amounts.",
          "Gas fees on Ethereum can be high, which is why Layer 2 solutions like Base are becoming popular for DeFi transactions.",
          "The key to successful DeFi investing is diversification and understanding the protocols you're using. Never invest more than you can afford to lose.",
          "Stablecoins like USDC are great for earning yield while maintaining lower volatility compared to other crypto assets."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        return `🤖 ${randomResponse}\n\nNeed specific help? Try these commands:\n• /balance\n• /tx <amount>\n• /help`;
      }

      return "🤖 I'm your DeFi assistant! I can help you check balances, send transactions, and answer crypto questions.\n\nType '/help' for available commands or just ask me anything about DeFi! 🚀";
    } catch (error) {
      return "❌ Sorry, I encountered an error processing your request. Please try again.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isProcessing) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      content: inputValue,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMessage];
    saveMessages(updatedMessages);
    setInputValue('');
    setIsProcessing(true);

    try {
      const aiResponse = await processAICommand(inputValue);
      const aiMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };

      saveMessages([...updatedMessages, aiMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        content: 'Sorry, I encountered an error processing your request.',
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };
      saveMessages([...updatedMessages, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage?.removeItem('ai-chat-messages');
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
          size="icon"
        >
          <Bot className="h-6 w-6" />
        </Button>
      </div>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-6">
          <div className="bg-background border rounded-lg shadow-2xl w-96 h-[500px] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">AI DeFi Assistant</h3>
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  isConfigured ? "bg-green-500" : "bg-yellow-500"
                )} />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowConfig(!showConfig)}
                  className="h-8 w-8"
                >
                  <Settings className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearChat}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Configuration Panel */}
            {showConfig && (
              <div className="p-4 border-b bg-muted/30">
                <h4 className="font-medium mb-3">XMTP Configuration</h4>
                <div className="space-y-2">
                  <Input
                    placeholder="Groq API Key"
                    type="password"
                    value={config.groqApiKey}
                    onChange={(e) => setConfig({...config, groqApiKey: e.target.value})}
                    className="text-xs"
                  />
                  <Input
                    placeholder="Wallet Private Key"
                    type="password"
                    value={config.walletKey}
                    onChange={(e) => setConfig({...config, walletKey: e.target.value})}
                    className="text-xs"
                  />
                  <Input
                    placeholder="Encryption Key"
                    type="password"
                    value={config.encryptionKey}
                    onChange={(e) => setConfig({...config, encryptionKey: e.target.value})}
                    className="text-xs"
                  />
                  <Button 
                    onClick={() => saveConfig(config)} 
                    size="sm" 
                    className="w-full"
                    disabled={!config.groqApiKey || !config.walletKey || !config.encryptionKey}
                  >
                    Save Configuration
                  </Button>
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground">
                  <Bot className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="font-medium">Hi! I&apos;m your DeFi assistant 🚀</p>
                  <p className="text-sm mb-2">I can help you with transactions and DeFi questions!</p>
                  {!isConfigured && (
                    <div className="text-xs bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded p-2 mt-2">
                      ⚙️ Click the settings icon to configure XMTP
                    </div>
                  )}
                  <p className="text-sm mt-2">Type &apos;/help&apos; to see what I can do!</p>
                </div>
              )}
              
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-2",
                    message.sender === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  {message.sender === 'ai' && (
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] p-3 rounded-lg text-sm whitespace-pre-wrap",
                      message.sender === 'user'
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    {message.content}
                  </div>
                  {message.sender === 'user' && (
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <User className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              ))}
              
              {isProcessing && (
                <div className="flex gap-2 justify-start">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={isConfigured ? "Type a message or /command..." : "Configure settings first..."}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isProcessing || !isConfigured}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isProcessing || !isConfigured}
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {!isConfigured && (
                <p className="text-xs text-muted-foreground mt-1">
                  Configure your XMTP settings to start chatting
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Regular Chat Component
function ChatList() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newChatAddress, setNewChatAddress] = useState('');

  useEffect(() => {
    // Load chats from localStorage
    const savedChats = JSON.parse(localStorage?.getItem('user-chats') || '[]');
    setChats(savedChats);
  }, []);

  const saveChats = (newChats: Chat[]) => {
    setChats(newChats);
    localStorage?.setItem('user-chats', JSON.stringify(newChats));
  };

  const createNewChat = () => {
    if (!newChatAddress.trim()) return;

    const newChat: Chat = {
      id: `chat-${Date.now()}`,
      name: `Chat with ${newChatAddress.slice(0, 6)}...${newChatAddress.slice(-4)}`,
      timestamp: new Date().toISOString(),
      unreadCount: 0,
      participantAddress: newChatAddress,
    };

    saveChats([newChat, ...chats]);
    setNewChatAddress('');
  };

  const deleteChat = (chatId: string) => {
    const updatedChats = chats.filter(chat => chat.id !== chatId);
    saveChats(updatedChats);
    if (selectedChat === chatId) {
      setSelectedChat(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* New Chat Input */}
      <div className="flex gap-2 p-2 bg-muted/30 rounded-lg">
        <Input
          value={newChatAddress}
          onChange={(e) => setNewChatAddress(e.target.value)}
          placeholder="Enter wallet address to start chat..."
          className="flex-1"
        />
        <Button 
          onClick={createNewChat} 
          size="sm"
          disabled={!newChatAddress.trim()}
        >
          <Plus className="h-4 w-4 mr-1" />
          Start Chat
        </Button>
      </div>

      {/* Chat List */}
      <div className="space-y-2">
        {chats.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p className="font-medium">No chats yet</p>
            <p className="text-sm">Start a new chat by entering a wallet address above</p>
          </div>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              className={cn(
                "group relative rounded-lg p-4 transition-colors hover:bg-muted/50 cursor-pointer border",
                selectedChat === chat.id && "bg-primary/5 border-primary/20"
              )}
              onClick={() => setSelectedChat(chat.id)}
            >
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate">{chat.name}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChat(chat.id);
                      }}
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  {chat.lastMessage && (
                    <p className="mt-1 text-sm text-muted-foreground truncate">
                      {chat.lastMessage}
                    </p>
                  )}
                  
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {new Date(chat.timestamp).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    
                    {chat.unreadCount > 0 && (
                      <Badge variant="default" className="h-5 px-2 text-xs">
                        {chat.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export function MessageList({ className }: MessageListProps) {
  const [filter, setFilter] = useState<MessageCategory>('all');

  const filteredMessages = mockMessages.filter((message) => {
    if (filter === 'all') return true;
    return message.category === filter;
  });

  const getCategoryIcon = (category: 'notifications' | 'security' | 'transactions') => {
    switch (category) {
      case 'notifications':
        return <Bell className="h-4 w-4" />;
      case 'security':
        return <ShieldAlert className="h-4 w-4" />;
      case 'transactions':
        return <Info className="h-4 w-4" />;
    }
  };

  return (
    <>
      <Card className={cn("border-0", className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Messages
          </CardTitle>
        </CardHeader>
        <CardContent className="px-2">
          <Tabs defaultValue="all" onValueChange={(value) => setFilter(value as MessageCategory)}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Updates</TabsTrigger>
              <TabsTrigger value="chats">Chats</TabsTrigger>
              <TabsTrigger value="ai-chat">AI Chat</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chats" className="mt-4">
              <ChatList />
            </TabsContent>
            
            <TabsContent value="ai-chat" className="mt-4">
              <div className="py-8 text-center text-muted-foreground">
                <Bot className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="font-medium">AI DeFi Assistant</p>
                <p className="text-sm mb-4">Click the floating chat button to start chatting with the AI assistant</p>
                <div className="text-xs bg-muted p-3 rounded-lg text-left max-w-sm mx-auto">
                  <strong>Available Commands:</strong><br/>
                  /balance - Check USDC balance<br/>
                  /tx &lt;amount&gt; - Send USDC<br/>
                  /help - Show all commands<br/>
                  /status - Check system status
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value={filter} className="mt-4 space-y-4">
              {['all', 'transactions', 'security', 'notifications'].includes(filter) && (
                <>
                  {filteredMessages.length === 0 ? (
                    <div className="py-8 text-center text-muted-foreground">
                      No messages found
                    </div>
                  ) : (
                    filteredMessages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "relative rounded-lg p-4 transition-colors hover:bg-muted/50",
                          message.status === 'unread' && "bg-primary/5"
                        )}
                      >
                        {message.status === 'unread' && (
                          <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-primary"></div>
                        )}
                        
                        <div className="flex gap-3">
                          <div className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                            message.category === 'transactions' && "bg-blue-100 text-blue-600 dark:bg-blue-900/30",
                            message.category === 'security' && "bg-red-100 text-red-600 dark:bg-red-900/30",
                            message.category === 'notifications' && "bg-green-100 text-green-600 dark:bg-green-900/30"
                          )}>
                            {getCategoryIcon(message.category)}
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{message.title}</h3>
                              {message.actionable && (
                                <Badge variant="outline" className="text-[10px]">ACTION REQUIRED</Badge>
                              )}
                            </div>
                            
                            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                              {message.preview}
                            </p>
                            
                            <div className="mt-2 flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {new Date(message.timestamp).toLocaleString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                              
                              {message.actionable && (
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline" className="h-8 px-3 text-xs">
                                    Decline
                                  </Button>
                                  <Button size="sm" className="h-8 px-3 text-xs">
                                    Approve
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  
                  <Button variant="ghost" className="w-full">
                    View all messages
                  </Button>
                </>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* AI Chat Widget */}
      <AIChatWidget />
    </>
  );
}



// 'use client';

// import { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { 
//   MessageSquare, 
//   Bell, 
//   ShieldAlert, 
//   CheckCircle, 
//   AlertCircle,
//   Info
// } from 'lucide-react';
// import { cn } from '@/lib/utils';

// type MessageCategory = 'all' | 'notifications' | 'security' | 'transactions';
// type MessageStatus = 'read' | 'unread';

// interface Message {
//   id: string;
//   title: string;
//   preview: string;
//   timestamp: string;
//   category: 'notifications' | 'security' | 'transactions';
//   status: MessageStatus;
//   actionable: boolean;
// }

// interface MessageListProps {
//   className?: string;
// }

// const mockMessages: Message[] = [
//   {
//     id: 'm1',
//     title: 'Transaction Approved',
//     preview: 'Your payment of ₵250 to ABC Store has been approved and processed.',
//     timestamp: '2025-01-15 15:30',
//     category: 'transactions',
//     status: 'unread',
//     actionable: false,
//   },
//   {
//     id: 'm2',
//     title: 'Security Alert',
//     preview: 'A new device was used to access your account. Please verify if this was you.',
//     timestamp: '2025-01-14 09:15',
//     category: 'security',
//     status: 'unread',
//     actionable: true,
//   },
//   {
//     id: 'm3',
//     title: 'Yield Farming Update',
//     preview: 'Your staked assets generated 2.5 USDC in rewards today.',
//     timestamp: '2025-01-13 22:45',
//     category: 'notifications',
//     status: 'read',
//     actionable: false,
//   },
//   {
//     id: 'm4',
//     title: 'Approval Request',
//     preview: 'Mobile Money agent 0277123456 is requesting approval for a withdrawal of ₵500.',
//     timestamp: '2025-01-13 14:20',
//     category: 'security',
//     status: 'unread',
//     actionable: true,
//   },
//   {
//     id: 'm5',
//     title: 'Transaction Failed',
//     preview: 'Your transfer of ₵75 to Utility Co. has failed due to insufficient funds.',
//     timestamp: '2025-01-10 16:10',
//     category: 'transactions',
//     status: 'read',
//     actionable: false,
//   },
// ];

// export function MessageList({ className }: MessageListProps) {
//   const [filter, setFilter] = useState<MessageCategory>('all');

//   const filteredMessages = mockMessages.filter((message) => {
//     if (filter === 'all') return true;
//     return message.category === filter;
//   });

//   const getCategoryIcon = (category: 'notifications' | 'security' | 'transactions') => {
//     switch (category) {
//       case 'notifications':
//         return <Bell className="h-4 w-4" />;
//       case 'security':
//         return <ShieldAlert className="h-4 w-4" />;
//       case 'transactions':
//         return <Info className="h-4 w-4" />;
//     }
//   };

//   return (
//     <Card className={cn("border-0", className)}>
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <MessageSquare className="h-5 w-5" />
//           Messages
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="px-2">
//         <Tabs defaultValue="all" onValueChange={(value) => setFilter(value as MessageCategory)}>
//           <TabsList className="grid w-full grid-cols-4">
//             <TabsTrigger value="all">All</TabsTrigger>
//             <TabsTrigger value="transactions">Transactions</TabsTrigger>
//             <TabsTrigger value="security">Security</TabsTrigger>
//             <TabsTrigger value="notifications">Updates</TabsTrigger>
//           </TabsList>
          
//           <TabsContent value={filter} className="mt-4 space-y-4">
//             {filteredMessages.length === 0 ? (
//               <div className="py-8 text-center text-muted-foreground">
//                 No messages found
//               </div>
//             ) : (
//               filteredMessages.map((message) => (
//                 <div
//                   key={message.id}
//                   className={cn(
//                     "relative rounded-lg p-4 transition-colors hover:bg-muted/50",
//                     message.status === 'unread' && "bg-primary/5"
//                   )}
//                 >
//                   {message.status === 'unread' && (
//                     <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-primary"></div>
//                   )}
                  
//                   <div className="flex gap-3">
//                     <div className={cn(
//                       "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
//                       message.category === 'transactions' && "bg-blue-100 text-blue-600 dark:bg-blue-900/30",
//                       message.category === 'security' && "bg-red-100 text-red-600 dark:bg-red-900/30",
//                       message.category === 'notifications' && "bg-green-100 text-green-600 dark:bg-green-900/30"
//                     )}>
//                       {getCategoryIcon(message.category)}
//                     </div>
                    
//                     <div>
//                       <div className="flex items-center gap-2">
//                         <h3 className="font-medium">{message.title}</h3>
//                         {message.actionable && (
//                           <Badge variant="outline" className="text-[10px]">ACTION REQUIRED</Badge>
//                         )}
//                       </div>
                      
//                       <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
//                         {message.preview}
//                       </p>
                      
//                       <div className="mt-2 flex items-center justify-between">
//                         <span className="text-xs text-muted-foreground">
//                           {new Date(message.timestamp).toLocaleString('en-US', {
//                             month: 'short',
//                             day: 'numeric',
//                             hour: '2-digit',
//                             minute: '2-digit',
//                           })}
//                         </span>
                        
//                         {message.actionable && (
//                           <div className="flex gap-2">
//                             <Button size="sm" variant="outline" className="h-8 px-3 text-xs">
//                               Decline
//                             </Button>
//                             <Button size="sm" className="h-8 px-3 text-xs">
//                               Approve
//                             </Button>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
            
//             <Button variant="ghost" className="w-full">
//               View all messages
//             </Button>
//           </TabsContent>
//         </Tabs>
//       </CardContent>
//     </Card>
//   );
// }
