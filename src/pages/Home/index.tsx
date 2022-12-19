import { useCallback, useEffect, useMemo, useState } from 'react';
import { useUnityContext } from 'react-unity-webgl';
import { useWallet } from 'contexts/WalletProvider';
import Unity, { UnityEventListener } from 'components/unity/Unity';

const unityConfig = {
  loaderUrl: 'Build/public.loader.js',
  dataUrl: 'Build/public.data.unityweb',
  frameworkUrl: 'Build/public.framework.js.unityweb',
  codeUrl: 'Build/public.wasm.unityweb',
};

const Home = () => {
  const { address } = useWallet();
  const unityContext = useUnityContext(unityConfig);
  const { isLoaded, loadingProgression } = unityContext;

  // Event Listener for starting game
  const onStartGame = useCallback(() => {
    console.log('Start');
  }, []);

  // Event Listener for ending game
  const onEndGame = useCallback(() => {
    console.log('End');
  }, []);

  const eventListeners = useMemo((): UnityEventListener[] => {
    return [
      { eventName: 'StartGame', callback: onStartGame },
      { eventName: 'EndGame', callback: onEndGame },
    ];
  }, [onStartGame, onEndGame]);

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
    <div className="container mx-auto mt-4">
      <Unity
        unityProvider={unityContext.unityProvider}
        isLoaded={isLoaded}
        loadingProgression={loadingProgression}
        styles={{
          height: 540,
          width: 950,
          background: '#555',
        }}
      ></Unity>
    </div>
  );
};

export default Home;
