var $searchInput = document.querySelector('#search-input');
var $searchButton = document.querySelector('#search-button');
var $searchResults = document.querySelector('#search-results');

$searchButton.addEventListener('click', showResults);

function showResults(event) {
  $searchResults.replaceChildren('');
  data.resultId = 1;
  event.preventDefault();
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=' + $searchInput.value);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      for (let i = 0; i < this.response.data[0].card_images.length; i++) {
        var div = document.createElement('div');
        div.setAttribute('class', 'column-fifth');
        div.setAttribute('data-result-id', data.resultId);
        data.resultId++;
        var img = document.createElement('img');
        img.setAttribute('class', 'card');
        img.setAttribute('src', this.response.data[0].card_images[i].image_url);
        img.setAttribute('alt', this.response.data[0].name);
        div.appendChild(img);
        $searchResults.appendChild(div);
      }
    } else if (xhr.status === 400) {
      var noCard = document.createElement('div');
      noCard.setAttribute('class', 'row');
      var h1 = document.createElement('h1');
      h1.setAttribute('class', 'no-card-text');
      var noCardFoundText = document.createTextNode('No Card Found');
      h1.appendChild(noCardFoundText);
      noCard.appendChild(h1);
      $searchResults.appendChild(noCard);
    }
  });
  xhr.send();
}
