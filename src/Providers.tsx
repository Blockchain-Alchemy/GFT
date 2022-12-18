import React, { ReactNode } from 'react';
import { NetworkProvider } from './contexts/NetworkProvider';
import { WalletProvider } from './contexts/WalletProvider';

const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <NetworkProvider>
      <WalletProvider>{children}</WalletProvider>
    </NetworkProvider>
  );
};

export default Providers;
