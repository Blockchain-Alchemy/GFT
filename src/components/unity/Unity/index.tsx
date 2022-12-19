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

type Props = {
  subscription?: (unityContext: UnityContextHook) => void;
  unsubscription?: (unityContext: UnityContextHook) => void;
};

const UnityWrapper = ({ subscription, unsubscription }: Props) => {
  const unityContext = useUnityContext(unityConfig);
  const { loadingProgression, isLoaded } = unityContext;

  useEffect(() => {
    subscription && subscription(unityContext);
    return () => {
      unsubscription && unsubscription(unityContext);
    };
  }, [unityContext, subscription, unsubscription]);

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
