import { combineReducers } from 'redux';
import player from './player';
import requestQuestions from './questions';

export const rootReducer = combineReducers({ player, requestQuestions });
