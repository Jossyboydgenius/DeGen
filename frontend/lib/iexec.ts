// import { 
//   IExec, 
//   utils, 
//   errors 
// } from 'iexec';
// import { 
//   IExecDataProtectorCore, 
//   IExecDataProtectorSharing,
//   createArrayBufferFromFile
// } from '@iexec/dataprotector';
// import { ethers, Wallet, providers } from 'ethers';

// // Types based on actual documentation
// export interface UserData {
//   id: string;
//   encryptedData: string;
//   metadata: Record<string, any>;
//   dataType: 'verification' | 'message' | 'financial' | 'voting' | 'file' | 'general';
//   timestamp: number;
// }

// export interface ProtectedDataInfo {
//   name: string;
//   address: string;
//   owner: string;
//   schema: any;
//   creationTimestamp: number;
//   transactionHash: string;
//   zipFile?: Uint8Array;
//   encryptionKey?: Uint8Array;
//   multiaddr?: string;
// }

// export interface AccessGrant {
//   protectedData: string;
//   authorizedApp: string;
//   authorizedUser: string;
//   pricePerAccess?: number;
//   numberOfAccess?: number;
// }

// export interface ProcessingResult {
//   txHash: string;
//   dealId: string;
//   taskId: string;
//   result?: ArrayBuffer;
//   status: 'completed' | 'failed' | 'pending';
// }

// export interface IExecConfig {
//   ethProvider: providers.Provider | any; // Support browser window.ethereum
//   privateKey?: string;
//   signer?: ethers.Signer;
//   chainId?: number;
//   workerpoolAddress?: string;
//   appAddress?: string;
//   iexecOptions?: {
//     smsURL?: string; // For TDX support
//   };
// }

// export interface DataAccessFilter {
//   protectedDataAddress?: string;
//   owner?: string;
//   requiredSchema?: any;
//   createdAfterTimestamp?: number;
//   page?: number;
//   pageSize?: number;
// }

// export interface AccessFilter {
//   protectedData?: string;
//   authorizedApp?: string;
//   authorizedUser?: string;
//   isUserStrict?: boolean;
//   page?: number;
//   pageSize?: number;
// }

// export class IExecServiceError extends Error {
//   constructor(
//     message: string,
//     public code: string,
//     public originalError?: Error
//   ) {
//     super(message);
//     this.name = 'IExecServiceError';
//   }
// }

// export class EnhancedIExecService {
//   private iexec: IExec = new IExec();
//   private dataProtectorCore: IExecDataProtectorCore = new IExecDataProtectorCore;
//   private dataProtectorSharing: IExecDataProtectorSharing = new IExecDataProtectorSharing;
//   private config: IExecConfig;
//   private isInitialized = false;

//   constructor(config: IExecConfig) {
//     this.config = {
//       chainId: 134, // Bellecour by default
//       ...config
//     };
//     this.validateConfig(this.config);
//   }

//   /**
//    * Initialize the iExec service with DataProtector modules
//    */
//   public async initialize(): Promise<void> {
//     try {
//       // Initialize main iExec instance
//       this.iexec = new IExec({
//         ethProvider: this.config.ethProvider,
//         chainId: this.config.chainId,
//       });

//       // Initialize DataProtector Core - based on browser example in docs
//       this.dataProtectorCore = new IExecDataProtectorCore(
//         this.config.ethProvider,
//         {
//           ...(this.config.iexecOptions && { iexecOptions: this.config.iexecOptions }),
//         }
//       );

//       // Initialize DataProtector Sharing
//       this.dataProtectorSharing = new IExecDataProtectorSharing(
//         this.config.ethProvider,
//         {
//           ...(this.config.iexecOptions && { iexecOptions: this.config.iexecOptions }),
//         }
//       );

//       // Verify initialization
//       await this.verifyInitialization();
//       this.isInitialized = true;

//       console.log('Enhanced iExec Service initialized successfully');
//     } catch (error) {
//       throw new IExecServiceError(
//         'Failed to initialize iExec service',
//         'INIT_ERROR',
//         error as Error
//       );
//     }
//   }

