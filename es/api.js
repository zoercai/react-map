export default {
  saveFile: function saveFile(_saveFile) {
    localStorage.setItem('saveFile', JSON.stringify(_saveFile));
    return Promise.resolve(true);
  },

  getSaveFile: function getSaveFile() {
    return Promise.resolve(JSON.parse(localStorage.getItem('saveFile')));
  }
};