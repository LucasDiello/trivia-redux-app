import { NAME_LOGIN, EMAIL_LOGIN } from "../action";

const INITIAL_STATE = {
  Player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

const loginReducer = (state = INITIAL_STATE, action) => {

};

export default loginReducer;
