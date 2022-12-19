import { useCallback } from 'react';
import { useWallet } from 'contexts/WalletProvider';

const useToken = () => {
  const { tezos } = useWallet();

  const findToken = useCallback(
    async (address: string) => {
      try {
        const contract = await tezos.wallet.at('contrat_address');
        const storage: any = await contract.storage();
        const key = {
          owner: address,
          token_id: 0,
        };
        const operators = await storage.operators.get(key);
        return !!operators;
      } catch (error) {
        console.error(error);
      }
    },
    [tezos]
  );

  return { findToken };
};

export default useToken;
