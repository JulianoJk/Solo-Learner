import { IUserInfoContext } from "../../Model/UserModels";
const URL: string = "http://localhost:3001/";
export const loginAPI = async ({
  email,
  password,
}: any): Promise<IUserInfoContext | undefined> => {
  try {
    const response = await fetch(URL + "users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    const response = await fetch(URL + "users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    const response = await fetch(URL + `users/profile/${token}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data: IUserInfoContext = await response.json();
    return data;
  } catch (error) {
    return;
  }
};
export const saveProfileImageAPI = async ({
  token,
  email,
}: any): Promise<IUserInfoContext | undefined> => {
  try {
    const response = await fetch(URL + `users/deleteAccount/${token}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
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
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
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

export const getProfileImageAPI = async (
  id: string
): Promise<IUserInfoContext | undefined> => {
  try {
    const response = await fetch(URL + `users/profileImage/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data: IUserInfoContext = await response.json();
    return data;
  } catch (error) {
    return;
  }
};

export const sendImageToServerAPI = async (
  data: any,
  userID: string | undefined
) => {
  try {
    const formData = new FormData();
    formData.append("file", data[0]);
    const res = await fetch(
      `http://localhost:3001/users/profile-image/${userID}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const results: any = await res.json();
    return results;
  } catch (error) {
    return;
  }
};
