import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { NetworkContextApi } from './types';
import { DefaultNetwork, Networks } from 'configs';

export const NetworkContext = createContext<NetworkContextApi>(
  {} as NetworkContextApi
);

export const NetworkProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [networkType, setNetworkType] = useState(DefaultNetwork);
  const [rpcUrl, setRpcUrl] = useState(Networks[DefaultNetwork].RpcList);

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
