import { useCallback, useEffect, useMemo, useState } from 'react';
import Unity, {
  UnityContext,
  UnityEventListener,
} from 'components/unity/Unity';
import { useWallet } from 'contexts/WalletProvider';

const unityConfig = {
  loaderUrl: 'Build/public.loader.js',
  dataUrl: 'Build/public.data.unityweb',
  frameworkUrl: 'Build/public.framework.js.unityweb',
  codeUrl: 'Build/public.wasm.unityweb',
};

const Home = () => {
  const { address } = useWallet();
  const [unityContext, setUnityContext] = useState<UnityContext | null>(null);
  console.log('unityContext', unityContext);

  // Send wallet connected state to unity.
  useEffect(() => {
    if (unityContext) {
      unityContext.sendMessage('GameManager', 'WalletConnected', !!address);
    }
  }, [unityContext, address]);

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

  return (
    <div className="container mx-auto mt-4">
      <Unity
        unityConfig={unityConfig}
        eventListeners={eventListeners}
        setUnityContext={setUnityContext}
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
