export default {
  saveFile: (saveFile) => {
    localStorage.setItem('saveFile', JSON.stringify(saveFile));
    return Promise.resolve(true);
  },

  getSaveFile: () => Promise.resolve(JSON.parse(localStorage.getItem('saveFile'))),
};
