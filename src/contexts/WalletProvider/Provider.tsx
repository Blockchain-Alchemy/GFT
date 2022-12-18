import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import {
  BeaconEvent,
  defaultEventCallbacks,
  NetworkType,
  PermissionScope,
} from '@airgap/beacon-sdk';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit } from '@taquito/taquito';
import { WalletContextApi } from './types';

export const WalletContext = createContext<WalletContextApi>(
  {} as WalletContextApi
);

const scopes: PermissionScope[] = [
  PermissionScope.OPERATION_REQUEST,
  PermissionScope.SIGN,
];

const RpcUrl = 'https://mainnet.tezos.marigold.dev';

export const WalletProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tezos, setTezos] = useState(new TezosToolkit(RpcUrl));
  const [networkType, setNetworkType] = useState(NetworkType.MAINNET);
  const [rpcUrl, setRpcUrl] = useState(RpcUrl);
  const [wallet, setWallet] = useState<BeaconWallet>();
  const [publicKey, setPublicKey] = useState<string | undefined>(undefined);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    setAddress(undefined);
    setConnected(false);
    setTezos(new TezosToolkit(rpcUrl));
  }, [rpcUrl]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    (async () => {
      if (wallet) {
        await wallet.clearActiveAccount();
      }

      const _wallet = new BeaconWallet({
        name: 'Escrow Demo',
        preferredNetwork: networkType,
        disableDefaultEvents: true, // Disable all events / UI. This also disables the pairing alert.
        eventHandlers: {
          // To keep the pairing alert, we have to add the following default event handlers back
          [BeaconEvent.PAIR_INIT]: {
            handler: defaultEventCallbacks.PAIR_INIT,
          },
          [BeaconEvent.PAIR_SUCCESS]: {
            handler: (data) => console.log(data.publicKey),
          },
        },
      });

      tezos.setWalletProvider(_wallet);
      setWallet(_wallet);
    })();
  }, [tezos, networkType]);

  const connectWallet = useCallback(async () => {
    if (!wallet) {
      return Promise.resolve(undefined);
    }
    try {
      console.log('Request Permission', networkType, rpcUrl);
      const permissions = await wallet.client.requestPermissions({
        network: {
          type: networkType,
          rpcUrl: rpcUrl,
        },
        scopes,
      });

      const publicKey = permissions.accountInfo.publicKey;
      setPublicKey(publicKey);

      const address = await wallet.getPKH();
      setAddress(address);

      setConnected(true);
      return permissions;
    } catch (error) {
      setConnected(false);
    }
  }, [wallet, networkType, rpcUrl]);

  const disconnectWallet = useCallback(async () => {
    setConnected(false);
    setAddress(undefined);
    if (wallet) {
      await wallet.clearActiveAccount();
    }
  }, [wallet]);

  return (
    <WalletContext.Provider
      value={{
        tezos,
        wallet,
        connected,
        publicKey,
        address,
        rpcUrl,
        networkType,
        connectWallet,
        disconnectWallet,
        setNetworkType,
        setRpcUrl,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
