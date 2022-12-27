import { useCallback, useEffect, useMemo } from 'react';
import { useWallet } from 'contexts/WalletProvider';
import { useUnityContext } from 'contexts/UnityProvider';
import Unity, { UnityEventListener } from 'components/unity/Unity';
import useToken from 'hooks/useToken';
import useMarket from 'hooks/useMarket';

const MarketItemNames = {
  1: 'Ammo',
  2: 'Water',
  3: 'Fuel',
  4: 'Intel',
};

const Play = () => {
  const { address } = useWallet();
  const { getGateToken } = useToken();
  const { getMarketItems, buyMarketItems } = useMarket();
  const { unityContext } = useUnityContext();
  const { isLoaded, sendMessage } = unityContext;

  useEffect(() => {
    (async () => {
      if (isLoaded && address) {
        // Send wallet connected state.
        sendMessage('GFT', 'WalletConnected', address);

        // Check gate token
        const tokens = await getGateToken(address);
        tokens && sendMessage('GFT', 'TokenFound', 'EntryCoin');

        // Get Market Items.
        const items = await getMarketItems(address);
        console.log('items', items);
        if (items) {
          const values = {
            time_stamp: new Date().getTime(),
            items: items.map((item) => {
              return {
                name: MarketItemNames[item.token_id],
                price: item.price,
                amount: item.amount,
              };
            }),
          };
          console.log('values', values);
          sendMessage('GFT', 'LoadPrices', JSON.stringify(values));
        }
      }
    })();
  }, [isLoaded, sendMessage, address, getGateToken, getMarketItems]);

  // Event Listener for starting game
  const onStartGame = useCallback(() => {
    console.log('Start');
  }, []);

  // Event Listener for ending game
  const onEndGame = useCallback(() => {
    console.log('End');
  }, []);

  // Event Listener for transaction
  const onSendTransaction = useCallback(async (params: String) => {
    console.log('onSendTransaction', params);
    //await buyMarketItems(params);
    sendMessage('GFT', 'TransactionResult', "Success");
  }, [buyMarketItems, sendMessage]);

  const eventListeners = useMemo((): UnityEventListener[] => {
    return [
      { eventName: 'StartGame', callback: onStartGame },
      { eventName: 'EndGame', callback: onEndGame },
      { eventName: 'SendTransaction', callback: onSendTransaction },
    ];
  }, [onStartGame, onEndGame, onSendTransaction]);

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

/*const addItems = useCallback(async () => {
  if (address) {
    const items: any[] = [
      {
        token_id: 1,
        price: 3,
        amount: 5,
      },
      {
        token_id: 2,
        price: 4,
        amount: 8,
      },
    ];
    await addItem(items);
  }
}, [address, addItem]);*/
