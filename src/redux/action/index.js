export const NAME_LOGIN = 'NAME_LOGIN';
export const EMAIL_LOGIN = 'EMAIL_LOGIN';
export const REQUEST = 'REQUEST';

export const nameLogin = (name) => ({
  type: NAME_LOGIN,
  name,
});

export const emailLogin = (email) => ({
  type: EMAIL_LOGIN,
  email,
});

export const requestToken = (token) => {
  localStorage.setItem('token', token);

  return {
    type: REQUEST,
    token,
  };
};

export const fetchToken = () => (dispatch) => {
  fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((data) => {
      dispatch(requestToken(data.token));
    });
};