//   // ===== DATAPROTECTOR CORE METHODS (Based on actual docs) =====

//   /**
//    * Protect data - based on protectData documentation
//    */
//   public async protectData(
//     data: Record<string, any>,
//     options: {
//       name?: string;
//       allowDebug?: boolean;
//       onStatusUpdate?: (params: { title: string; isDone: boolean }) => void;
//     } = {}
//   ): Promise<ProtectedDataInfo> {
//     this.ensureInitialized();

//     try {
//       const protectParams = {
//         data,
//         ...(options.name && { name: options.name }),
//         ...(options.allowDebug !== undefined && { allowDebug: options.allowDebug }),
//         ...(options.onStatusUpdate && { onStatusUpdate: options.onStatusUpdate }),
//       };

//       const result = await this.dataProtectorCore.protectData(protectParams);

//       console.log(`Data protected successfully: ${result.address}`);
//       return result;
//     } catch (error) {
//       throw new IExecServiceError(
//         'Failed to protect data',
//         'PROTECT_ERROR',
//         error as Error
//       );
//     }
//   }

//   /**
//    * Protect file data using createArrayBufferFromFile utility
//    */
//   public async protectFile(
//     file: File,
//     options: {
//       name?: string;
//       allowDebug?: boolean;
//       onStatusUpdate?: (params: { title: string; isDone: boolean }) => void;
//     } = {}
//   ): Promise<ProtectedDataInfo> {
//     this.ensureInitialized();

//     try {
//       const fileAsArrayBuffer = await createArrayBufferFromFile(file);
      
//       const data = {
//         file: fileAsArrayBuffer
//       };

//       return await this.protectData(data, {
//         name: options.name || file.name,
//         allowDebug: options.allowDebug,
//         onStatusUpdate: options.onStatusUpdate,
//       });
//     } catch (error) {
//       throw new IExecServiceError(
//         'Failed to protect file',
//         'PROTECT_FILE_ERROR',
//         error as Error
//       );
//     }
//   }

//   /**
//    * Protect array data using the reduceArray pattern from docs
//    */
//   public async protectArray(
//     array: Array<any>,
//     options: {
//       name?: string;
//       allowDebug?: boolean;
//       onStatusUpdate?: (params: { title: string; isDone: boolean }) => void;
//     } = {}
//   ): Promise<ProtectedDataInfo> {
//     this.ensureInitialized();

//     try {
//       // Using the exact pattern from documentation
//       const reduceArray = (array: Array<any>): Record<string, any> =>
//         array.reduce((accumulator, current, i) => {
//           accumulator[i] = current;
//           return accumulator;
//         }, {});

//       const data = {
//         arrayData: reduceArray(array)
//       };

//       return await this.protectData(data, {
//         name: options.name || 'Array Data',
//         allowDebug: options.allowDebug,
//         onStatusUpdate: options.onStatusUpdate,
//       });
//     } catch (error) {
//       throw new IExecServiceError(
//         'Failed to protect array',
//         'PROTECT_ARRAY_ERROR',
//         error as Error
//       );
//     }
//   }

//   /**
//    * Get protected data - based on getProtectedData documentation
//    */
//   public async getProtectedData(filter: DataAccessFilter = {}): Promise<any[]> {
//     this.ensureInitialized();

//     try {
//       const params = {
//         ...(filter.protectedDataAddress && { protectedDataAddress: filter.protectedDataAddress }),
//         ...(filter.owner && { owner: filter.owner }),
//         ...(filter.requiredSchema && { requiredSchema: filter.requiredSchema }),
//         ...(filter.createdAfterTimestamp && { createdAfterTimestamp: filter.createdAfterTimestamp }),
//         ...(filter.page !== undefined && { page: filter.page }),
//         ...(filter.pageSize && { pageSize: filter.pageSize }),
//       };

//       const result = await this.dataProtectorCore.getProtectedData(params);
//       return result;
//     } catch (error) {
//       throw new IExecServiceError(
//         'Failed to get protected data',
//         'GET_PROTECTED_DATA_ERROR',
//         error as Error
//       );
//     }
//   }

