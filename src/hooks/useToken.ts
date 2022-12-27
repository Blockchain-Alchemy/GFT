import { useCallback } from 'react';
import { useWallet } from 'contexts/WalletProvider';

const useToken = () => {
  const { tezos } = useWallet();

  const getGateToken = useCallback(
    async (address: string) => {
      try {
        const contract = await tezos.contract.at(
          'KT1SGdop74rGobKAETcBPnz9yQkH38hZnpBh'
        );
        const storage: any = await contract.storage();
        const values = await storage.ledger.get({
          0: address,
          1: 1,
        });
        return values ? values.toNumber() : 0;
      } catch (error) {
        console.error(error);
      }
    },
    [tezos]
  );

  return { getGateToken };
};

export default useToken;
