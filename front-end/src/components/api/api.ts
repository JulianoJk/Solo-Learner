import { IUserInfoContext } from '../../Model/models';
const URL: string = 'http://localhost:3001/';
export const loginAPI = async ({
  email,
  password,
}: any): Promise<IUserInfoContext | undefined> => {
  try {
    const response = await fetch(URL + 'users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data: IUserInfoContext = await response.json();
    return data;
  } catch (error) {
    return;
  }
};

export const registerAPI = async ({
  email,
  username,
  password,
  passwordRepeat,
}: any): Promise<IUserInfoContext | undefined> => {
  try {
    const response = await fetch(URL + 'users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
        passwordRepeat: passwordRepeat,
      }),
    });
    const data: IUserInfoContext = await response.json();
    return data;
  } catch (error) {
    return;
  }
};
export const profileAPI = async (
  token: string
): Promise<IUserInfoContext | undefined> => {
  try {
    const response = await fetch(
      `http://localhost:3001/users/profile/${token}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const data: IUserInfoContext = await response.json();
    return data;
  } catch (error) {
    return;
  }
};
export const saveProfileImageAPI = async ({
  token,
  email,
  password,
}: any): Promise<IUserInfoContext | undefined> => {
  try {
    const response = await fetch(URL + `users/deleteAccount/${token}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data: IUserInfoContext = await response.json();
    return data;
  } catch (error) {
    return;
  }
};

export const deleteAccountAPI = async ({
  id,
  email,
  password,
}: any): Promise<IUserInfoContext | undefined> => {
  try {
    const response = await fetch(URL + `users/deleteAccount/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data: IUserInfoContext = await response.json();
    return data;
  } catch (error) {
    return;
  }
};
