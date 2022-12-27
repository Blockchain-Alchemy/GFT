import { NetworkType } from '@airgap/beacon-sdk';

export type NetworkConfig = {
  RpcUrl: string;
  Market: string;
  UUSD: string;
};

type ConfigMap = {
  [key in NetworkType]?: NetworkConfig;
};

export const Networks: ConfigMap = {
  [NetworkType.MAINNET]: {
    RpcUrl: 'https://mainnet.api.tez.ie',
    Market: 'KT1P5Cvfu3TXzxPtowxND6gDfNxrzzkG8oyW', //'KT1V2tXEnb43yxxeb93N8E3ho6kVeTbsmVwC',
    UUSD: 'KT1XRPEPXbZK25r3Htzp2o1x7xdMMmfocKNW',
  },
  [NetworkType.JAKARTANET]: {
    RpcUrl: 'https://jakartanet.tezos.marigold.dev',
    Market: '',
    UUSD: '',
  },
};
