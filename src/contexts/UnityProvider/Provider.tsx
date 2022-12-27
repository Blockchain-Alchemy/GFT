import React, { createContext, ReactNode } from 'react';
import { UnityConfig, useUnityContext } from 'react-unity-webgl';
import { UnityContextApi } from './types';

export const UnityContext = createContext<UnityContextApi>({} as UnityContextApi);

type Props = {
  unityConfig: UnityConfig;
  children: ReactNode;
};

export const UnityProvider: React.FC<Props> = ({ unityConfig, children }) => {
  const unityContext = useUnityContext(unityConfig);

  return (
    <UnityContext.Provider
      value={{
        unityContext,
      }}
    >
      {children}
    </UnityContext.Provider>
  );
};
