export const NAME_LOGIN = 'NAME_LOGIN';
export const EMAIL_LOGIN = 'EMAIL_LOGIN';

export const nameLogin = (name) => ({
  type: NAME_LOGIN,
  name,
});

export const emailLogin = (email) => ({
  type: EMAIL_LOGIN,
  email,
});
