import {createConnect} from 'overmind-react';
import {state} from './state';
import {effects} from './effects';
import action from './actions';

const actions = action;

export const connect = createConnect();
export const config = {state, actions, effects};