//   /**
//    * Transfer ownership - based on transferOwnership documentation
//    */
//   public async transferOwnership(
//     protectedDataAddress: string,
//     newOwner: string
//   ): Promise<{ txHash: string }> {
//     this.ensureInitialized();

//     try {
//       const result = await this.dataProtectorCore.transferOwnership({
//         protectedData: protectedDataAddress,
//         newOwner,
//       });

//       console.log(`Ownership transferred for ${protectedDataAddress} to ${newOwner}`);
//       return result;
//     } catch (error) {
//       throw new IExecServiceError(
//         'Failed to transfer ownership',
//         'TRANSFER_OWNERSHIP_ERROR',
//         error as Error
//       );
//     }
//   }

//   /**
//    * Grant access - based on grantAccess documentation
//    */
//   public async grantAccess(
//     protectedDataAddress: string,
//     authorizedApp: string,
//     authorizedUser: string,
//     options: {
//       pricePerAccess?: number;
//       numberOfAccess?: number;
//       onStatusUpdate?: (params: { title: string; isDone: boolean }) => void;
//     } = {}
//   ): Promise<any> {
//     this.ensureInitialized();

//     try {
//       const grantParams = {
//         protectedData: protectedDataAddress,
//         authorizedApp,
//         authorizedUser,
//         ...(options.pricePerAccess !== undefined && { pricePerAccess: options.pricePerAccess }),
//         ...(options.numberOfAccess && { numberOfAccess: options.numberOfAccess }),
//         ...(options.onStatusUpdate && { onStatusUpdate: options.onStatusUpdate }),
//       };

//       const result = await this.dataProtectorCore.grantAccess(grantParams);

//       console.log(`Access granted for protected data: ${protectedDataAddress}`);
//       return result;
//     } catch (error) {
//       throw new IExecServiceError(
//         'Failed to grant access',
//         'GRANT_ACCESS_ERROR',
//         error as Error
//       );
//     }
//   }

//   /**
//    * Get granted access - based on getGrantedAccess documentation
//    */
//   public async getGrantedAccess(filter: AccessFilter = {}): Promise<{
//     count: number;
//     grantedAccess: any[];
//   }> {
//     this.ensureInitialized();

//     try {
//       const params = {
//         ...(filter.protectedData && { protectedData: filter.protectedData }),
//         ...(filter.authorizedApp && { authorizedApp: filter.authorizedApp }),
//         ...(filter.authorizedUser && { authorizedUser: filter.authorizedUser }),
//         ...(filter.isUserStrict !== undefined && { isUserStrict: filter.isUserStrict }),
//         ...(filter.page !== undefined && { page: filter.page }),
//         ...(filter.pageSize && { pageSize: filter.pageSize }),
//       };

//       const result = await this.dataProtectorCore.getGrantedAccess(params);
//       return result;
//     } catch (error) {
//       throw new IExecServiceError(
//         'Failed to get granted access',
//         'GET_GRANTED_ACCESS_ERROR',
//         error as Error
//       );
//     }
//   }

//   /**
//    * Revoke one access - based on revokeOneAccess documentation
//    */
//   public async revokeOneAccess(
//     protectedDataAddress: string,
//     authorizedApp: string,
//     authorizedUser: string
//   ): Promise<{ txHash: string }> {
//     this.ensureInitialized();

//     try {
//       const result = await this.dataProtectorCore.revokeOneAccess({
//         protectedData: protectedDataAddress,
//         authorizedApp,
//         authorizedUser,
//       });

//       console.log(`Access revoked for ${protectedDataAddress}`);
//       return result;
//     } catch (error) {
//       throw new IExecServiceError(
//         'Failed to revoke access',
//         'REVOKE_ACCESS_ERROR',
//         error as Error
//       );
//     }
//   }

//   /**
//    * Revoke all access - based on revokeAllAccess documentation
//    */
//   public async revokeAllAccess(protectedDataAddress: string): Promise<{ txHash: string }> {
//     this.ensureInitialized();

