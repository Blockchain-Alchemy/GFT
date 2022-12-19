import { useEffect } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { UnityContextHook } from 'react-unity-webgl/distribution/types/unity-context-hook';
import styled from 'styled-components';

const unityConfig = {
  loaderUrl: 'Build/public.loader.js',
  dataUrl: 'Build/public.data.unityweb',
  frameworkUrl: 'Build/public.framework.js.unityweb',
  codeUrl: 'Build/public.wasm.unityweb',
};

const UnityContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 540px;
  position: relative;
`;

const Loader = styled.div`
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 16px;
  text-align: center;
  font-weight: 500;
`;

export type UnityContext = UnityContextHook;

export type UnityEventListener = {
  eventName: string;
  callback: (...parameters: any[]) => any;
};

type Props = {
  setUnityContext?: (unityContext: UnityContext) => void;
  eventListeners?: UnityEventListener[];
};

const UnityWrapper = ({ setUnityContext, eventListeners }: Props) => {
  const unityContext = useUnityContext(unityConfig);
  const { loadingProgression, isLoaded } = unityContext;

  useEffect(() => {
    setUnityContext && setUnityContext(unityContext);
  }, [setUnityContext]);

  useEffect(() => {
    const { addEventListener, removeEventListener } = unityContext;
    eventListeners?.map((event: UnityEventListener) => {
      addEventListener(event.eventName, event.callback);
    });
    return () => {
      eventListeners?.map((event: UnityEventListener) => {
        removeEventListener(event.eventName, event.callback);
      });
    };
  }, [unityContext, eventListeners]);

  return (
    <UnityContainer>
      <Unity
        unityProvider={unityContext.unityProvider}
        style={{
          height: 540,
          width: 950,
          background: '#555',
        }}
      />
      {!isLoaded && loadingProgression > 0 && (
        <Loader>
          <div>Loading... {Math.round(loadingProgression * 100)}%</div>
        </Loader>
      )}
    </UnityContainer>
  );
};

export default UnityWrapper;
