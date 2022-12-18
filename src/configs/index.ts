import { NetworkType } from '@airgap/beacon-sdk';

type NetworkConfig = {
  [key in NetworkType]?: any;
};

export const Networks: NetworkConfig = {
  [NetworkType.MAINNET]: {
    RpcUrl: 'https://mainnet.tezos.marigold.dev',
    UUSD: 'KT1XRPEPXbZK25r3Htzp2o1x7xdMMmfocKNW',
  },
  [NetworkType.JAKARTANET]: {
    RpcUrl: 'https://jakartanet.tezos.marigold.dev',
    UUSD: 'KT1Xf83TTyDDxYxr1x2jKFjHXcCsD4RSnaE5',
  },
};
