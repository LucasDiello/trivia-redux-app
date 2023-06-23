import { NAME_LOGIN, EMAIL_LOGIN, SCORE_SOM } from '../action';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',

};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NAME_LOGIN:
    return {
      ...state,
      name: action.name,
    };
  case EMAIL_LOGIN:
    return {
      ...state,
      gravatarEmail: action.email,
    };
  case SCORE_SOM:
    return {
      ...state,
      score: state.score + action.score,
    };
  default:
    return state;
  }
};

export default loginReducer;
