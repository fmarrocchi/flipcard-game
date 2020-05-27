import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class CurrentPlayer extends Component {
  render () {    
    if (this.props.name === '')
      /*dont have name */
      return(
        <aside className="Player-input">
          <p>Please enter yout name:</p>    
          <input type="text" id="newNameField"></input>
          <button onClick= {this.props.changePlayer} >OK</button>
        </aside>
    )    
    else
      return(
        <div className="Player-panel">
          <p>Current player</p>    
          <p>Name:  {this.props.name} </p>
          <p>#Attempts: {this.props.intents}</p>
        </div>
      )
  }
};