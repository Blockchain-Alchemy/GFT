import { NetworkType } from '@airgap/beacon-sdk';

type NetworkConfig = {
  [key in NetworkType]?: any;
};

export const Networks: NetworkConfig = {
  [NetworkType.MAINNET]: {
    RpcUrl: 'https://mainnet.api.tez.ie',
    UUSD: 'KT1XRPEPXbZK25r3Htzp2o1x7xdMMmfocKNW',
    Market: 'KT1P5Cvfu3TXzxPtowxND6gDfNxrzzkG8oyW',//'KT1V2tXEnb43yxxeb93N8E3ho6kVeTbsmVwC',
  },
  [NetworkType.JAKARTANET]: {
    RpcUrl: 'https://jakartanet.tezos.marigold.dev',
    UUSD: 'KT1Xf83TTyDDxYxr1x2jKFjHXcCsD4RSnaE5',
    Market: '',
  },
};
