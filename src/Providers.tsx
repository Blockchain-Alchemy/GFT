import React, { ReactNode } from 'react';
import { WalletProvider } from './contexts/WalletProvider';

const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <WalletProvider>{children}</WalletProvider>;
};

export default Providers;
