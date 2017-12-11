import Constants from './constants';

export default {
  saveFile: (saveFile) => {
    localStorage.setItem('saveFile', JSON.stringify(saveFile));
    return Promise.resolve(true);
  },

  getSaveFile: () => Promise.resolve(JSON.parse(localStorage.getItem('saveFile'))),

  fetchPing: () => fetch(`${Constants.API_URI}${Constants.PING_ENDPOINT}`)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(resp);
      }
      return resp.json();
    }),
};
