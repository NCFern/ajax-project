var $searchInput = document.querySelector('#search-input');
var $searchButton = document.querySelector('#search-button');
var $searchResults = document.querySelector('#search-results');
var $dataView = document.querySelectorAll('[data-view');
var $returnButton = document.querySelector('.return-button');
var $favoriteButton = document.querySelector('.favorite-button');

var $cardImage = document.querySelector('.selected-card');
var $cardName = document.querySelector('.card-name');
var $cardSet = document.querySelector('.card-set');
var $cardRarity = document.querySelector('.card-rarity');
// var $cardDesc = document.querySelector('.card-desc');
var $priceTcg = document.querySelector('.card-tcgplayer');
var $priceAmazon = document.querySelector('.card-amazon');
var $priceEbay = document.querySelector('.card-ebay');

var $response = {};

$searchButton.addEventListener('click', showResults);

function showResults(event) {
  $searchResults.replaceChildren('');
  data.resultId = 1;
  event.preventDefault();
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=' + $searchInput.value);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    $response = xhr.response;
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

$returnButton.addEventListener('click', clickReturn);

function viewSwap(viewName) {
  for (var i = 0; i < $dataView.length; i++) {
    if ($dataView[i].getAttribute('data-view') === viewName) {
      $dataView[i].className = 'view';
    } else if ($dataView[i].getAttribute('data-view') !== viewName) {
      $dataView[i].className = 'view hidden';
    }
  }
}

function clickReturn(event) {
  viewSwap('search');
}

$searchResults.addEventListener('click', renderDetails);

function renderDetails(event) {
  if (event.target.className === 'card') {
    $cardImage.setAttribute('src', $searchResults.childNodes[event.target.closest('div').getAttribute('data-result-id')].childNodes[0].src);
    $cardName.textContent = $response.data[0].name;
    $cardSet.textContent = $response.data[0].card_sets[0].set_name;
    $cardRarity.textContent = $response.data[0].card_sets[0].set_rarity;
    // $cardDesc.textContent = $response.data[0].desc;
    $priceTcg.textContent = 'TCG Player = $' + $response.data[0].card_prices[0].tcgplayer_price;
    $priceAmazon.textContent = 'Amazon = $' + $response.data[0].card_prices[0].amazon_price;
    $priceEbay.textContent = 'Ebay = $' + $response.data[0].card_prices[0].ebay_price;

    viewSwap('details');
  }
}

$favoriteButton.addEventListener('click', addFavorites);

function addFavorites(event) {
  // console.log(event.target);
  if (event.target.getAttribute('data-result-id') === 'favorite-button') {
    data.favoriteCards.cards.push($response);
    data.favoriteCards.cards[data.favoriteCards.nextCardId].imageUrl = $searchResults.childNodes[event.target.closest('div').getAttribute('data-result-id')].childNodes[0].src;
    data.favoriteCards.cards[data.favoriteCards.nextCardId].cardId = data.favoriteCards.nextCardId;
    data.favoriteCards.nextCardId++;
  }
}
