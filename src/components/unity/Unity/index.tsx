import { Unity as UnityWebgl, useUnityContext } from 'react-unity-webgl';
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

const Unity = () => {
  const unityContext = useUnityContext(unityConfig);
  const { loadingProgression, isLoaded } = unityContext;

  return (
    <UnityContainer>
      <UnityWebgl
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

export default Unity;