//     try {
//       const result = await this.dataProtectorCore.revokeAllAccess({
//         protectedData: protectedDataAddress,
//       });

//       console.log(`All access revoked for ${protectedDataAddress}`);
//       return result;
//     } catch (error) {
//       throw new IExecServiceError(
//         'Failed to revoke all access',
//         'REVOKE_ALL_ACCESS_ERROR',
//         error as Error
//       );
//     }
//   }

//   /**
//    * Process protected data - based on processProtectedData documentation
//    */
//   public async processProtectedData(
//     protectedDataAddress: string,
//     appAddress: string,
//     options: {
//       path?: string;
//       userWhitelist?: string;
//       maxPrice?: number;
//       useVoucher?: boolean;
//       voucherOwner?: string;
//       args?: string;
//       inputFiles?: string[];
//       secrets?: Record<number, string>;
//       workerpool?: string;
//       onStatusUpdate?: (params: { title: string; isDone: boolean }) => void;
//     } = {}
//   ): Promise<ProcessingResult> {
//     this.ensureInitialized();

//     try {
//       const processParams = {
//         protectedData: protectedDataAddress,
//         app: appAddress,
//         ...(options.path && { path: options.path }),
//         ...(options.userWhitelist && { userWhitelist: options.userWhitelist }),
//         ...(options.maxPrice !== undefined && { maxPrice: options.maxPrice }),
//         ...(options.useVoucher !== undefined && { useVoucher: options.useVoucher }),
//         ...(options.voucherOwner && { voucherOwner: options.voucherOwner }),
//         ...(options.args && { args: options.args }),
//         ...(options.inputFiles && { inputFiles: options.inputFiles }),
//         ...(options.secrets && { secrets: options.secrets }),
//         workerpool: options.workerpool || 'prod-v8-bellecour.main.pools.iexec.eth',
//         ...(options.onStatusUpdate && { onStatusUpdate: options.onStatusUpdate }),
//       };

//       const result = await this.dataProtectorCore.processProtectedData(processParams);

//       console.log(`Data processing initiated: ${result.taskId}`);
//       return result;
//     } catch (error) {
//       throw new IExecServiceError(
//         'Failed to process protected data',
//         'PROCESS_ERROR',
//         error as Error
//       );
//     }
//   }

//   /**
//    * Get result from completed task - based on getResultFromCompletedTask documentation
//    */
//   public async getResultFromCompletedTask(
//     taskId: string,
//     options: {
//       path?: string;
//       pemPrivateKey?: string;
//       onStatusUpdate?: (params: { title: string; isDone: boolean }) => void;
//     } = {}
//   ): Promise<{ result: ArrayBuffer }> {
//     this.ensureInitialized();

//     try {
//       const params = {
//         taskId,
//         ...(options.path && { path: options.path }),
//         ...(options.pemPrivateKey && { pemPrivateKey: options.pemPrivateKey }),
//         ...(options.onStatusUpdate && { onStatusUpdate: options.onStatusUpdate }),
//       };

//       const result = await this.dataProtectorCore.getResultFromCompletedTask(params);

//       console.log(`Retrieved result for task: ${taskId}`);
//       return result;
//     } catch (error) {
//       throw new IExecServiceError(
//         'Failed to get task result',
//         'GET_TASK_RESULT_ERROR',
//         error as Error
//       );
//     }
//   }

//   // ===== DATAPROTECTOR SHARING METHODS (Based on actual docs) =====

//   /**
//    * Create collection - based on createCollection documentation
//    */
//   public async createCollection(): Promise<{ collectionId: number; txHash: string }> {
//     this.ensureInitialized();

//     try {
//       const result = await this.dataProtectorSharing.createCollection();
//       console.log(`Collection created: ${result.collectionId}`);
//       return result;
//     } catch (error) {
//       throw new IExecServiceError(
//         'Failed to create collection',
//         'CREATE_COLLECTION_ERROR',
//         error as Error
//       );
//     }
//   }

