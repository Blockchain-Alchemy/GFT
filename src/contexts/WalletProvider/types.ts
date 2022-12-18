import { NetworkType, PermissionResponseOutput } from '@airgap/beacon-sdk';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit } from '@taquito/taquito';

export interface WalletContextApi {
  tezos: TezosToolkit;
  wallet: BeaconWallet | undefined;
  connected: boolean;
  publicKey: string | undefined;
  address: string | undefined;
  connectWallet: () => Promise<PermissionResponseOutput | undefined>;
  disconnectWallet: () => Promise<void>;
}
