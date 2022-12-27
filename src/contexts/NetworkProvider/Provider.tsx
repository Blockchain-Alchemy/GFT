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
  const [config, setConfig] = useState(Networks[value]!);

  useEffect(() => {
    const config = Networks[networkType]!;
    setConfig(config);
  }, [networkType]);

  return (
    <NetworkContext.Provider
      value={{
        networkType,
        config,
        setNetworkType,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
};