//   /**
//    * Remove collection - based on removeCollection documentation
//    */
//   public async removeCollection(collectionId: number): Promise<{ txHash: string }> {
//     this.ensureInitialized();

//     try {
//       const result = await this.dataProtectorSharing.removeCollection({ collectionId });
//       console.log(`Collection removed: ${collectionId}`);
//       return result;
//     } catch (error) {
//       throw new IExecServiceError(
//         'Failed to remove collection',
//         'REMOVE_COLLECTION_ERROR',
//         error as Error
//       );
//     }
//   }

//   /**
//    * Add to collection - based on addToCollection documentation
//    */
//   public async addToCollection(
//     collectionId: number,
//     protectedDataAddress: string,
//     addOnlyAppWhitelist: string,
//     onStatusUpdate?: (params: { title: string; isDone: boolean }) => void
//   ): Promise<{ txHash: string }> {
//     this.ensureInitialized();

//     try {
//       const params = {
//         collectionId,
//         protectedData: protectedDataAddress,
//         addOnlyAppWhitelist,
//         ...(onStatusUpdate && { onStatusUpdate }),
//       };

//       const result = await this.dataProtectorSharing.addToCollection(params);

//       console.log(`Protected data added to collection ${collectionId}`);
//       return result;
//     } catch (error) {
//       throw new IExecServiceError(
//         'Failed to add to collection',
//         'ADD_TO_COLLECTION_ERROR',
//         error as Error
//       );
//     }
//   }

//   /**
//    * Remove from collection - based on removeProtectedDataFromCollection documentation
//    */
//   public async removeProtectedDataFromCollection(
//     protectedDataAddress: string
//   ): Promise<{ txHash: string }> {
//     this.ensureInitialized();

//     try {
//       const result = await this.dataProtectorSharing.removeProtectedDataFromCollection({
//         protectedData: protectedDataAddress,
//       });

//       console.log(`Protected data removed from collection`);
//       return result;
//     } catch (error) {
//       throw new IExecServiceError(
//         'Failed to remove from collection',
//         'REMOVE_FROM_COLLECTION_ERROR',
//         error as Error
//       );
//     }
//   }

//   /**
//    * Set for renting - based on setProtectedDataToRenting documentation
//    */
//   public async setProtectedDataToRenting(
//     protectedDataAddress: string,
//     price: number,
//     duration: number
//   ): Promise<{ txHash: string }> {
//     this.ensureInitialized();

//     try {
//       const result = await this.dataProtectorSharing.setProtectedDataToRenting({
//         protectedData: protectedDataAddress,
//         price,
//         duration,
//       });

//       console.log(`Protected data set for renting: ${protectedDataAddress}`);
//       return result;
//     } catch (error) {
//       throw new IExecServiceError(
//         'Failed to set for renting',
//         'SET_FOR_RENTING_ERROR',
//         error as Error
//       );
//     }
//   }

//   /**
//    * Update renting params - based on setProtectedDataRentingParams documentation
//    */
//   public async setProtectedDataRentingParams(
//     protectedDataAddress: string,
//     price: number,
//     duration: number
//   ): Promise<{ txHash: string }> {
//     this.ensureInitialized();

//     try {
//       const result = await this.dataProtectorSharing.setProtectedDataRentingParams({
//         protectedData: protectedDataAddress,
//         price,
//         duration,
//       });

//       console.log(`Renting params updated for: ${protectedDataAddress}`);
//       return result;
//     } catch (error) {
//       throw new IExecServiceError(
//         'Failed to update renting params',
//         'UPDATE_RENTING_PARAMS_ERROR',
//         error as Error
//       );
//     }
//   }

//   /**
//    * Rent protected data - based on rentProtectedData documentation
//    */
//   public async rentProtectedData(
//     protectedDataAddress: string,
//     price: number,
//     duration: number
//   ): Promise<{ txHash: string }> {
//     this.ensureInitialized();

//     try {
//       const result = await this.dataProtectorSharing.rentProtectedData({
//         protectedData: protectedDataAddress,
//         price,
//         duration,
//       });

