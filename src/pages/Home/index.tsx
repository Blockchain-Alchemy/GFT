import { useCallback, useMemo, useState } from 'react';
import Unity, {
  UnityContext,
  UnityEventListener,
} from 'components/unity/Unity';

const Home = () => {
  const [unityContext, setUnityContext] = useState<UnityContext | null>(null);
  console.log('unityContext', unityContext);

  const onStartGame = useCallback(() => {
    console.log('Start');
  }, []);

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
        eventListeners={eventListeners}
        setUnityContext={setUnityContext}
      ></Unity>
    </div>
  );
};

export default Home;
