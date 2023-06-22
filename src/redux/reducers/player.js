import { NAME_LOGIN, EMAIL_LOGIN } from '../action';

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
      Player: {
        ...state.Player,
        name: action.name,
      },
    };
  case EMAIL_LOGIN:
    return {
      ...state,
      Player: {
        ...state.Player,
        gravatarEmail: action.email,
      },
    };
  default:
    return state;
  }
};

export default loginReducer;
