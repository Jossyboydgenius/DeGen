import type { XmtpEnv } from "@xmtp/node-sdk";

export interface XMTPConfig {
  walletKey: string;
  encryptionKey: string;
  xmtpEnv: XmtpEnv;
  networkId: string;
  groqApiKey: string;
}

export const DEFAULT_XMTP_CONFIG: Partial<XMTPConfig> = {
  xmtpEnv: "dev" as XmtpEnv,
  networkId: "base-sepolia",
};

/**
 * Create XMTP configuration from environment or user input
 */
export function createXMTPConfig(overrides: Partial<XMTPConfig> = {}): XMTPConfig {
  const config: XMTPConfig = {
    walletKey: process.env.WALLET_KEY || overrides.walletKey || "",
    encryptionKey: process.env.ENCRYPTION_KEY || overrides.encryptionKey || "",
    xmtpEnv: (process.env.XMTP_ENV as XmtpEnv) || overrides.xmtpEnv || "dev",
    networkId: process.env.NETWORK_ID || overrides.networkId || "base-sepolia",
    groqApiKey: process.env.GROQ_API_KEY || overrides.groqApiKey || "",
  };

  // Validate required fields
  const requiredFields: (keyof XMTPConfig)[] = ['walletKey', 'encryptionKey', 'groqApiKey'];
  const missingFields = requiredFields.filter(field => !config[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required configuration: ${missingFields.join(', ')}`);
  }

  return config;
}

/**
 * Generate a random encryption key
 */
export function generateEncryptionKey(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Validate configuration
 */
export function validateXMTPConfig(config: XMTPConfig): boolean {
  try {
    // Validate wallet key
    if (!config.walletKey.match(/^(0x)?[a-fA-F0-9]{64}$/)) {
      throw new Error('Invalid wallet key format');
    }

    // Validate encryption key
    if (!config.encryptionKey.match(/^(0x)?[a-fA-F0-9]{64}$/)) {
      throw new Error('Invalid encryption key format');
    }

    // Validate network ID
    const validNetworks = ['base-sepolia', 'base-mainnet'];
    if (!validNetworks.includes(config.networkId)) {
      throw new Error(`Invalid network ID. Must be one of: ${validNetworks.join(', ')}`);
    }

    // Validate XMTP environment
    const validEnvs = ['dev', 'production'];
    if (!validEnvs.includes(config.xmtpEnv)) {
      throw new Error(`Invalid XMTP environment. Must be one of: ${validEnvs.join(', ')}`);
    }

    return true;
  } catch (error) {
    console.error('Configuration validation failed:', error);
    return false;
  }
}

// AI Prompts and Commands
export const AI_COMMANDS = {
  BALANCE: '/balance',
  TRANSFER: '/tx',
  HELP: '/help',
  STATUS: '/status',
  HISTORY: '/history',
} as const;

export const AI_SYSTEM_PROMPT = `You are a helpful DeFi and blockchain assistant integrated with XMTP messaging. You can help users with:

1. **Transaction Commands:**
   - /balance - Check USDC balance
   - /tx <amount> - Initiate USDC transfer
   - /status - Check transaction status

2. **General Assistance:**
   - Explain DeFi concepts and protocols
   - Provide market insights and analysis
   - Answer blockchain and cryptocurrency questions
   - Guide users through wallet operations

3. **Communication:**
   - Keep responses concise and actionable
   - Use emojis sparingly for clarity
   - Provide step-by-step instructions when needed
   - Always confirm transaction details before processing

4. **Safety Guidelines:**
   - Never ask for private keys or seed phrases
   - Always verify transaction amounts and recipients
   - Warn about potential risks in DeFi operations
   - Suggest users verify contract addresses

Remember: You're communicating through XMTP, so responses should be mobile-friendly and easy to read in a chat interface.`;

export const GROQ_MODEL_CONFIG = {
  model: "llama3-8b-8192",
  temperature: 0.7,
  max_tokens: 500,
  top_p: 1,
  stream: false,
} as const;