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
          <div>
            <button onClick={() => this.restart() }>Reiniciar </button>
          </div>
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
        comparing: true
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
          this.isWinner(deckOfCards);
        }
        this.setState({
          pairSelected: [],
          deckOfCards,
          comparing: false,
          intents: this.state.intents + 1
        });  
      }, 1000);
    }

    restart (){
      let currenState = this;
      currenState.setState(        
       getInitialState()
      )
    }

    isWinner (deckOfCards){
      console.log("entre");
      /*Filter the deck of cards to get only cards that have not yet been discovered. 
        If it is 0 we have discovered all*/
      if( deckOfCards.filter((card) => !card.discovered).length === 0 ){
        alert("WINNER!!!! You won in "+ this.state.intents + " intents! ")
      }
    }
}

export default App;
