import { useCallback } from 'react';
import { useWallet } from 'contexts/WalletProvider';

export type MarketItem = {
  owner: string;
  token_id: number;
  price: number;
  amount: number;
};

const useMarket = () => {
  const { tezos } = useWallet();

  const addMarketItems = useCallback(
    async (items: MarketItem[]) => {
      try {
        const contract = await tezos.wallet.at(
          'KT1V2tXEnb43yxxeb93N8E3ho6kVeTbsmVwC'
        );
        const op = await contract.methods.token(items).send();
        const tx = await op.confirmation(1);
        return tx;
      } catch (error) {
        console.error(error);
      }
    },
    [tezos]
  );

  const getMarketItems = useCallback(
    async (address: string): Promise<MarketItem[] | undefined> => {
      try {
        const contract = await tezos.contract.at(
          'KT1V2tXEnb43yxxeb93N8E3ho6kVeTbsmVwC'
        );

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
    [tezos]
  );

  return { addMarketItems, getMarketItems };
};

export default useMarket;
