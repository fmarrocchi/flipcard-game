import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FlipCard from 'react-flipcard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Card.css';

export default class Card extends Component {
  render () {    
    return (
      <div className="card" onClick={this.props.selectCard}> 
        <FlipCard 
          flipped={(this.props.comparing || this.props.discovered)}
          disabled={true}
        > 
          <div className="cover">  </div>
          <div className="content">
            <FontAwesomeIcon className="icon" icon={this.props.icon} />
          </div>
        </FlipCard>
      </div>
    )    
  }
};
