/* exported data */

var data = {
  view: 'search',
  favoriteCards: {
    cards: [],
    nextCardId: 0
  },
  resultId: 1
};

var previousCards = localStorage.getItem('storedCards');

if (previousCards !== null) {
  data = JSON.parse(previousCards);
}

window.addEventListener('beforeunload', saveCards);

function saveCards(event) {
  localStorage.setItem('storedCards', JSON.stringify(data));
}
