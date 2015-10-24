'use strict';

import {movePlayer} from '../../app/modules/player/actions/index';
import {addHistory} from '../../app/modules/history/actions/index';
import {addDiscovered} from '../../app/modules/discovered/actions/index';
import { get } from '../../app/helpers/fetch';

let _io;

const getState = async () => {
	  const url = '/api/';
	  const state = await get(url);
	  return state;
	};

const connectClientActions = ()=>{
	const io = _io;

	io.on('connection', function(socket){
		
		socket.on('movePlayer', async (payload)=>{
			addHistory(payload.pos);
			addDiscovered(payload.pos);
			movePlayer(payload.direction);
			
			const state = await getState();
			io.emit('server_redux_state', state);
		});
		
	});
}

export { connectClientActions };
export default (io)=>{
						if(io) _io=io; 
						return _io;
					};