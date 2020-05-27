import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Card from '../Card';
import './Board.scss';

export default class Board extends Component{
  render() {    
    return (      
      <div className="board"> 
      {
        this.props.deckOfCards
          .map((card, index) => {
            const comparing = this.props.pairSelected.indexOf(card) > -1;
            return <Card 
              key={index}
              icon={card.icon} 
              comparing={comparing}
              selectCard ={()=> this.props.selectCard(card)}
              discovered={card.discovered}
              isFlipped= {card.isFlipped}
            />;
          })    
        }
      </div>
    );
  }
}
