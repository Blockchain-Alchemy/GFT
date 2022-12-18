import { useContext } from 'react';
import { WalletContext, WalletProvider } from './Provider';

const useWallet = () => {
  const walletContext = useContext(WalletContext);

  if (walletContext === undefined) {
    throw new Error('Wallet context undefined');
  }

  return walletContext;
};

export { useWallet, WalletProvider };
