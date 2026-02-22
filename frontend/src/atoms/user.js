import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {
    user: null,
    role: null,
    loggedIn: false,
  },
});
