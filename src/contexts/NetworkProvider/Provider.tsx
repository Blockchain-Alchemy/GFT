import { NetworkType } from '@airgap/beacon-sdk';
import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { Networks } from 'configs';
import { NetworkContextApi } from './types';

export const NetworkContext = createContext<NetworkContextApi>(
  {} as NetworkContextApi
);

type Props = {
  children: ReactNode;
  value: NetworkType;
};

export const NetworkProvider: React.FC<Props> = ({ value, children }) => {
  const [networkType, setNetworkType] = useState(value);
  const [rpcUrl, setRpcUrl] = useState(Networks[value].RpcList);

  useEffect(() => {
    const network = Networks[networkType];
    setRpcUrl(network.RpcUrl);
  }, [networkType]);

  return (
    <NetworkContext.Provider
      value={{
        rpcUrl,
        networkType,
        setNetworkType,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
};