//       console.log(`Protected data rented: ${protectedDataAddress}`);
//       return result;
//     } catch (error) {
//       throw new IExecServiceError(
//         'Failed to rent protected data',
//         'RENT_PROTECTED_DATA_ERROR',
//         error as Error
//       );
//     }
//   }

//   /**
//    * Remove from renting - based on removeProtectedDataFromRenting documentation
//    */
//   public async removeProtectedDataFromRenting(
//     protectedDataAddress: string
//   ): Promise<{ txHash: string }> {
//     this.ensureInitialized();

//     try {
//       const result = await this.dataProtectorSharing.removeProtectedDataFromRenting({
//         protectedData: protectedDataAddress,
//       });

//       console.log(`Protected data removed from renting: ${protectedDataAddress}`);
//       return result;
//     } catch (error) {
//       throw new IExecServiceError(
//         'Failed to remove from renting',
//         'REMOVE_FROM_RENTING_ERROR',
//         error as Error
//       );
//     }
//   }

//   /**
//    * Consume protected data - based on consumeProtectedData documentation
//    */
//   public async consumeProtectedData(
//     protectedDataAddress: string,
//     appAddress: string,
//     options: {
//       path?: string;
//       workerpool?: string;
//       maxPrice?: number;
//       pemPublicKey?: string;
//       pemPrivateKey?: string;
//       onStatusUpdate?: (params: { title: string; isDone: boolean }) => void;
//     } = {}
//   ): Promise<{
//     txHash: string;
//     dealId: string;
//     taskId: string;
//     result: ArrayBuffer;
//   }> {
//     this.ensureInitialized();

//     try {
//       const consumeParams = {
//         protectedData: protectedDataAddress,
//         app: appAddress,
//         ...(options.path && { path: options.path }),
//         workerpool: options.workerpool || 'prod-v8-bellecour.main.pools.iexec.eth',
//         ...(options.maxPrice !== undefined && { maxPrice: options.maxPrice }),
//         ...(options.pemPublicKey && { pemPublicKey: options.pemPublicKey }),
//         ...(options.pemPrivateKey && { pemPrivateKey: options.pemPrivateKey }),
//         ...(options.onStatusUpdate && { onStatusUpdate: options.onStatusUpdate }),
//       };

//       const result = await this.dataProtectorSharing.consumeProtectedData(consumeParams);

//       console.log(`Protected data consumed: ${protectedDataAddress}`);
//       return result;
//     } catch (error) {
//       throw new IExecServiceError(
//         'Failed to consume protected data',
//         'CONSUME_PROTECTED_DATA_ERROR',
//         error as Error
//       );
//     }
//   }

//   // ===== UTILITY METHODS =====

//   /**
//    * Get current user address
//    */
//   public async getCurrentUserAddress(): Promise<string> {
//     if (this.config.signer) {
//       return await this.config.signer.getAddress();
//     }
    
//     if (this.config.privateKey) {
//       const wallet = new Wallet(this.config.privateKey);
//       return wallet.address;
//     }

//     // For browser environment with window.ethereum
//     if (this.config.ethProvider?.request) {
//       const accounts = await this.config.ethProvider.request({ 
//         method: 'eth_accounts' 
//       });
//       if (accounts && accounts.length > 0) {
//         return accounts[0];
//       }
//     }

//     throw new IExecServiceError(
//       'Unable to determine user address',
//       'ADDRESS_ERROR'
//     );
//   }

//   /**
//    * Get user's protected data
//    */
//   public async getUserProtectedData(filter: Omit<DataAccessFilter, 'owner'> = {}): Promise<any[]> {
//     this.ensureInitialized();

//     try {
//       const userAddress = await this.getCurrentUserAddress();
//       return await this.getProtectedData({
//         ...filter,
//         owner: userAddress,
//       });
//     } catch (error) {
//       throw new IExecServiceError(
//         'Failed to fetch user protected data',
//         'FETCH_USER_DATA_ERROR',
//         error as Error
//       );
//     }
//   }

