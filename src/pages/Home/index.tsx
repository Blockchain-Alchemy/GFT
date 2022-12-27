import { UnityProvider } from 'contexts/UnityProvider';
import Play from './Play';

const unityConfig = {
  loaderUrl: 'Build/public.loader.js',
  dataUrl: 'Build/public.data.unityweb',
  frameworkUrl: 'Build/public.framework.js.unityweb',
  codeUrl: 'Build/public.wasm.unityweb',
};

const Home = () => {
  return (
    <UnityProvider unityConfig={unityConfig}>
      <Play />
    </UnityProvider>
  );
};

export default Home;
