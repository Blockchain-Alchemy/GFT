import { useContext } from 'react';
import { UnityContext, UnityProvider } from './Provider';

const useUnityContext = () => {
  const unityContext = useContext(UnityContext);

  if (unityContext === undefined) {
    throw new Error('Wallet context undefined');
  }

  return unityContext;
};

export { useUnityContext, UnityProvider };
