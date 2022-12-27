import { useWallet } from 'contexts/WalletProvider';

const ConnectWallet = () => {
  const { address, connectWallet, disconnectWallet } = useWallet();

  const handleConnect = () => {
    if (!address) {
      connectWallet();
    } else {
      disconnectWallet();
    }
  };

  return (
    <button
      className="block px-6 py-2.5 mt-4 font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg lg:mt-0 hover:bg-blue-500 lg:w-auto"
      onClick={handleConnect}
    >
      {!address ? 'Connect Wallet' : 'Disconnect'}
    </button>
  );
};

export default ConnectWallet;
