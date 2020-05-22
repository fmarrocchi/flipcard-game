import React, {Component} from 'react';
import './App.css';
import Board from './components/Board';
import buildGame from './utils/buildGame';

const getInitialState = () => {
  const deckOfCards = buildGame();
  return {
    deckOfCards,
    pairSelected: [],
    comparing: false,
    intents: 0
  };
}

class App extends Component{
    constructor(props){
      super(props);
      this.state = getInitialState();
    }
    render(){
      return (        
        <div className="App">
          <header className="App-header" />
          <p>React FlipCard Game</p>
          <p>Intentos: {this.state.intents}</p>
          <Board 
            deckOfCards={this.state.deckOfCards}
            pairSelected={this.state.pairSelected}
            selectCard= { (card) => this.selectCard(card)}
          />
        </div>
      );
    }
  
    selectCard(card) {
      if (
        this.state.comparing || 
        this.state.pairSelected.indexOf(card) > -1 ||
        card.discovered
      ) {      
        return;
      }

      const pairSelected = [...this.state.pairSelected, card];
      this.setState({
        pairSelected
      })

      if (pairSelected.length === 2){
        this.compareSelectedPair(pairSelected);
      }
    }

    compareSelectedPair(pairSelected){
      this.setState({
        comparing: true,
        intents: this.state.intents +1
      });

      setTimeout(() => {
        const [firstCard, secondCard] = pairSelected;
        let deckOfCards = this.state.deckOfCards;

        if (firstCard.icon === secondCard.icon) {
          deckOfCards = deckOfCards.map((card) => {
            if (card.icon !== firstCard.icon) {
              return card;
            }
            return {...card, discovered: true};
          });
        }
        console.log("baraja: " + deckOfCards);
        this.setState({
          pairSelected: [],
          deckOfCards,
          comparing: false
        });  
      }, 1000);
  }
}

export default App;
