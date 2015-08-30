'use strict';

import React, { Component } from 'react';

class Player extends Component {
  render () {
    return (
      <div className="player" style={{left: this.props.pos.x, top: this.props.pos.y}}/>
    );
  }
}

export default Player;
