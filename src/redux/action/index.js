import md5 from 'crypto-js/md5';

export const NAME_LOGIN = 'NAME_LOGIN';
export const EMAIL_LOGIN = 'EMAIL_LOGIN';
export const REQUEST = 'REQUEST';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const LOGOUT = 'LOGOUT';
export const SCORE_SOM = 'SCORE_SOM';

export const nameLogin = (name) => ({
  type: NAME_LOGIN,
  name,
});

export const emailLogin = (email) => ({
  type: EMAIL_LOGIN,
  email,
});

export const requestToken = (token) => ({
  type: REQUEST,
  token,
});

export const requestQuestions = (questions) => ({
  type: REQUEST_QUESTIONS,
  questions,
});

export const logout = () => {
  localStorage.removeItem('token');

  return {
    type: LOGOUT,
  };
};

export const scoreSom = (score) => ({
  type: SCORE_SOM,
  score,
});

// função gravatar

export const fetchGravatar = (hash) => {
  const hashConvertido = md5(hash).toString();
  const retornoApi = `https://www.gravatar.com/avatar/${hashConvertido}`;
  return retornoApi;
};

// função que faz a requisição da API das perguntas

export const fetchQuestions = (token) => async (dispatch) => {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    dispatch(requestQuestions(data));
  } catch (error) {
    console.log('funciona pelo amor de deus');
  }
};

// função que faz a requisição da API do token

export const fetchToken = () => (dispatch) => {
  fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem('token', data.token);
      dispatch(requestToken(data.token));
    });
};

// função que calcula o score

export const calculaScore = (seconds, difficulty) => (dispatch) => {
  let valueScore = 0;
  const valorAcerto = 10;
  const valorHard = 3;
  const valorMedium = 2;
  const valorEasy = 1;

  if (difficulty === 'hard') {
    valueScore += valorAcerto + (valorHard * seconds);
    dispatch(scoreSom(valueScore));
  } else if (difficulty === 'medium') {
    valueScore += valorAcerto + (valorMedium * seconds);
    dispatch(scoreSom(valueScore));
  } else {
    valueScore += valorAcerto + (valorEasy * seconds);
    dispatch(scoreSom(valueScore));
  }
};
