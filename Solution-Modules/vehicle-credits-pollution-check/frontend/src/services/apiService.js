import axios from 'axios';

const backendUrl = 'http://localhost:43056';

function buildIssueForm(form) {
  return {
    AssetId: form.energyId,
    RecipientEmail: form.email,
    Amount: parseInt(form.quantity),
  };
}

export const createGreenEnergy = (form) => axios({
  method: 'post',
  baseURL: backendUrl,
  url: `api/energycredits/${form.energyType}`,
  config: { headers: { 'Content-Type': 'application/json' } },
});

export const getGreenEnergies = () => axios({
  method: 'get',
  baseURL: backendUrl,
  url: `api/energycredits`,
});

export const getGreenEnergy = (greenEnergyId) => axios({
  method: 'get',
  baseURL: backendUrl,
  url: `api/energycredits/${greenEnergyId}`,
});

export const issueGreenCredits = (form) => axios({
  method: 'post',
  baseURL: backendUrl,
  url: 'api/energycredits/issue',
  data: buildIssueForm(form),
  config: { headers: { 'Content-Type': 'application/json' } },
});

export const getBalances = () => axios({
  method: 'get',
  baseURL: backendUrl,
  url: 'api/energycredits/balances',
});

export const transferGreenCredits = () => {
  // Call your endpoint of the backend
};

export const getBuyOrderBook = () => {
  // Call your endpoint of the backend
};

export const getSellOrderBook = () => {
  // Call your endpoint of the backend
};

export const buyGreenCredits = () => {
  // Call your endpoint of the backend
};

export const sellGreenCredits = () => {
  // Call your endpoint of the backend
};

export const das = () => {
  // Call your endpoint of the backend
};