import { useCallback, useMemo, useState } from 'react';
import Unity, {
  UnityContext,
  UnityEventListener,
} from 'components/unity/Unity';

const unityConfig = {
  loaderUrl: 'Build/public.loader.js',
  dataUrl: 'Build/public.data.unityweb',
  frameworkUrl: 'Build/public.framework.js.unityweb',
  codeUrl: 'Build/public.wasm.unityweb',
};

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
