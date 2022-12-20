import { useCallback, useEffect, useMemo } from 'react';
import { useWallet } from 'contexts/WalletProvider';
import { useUnityContext } from 'contexts/UnityProvider';
import useToken from 'hooks/useToken';
import Unity, { UnityEventListener } from 'components/unity/Unity';

const Play = () => {
  const { address } = useWallet();
  const { getGateToken } = useToken();
  const { unityContext } = useUnityContext();
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

export default Play;
