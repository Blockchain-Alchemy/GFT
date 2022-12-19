import { CSSProperties, useEffect } from 'react';
import { Unity } from 'react-unity-webgl';
import { UnityContextHook } from 'react-unity-webgl/distribution/types/unity-context-hook';
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
  unityContext: UnityContext;
  eventListeners?: UnityEventListener[];
  styles?: CSSProperties;
};

const UnityWrapper = ({ unityContext, eventListeners, styles }: UnityProps) => {
  const { isLoaded, loadingProgression } = unityContext;

  useEffect(() => {
    const { addEventListener, removeEventListener } = unityContext;
    eventListeners?.forEach((event: UnityEventListener) => {
      addEventListener(event.eventName, event.callback);
    });
    return () => {
      eventListeners?.forEach((event: UnityEventListener) => {
        removeEventListener(event.eventName, event.callback);
      });
    };
  }, [unityContext, eventListeners]);

  return (
    <UnityContainer>
      <Unity unityProvider={unityContext.unityProvider} style={styles} />
      {!isLoaded && loadingProgression > 0 && (
        <Loader>
          <div>Loading... {Math.round(loadingProgression * 100)}%</div>
        </Loader>
      )}
    </UnityContainer>
  );
};

export default UnityWrapper;
