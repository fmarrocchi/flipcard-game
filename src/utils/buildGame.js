import { faDog, faFish, faCat, faCrow, faSpider, faHippo, faDragon, faPaw, faFrog, faHorseHead, faCaretSquareDown } from '@fortawesome/free-solid-svg-icons';
/*npm install --save lodash.shuffle method to can mix the 
position of card so we dont have always the cards on the same position */
import shuffle from 'lodash.shuffle';

const NUMBER_OF_CARDS = 20;

export default () => {
  const iconCards = [faCat, faDog, faFish, faCrow, faSpider, faHippo, faDragon, faPaw, faFrog, faHorseHead];
  let cards = [];

  while (cards.length < NUMBER_OF_CARDS) {
    const index = Math.floor(Math.random() * iconCards.length);    
    const card = {
      icon: iconCards.splice(index, 1)[0], //splice: saca 1 elemento desde el indice index y devuelve un arreglo. en [0] encuentro el elemento
      //guessed is true if the card was guessed with the pair
      guessed: false
    };
    //Add the cart to the deck of cards twice to have de pair of equal cards
    cards.push(card);
    //Clone the card so we can set different position on board
    cards.push({...card});
  }
  //Shuffle card to get the game
  return shuffle(cards);
}

