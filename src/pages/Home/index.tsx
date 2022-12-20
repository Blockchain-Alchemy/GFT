import { useCallback, useEffect, useMemo } from 'react';
import { useUnityContext } from 'react-unity-webgl';
import { useWallet } from 'contexts/WalletProvider';
import useToken from 'hooks/useToken';
import Unity, { UnityEventListener } from 'components/unity/Unity';

const unityConfig = {
  loaderUrl: 'Build/public.loader.js',
  dataUrl: 'Build/public.data.unityweb',
  frameworkUrl: 'Build/public.framework.js.unityweb',
  codeUrl: 'Build/public.wasm.unityweb',
};

const Home = () => {
  const { address } = useWallet();
  const { getGateToken } = useToken();
  const unityContext = useUnityContext(unityConfig);
  const { isLoaded, sendMessage } = unityContext;

  useEffect(() => {
    (async () => {
      if (isLoaded && address) {
        sendMessage('GFT', 'WalletConnected', address);

        const tokens = await getGateToken(address);
        tokens && sendMessage('GFT', 'TokenFound', 'EntryCoin');
      }
    })();
  }, [isLoaded, sendMessage, address, getGateToken]);

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
        unityContext={unityContext}
        eventListeners={eventListeners}
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
