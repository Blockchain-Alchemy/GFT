import { useCallback } from 'react';
import { useWallet } from 'contexts/WalletProvider';
import { useNetwork } from 'contexts/NetworkProvider';

export type MarketItem = {
  owner: string;
  token_id: number;
  price: number;
  amount: number;
};

const useMarket = () => {
  const { config } = useNetwork();
  const { tezos } = useWallet();

  const addMarketItems = useCallback(
    async (items: MarketItem[]) => {
      try {
        const contract = await tezos.wallet.at(config.Market);
        const op = await contract.methods.add_items(items).send();
        const tx = await op.confirmation(1);
        return tx;
      } catch (error) {
        console.error(error);
      }
    },
    [tezos, config]
  );

  const buyMarketItems = useCallback(
    async (items: MarketItem[]) => {
      try {
        const contract = await tezos.wallet.at(config.Market);
        const op = await contract.methods.buy_items(items).send();
        const tx = await op.confirmation(1);
        return tx;
      } catch (error) {
        console.error(error);
      }
    },
    [tezos, config]
  );

  const getMarketItems = useCallback(
    async (address: string): Promise<MarketItem[] | undefined> => {
      try {
        const contract = await tezos.contract.at(config.Market);
        const storage: any = await contract.storage();
        return storage.items
          .filter((i) => i.owner === address)
          .map((i) => {
            return {
              owner: i.owner,
              token_id: i.token_id.toNumber(),
              price: i.price.toNumber(),
              amount: i.amount.toNumber(),
            } as MarketItem;
          });
      } catch (error) {
        console.error(error);
      }
    },
    [tezos, config]
  );

  return { addMarketItems, buyMarketItems, getMarketItems };
};

export default useMarket;
