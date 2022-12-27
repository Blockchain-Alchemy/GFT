import { NetworkType } from '@airgap/beacon-sdk';
import React, { ReactNode } from 'react';
import { Toaster } from "react-hot-toast";
import { NetworkProvider } from './contexts/NetworkProvider';
import { WalletProvider } from './contexts/WalletProvider';

const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <NetworkProvider value={NetworkType.MAINNET}>
      <Toaster position="top-center" />
      <WalletProvider>{children}</WalletProvider>
    </NetworkProvider>
  );
};

export default Providers;
