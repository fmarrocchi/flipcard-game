import React, {Component} from 'react';

export default class PositionTable extends Component {
  render () {        
    let positions = this.props.positions;
    return (
      <div className="Position-table"> 
        <p> Positions Table</p>
        {        
        positions.map((player) => {
          return(
            <span>              
              <p>Player : {player[0]}</p>
              <p>#Attempts: {player[1]}</p>
            </span>);
          })
        }
      </div>         
    ); 
  }
};