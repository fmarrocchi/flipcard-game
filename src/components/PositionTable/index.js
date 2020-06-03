import React, {Component} from 'react';

export default class PositionTable extends Component {
  render () {        
    let positions = this.props.positions;
    return (
      <div className="Position-table"> 
      <p>Positions Table</p>
       {        
        positions.map((obj, index) => {
          return(
            <tr key= {index}>              
              <td>#{index} {obj.name}</td>
              <td> {obj.intents}</td>
            </tr>)
          })
        }
      </div>         
    ); 
  }
};