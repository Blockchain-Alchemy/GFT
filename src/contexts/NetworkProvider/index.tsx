import { useContext } from 'react';
import { NetworkContext, NetworkProvider } from './Provider';

const useNetwork = () => {
  const networkContext = useContext(NetworkContext);

  if (networkContext === undefined) {
    throw new Error('Network context undefined');
  }

  return networkContext;
};

export { useNetwork, NetworkProvider };
