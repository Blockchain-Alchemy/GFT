import { NetworkType, PermissionResponseOutput } from "@airgap/beacon-sdk";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";

export interface WalletContextApi {
  tezos: TezosToolkit;
  wallet: BeaconWallet | undefined;
  connected: boolean;
  publicKey: string | undefined;
  address: string | undefined;
  rpcUrl: string;
  networkType: NetworkType;
  connectWallet: () => Promise<PermissionResponseOutput | undefined>;
  disconnectWallet: () => Promise<void>;
  setNetworkType: (networkType: NetworkType) => void;
  setRpcUrl: (url: string) => void;
}
