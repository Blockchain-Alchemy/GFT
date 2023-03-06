import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export const getEdition4Tokens = (address: string) => {
  const url = `${BASE_URL}/api/index/tokens/e4/${address}`;
  return axios.get(url).then((res) => {
    return res.data;
  });
};

export const getEntryCoin = (address: string, tokenId: number = 3) => {
  const url = `${BASE_URL}/api/index/tokens/entrycoin/${address}/${tokenId}`;
  return axios.get(url).then((res) => {
    return res.data;
  });
};

export const updateEntryCoinAmount = (address: string, amount: number) => {
  const url = `${BASE_URL}/api/index/tokens/entrycoin`;
  const payload = { address, amount };
  return axios.post(url, payload).then((res) => {
    return res.data;
  });
};

export const mint = (payload) => {
  const url = `https://hereandnow-passage-api.onrender.com/mint`;
  const config = {
    headers: {
      'X-Api-Key': 'a84aa382-00bd-4da6-b32d-c47bae648aee',
    },
  };
  return axios.post(url, payload, config).then((res) => {
    return res.data;
  });
};
