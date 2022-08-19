/* exported data */

var data = {
  view: 'search',
  storedCards: {
    cards: [],
    nextCardId: 0
  },
  resultId: 1
};

var storedEntries = localStorage.getItem('storedEntries');

if (storedEntries !== null) {
  data = JSON.parse(storedEntries);
}

window.addEventListener('beforeunload', saveEntries);

function saveEntries(event) {
  localStorage.setItem('storedEntries', JSON.stringify(data));
}
