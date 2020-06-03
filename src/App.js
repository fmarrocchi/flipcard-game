import React, {Component} from 'react';
import './App.scss';
import buildGame from './utils/buildGame';
import Board from './components/Board';
import CurrentPlayer from './components/CurrentPlayer';
import PositionTable from './components/PositionTable';

const getInitialState = () => {
  const deckOfCards = buildGame();
  return {
    deckOfCards,
    pairSelected: [],
    comparing: false,
    intents: 0, 
    name: '',
    positions: []
  };
}

class App extends Component{
    constructor(props){
      super(props);
      this.state = getInitialState();
      //binding the method restart. This binding is necessary to make `this` work in the callback
      this.restart = this.restart.bind(this);
      this.setPlayer = this.setPlayer.bind(this);
      this.changePlayer = this.changePlayer.bind(this);
      this.resetPositions = this.resetPositions.bind(this);
    }
    render(){
      return (        
        <div className="App">
          <header className="App-header">
            <nav>  
              <button onClick={this.resetPositions}>Reset Positions </button>
              <button onClick={this.restart}>New Game</button>
              <button onClick={this.changePlayer}>Change Player </button>
            </nav>
          </header>

          <body>            
            <h1>React FlipCard Game</h1>
            <Board
              deckOfCards={this.state.deckOfCards}
              pairSelected={this.state.pairSelected}
              selectCard= { (card) => this.selectCard(card)}
            />

            <CurrentPlayer 
              name={this.state.name}
              intents={this.state.intents}
              setPlayer={this.setPlayer}
            />
            <PositionTable 
              positions={this.state.positions}
            />
          </body>
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
      let currentState = this;      
      let keepName = this.state.name;
      let keepPositions = this.state.positions;
      currentState.setState(       
       getInitialState()
      );
      currentState.setState({
        positions: keepPositions
      })
      if (keepName !== ''){
        currentState.setState({
          name: keepName
        })
      }
    }

    setPlayer(){
      const newName = document.getElementById('newNameField').value;
      this.setState({
        name: newName
      })
    }

    changePlayer(){
      this.setState({
        name:''
      })
    }

    resetPositions(){
      this.setState({
        positions:[]
      })
    }

    isWinner (deckOfCards){
      /*Filter the deck of cards to get only cards that have not yet been discovered. 
        If it is 0 we have discovered all*/
      if( deckOfCards.filter((card) => !card.discovered).length !== 0 ){
        alert("WINNER!!!! You won in "+ this.state.intents + " intents! ")
        
        this.state.positions.push([this.state.name, this.state.intents]);
        console.log("positions in app: " +this.state.positions);

      }
      
    }
}

export default App;
