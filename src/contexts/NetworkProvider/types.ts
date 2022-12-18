import { NetworkType } from '@airgap/beacon-sdk';

export interface NetworkContextApi {
  networkType: NetworkType;
  rpcUrl: string;
  setNetworkType: (networkType: NetworkType) => void;
}
