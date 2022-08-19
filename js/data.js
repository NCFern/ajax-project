/* exported data */

var data = {
  view: 'search',
  favoriteCards: {
    cards: [],
    nextCardId: 0
  },
  resultId: 1
};

var storedCards = localStorage.getItem('storedCards');

if (storedCards !== null) {
  data = JSON.parse(storedCards);
}

window.addEventListener('beforeunload', saveEntries);

function saveEntries(event) {
  localStorage.setItem('storedEntries', JSON.stringify(data));
}
