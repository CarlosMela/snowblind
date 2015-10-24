'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Viewport from '../world/components/viewport';
import Console from '../console/components/console';
import * as playerActionCreators from '../player/actions/index';
import * as historyActionCreators from '../history/actions/index';
import * as discoveredActionCreators from '../discovered/actions/index';
import io from 'socket.io-client';


class GameContainer extends Component {
  constructor(props) {
	super(props);
    const {player, log, history, discovered, terrain } = props;
    this.state = {player, log, history, discovered, terrain };
  }
  
  componentDidMount(){
	  this.sockettoserver();
  }
  
  sockettoserver(){
	  var socket = io();
	  socket.on('server_redux_state', (state) =>{
		  const {player, log, history, discovered, terrain } = state;
		  this.setState({player, log, history, discovered, terrain });
	  });
  }
  
  movePlayer(move){
    var socket = io();
    socket.emit('movePlayer',move);
  }
  
  render() {
    const { player, log, history, discovered, terrain } = this.state;

    return (
      <div>
        <h1>Snowblind</h1>
        <Viewport
          move={this.movePlayer}
          player={player}
          history={history}
          terrain={terrain}
          discovered={discovered}
          zoom={1}/>
        <Console log={log}/>
      </div>
    );
  }
}

GameContainer.propTypes = {
  player: React.PropTypes.object,
  log: React.PropTypes.array,
  history: React.PropTypes.array,
  discovered: React.PropTypes.array,
  terrain: React.PropTypes.array
};

const select = (state) => {
  return {
    player: state.player,
    log: state.log,
    history: state.history,
    discovered: state.discovered,
    terrain: state.terrain
  };
};

export { GameContainer };
export default connect(select)(GameContainer);
