import { NetworkType } from '@airgap/beacon-sdk';
import { NetworkConfig } from 'configs';

export interface NetworkContextApi {
  networkType: NetworkType;
  config: NetworkConfig;
  setNetworkType: (networkType: NetworkType) => void;
}