//   /**
//    * Check if TDX mode is enabled
//    */
//   public isTDXModeEnabled(): boolean {
//     return !!(this.config.iexecOptions?.smsURL?.includes('labs.iex.ec'));
//   }

//   /**
//    * Get recommended app addresses from documentation
//    */
//   public getRecommendedApps(): {
//     web3mail: string;
//     web3mailWhitelist: string;
//     contentDelivery: string;
//     defaultWhitelist: string;
//   } {
//     return {
//       web3mail: 'web3mail.apps.iexec.eth',
//       web3mailWhitelist: '0x781482C39CcE25546583EaC4957Fb7Bf04C277D2',
//       contentDelivery: '0x1cb7D4F3FFa203F211e57357D759321C6CE49921',
//       defaultWhitelist: '0x256bcd881c33bdf9df952f2a0148f27d439f2e64',
//     };
//   }

//   /**
//    * Create status update callback
//    */
//   public createStatusCallback(
//     operationName: string,
//     onProgress?: (title: string, isDone: boolean) => void
//   ): (params: { title: string; isDone: boolean }) => void {
//     return ({ title, isDone }) => {
//       console.log(`[${operationName}] ${title}: ${isDone ? 'Done' : 'In Progress'}`);
//       if (onProgress) {
//         onProgress(title, isDone);
//       }
//     };
//   }

//   // ===== PRIVATE HELPER METHODS =====

//   private validateConfig(config: IExecConfig): void {
//     if (!config.ethProvider) {
//       throw new IExecServiceError(
//         'ETH provider is required',
//         'INVALID_CONFIG'
//       );
//     }
//   }

//   private async verifyInitialization(): Promise<void> {
//     try {
//       // Test basic functionality
//       await this.getCurrentUserAddress();
//     } catch (error) {
//       throw new IExecServiceError(
//         'Service initialization verification failed',
//         'INIT_VERIFICATION_ERROR',
//         error as Error
//       );
//     }
//   }

//   private ensureInitialized(): void {
//     if (!this.isInitialized) {
//       throw new IExecServiceError(
//         'Service not initialized. Call initialize() first.',
//         'NOT_INITIALIZED'
//       );
//     }
//   }

//   /**
//    * Cleanup resources
//    */
//   public async cleanup(): Promise<void> {
//     try {
//       this.isInitialized = false;
//       console.log('Enhanced iExec Service cleaned up successfully');
//     } catch (error) {
//       console.warn('Cleanup warning:', error);
//     }
//   }
// }

// // ===== FACTORY FUNCTIONS =====

// /**
//  * Create iExec service for browser environment
//  */
// export const createBrowserIExecService = (
//   ethProvider: any = (window as any).ethereum,
//   options: Partial<IExecConfig> = {}
// ): EnhancedIExecService => {
//   const config: IExecConfig = {
//     ethProvider,
//     chainId: 134, // Bellecour
//     ...options,
//   };

//   return new EnhancedIExecService(config);
// };

// /**
//  * Create iExec service with TDX support (experimental)
//  */
// export const createTDXIExecService = (
//   ethProvider: providers.Provider | any,
//   options: Partial<IExecConfig> = {}
// ): EnhancedIExecService => {
//   const config: IExecConfig = {
//     ethProvider,
//     chainId: 134,
//     iexecOptions: {
//       smsURL: 'https://sms.labs.iex.ec',
//     },
//     ...options,
//   };

//   return new EnhancedIExecService(config);
// };

// /**
//  * Utility function from docs to convert array for protection
//  */
// export const prepareArrayForProtection = (array: Array<any>): Record<string, any> => {
//   return array.reduce((accumulator, current, i) => {
//     accumulator[i] = current;
//     return accumulator;
//   }, {});
// };

// // Export types
// // export type {
// //   UserData,
// //   ProtectedDataInfo,
// //   AccessGrant,
// //   ProcessingResult,
// //   IExecConfig,
// //   DataAccessFilter,
// //   AccessFilter,
// // };