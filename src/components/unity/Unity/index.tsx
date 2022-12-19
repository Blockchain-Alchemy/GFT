import { CSSProperties } from 'react';
import { Unity } from 'react-unity-webgl';
import { UnityContextHook } from 'react-unity-webgl/distribution/types/unity-context-hook';
import { UnityProvider } from 'react-unity-webgl/distribution/types/unity-provider';
import styled from 'styled-components';

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

type UnityProps = {
  unityProvider: UnityProvider;
  isLoaded: boolean;
  loadingProgression: number;
  styles?: CSSProperties;
};

const UnityWrapper = ({
  unityProvider,
  isLoaded,
  loadingProgression,
  styles,
}: UnityProps) => {
  return (
    <UnityContainer>
      <Unity unityProvider={unityProvider} style={styles} />
      {!isLoaded && loadingProgression > 0 && (
        <Loader>
          <div>Loading... {Math.round(loadingProgression * 100)}%</div>
        </Loader>
      )}
    </UnityContainer>
  );
};

export default UnityWrapper;
