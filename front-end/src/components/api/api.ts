import {
  GetUsersListResponse,
  IApiError,
  IApiMessageResponse,
  IUserInfoContext,
  UserContextState,
} from '../../Model/UserModels';
const URL: string = 'http://localhost:3001/';
export const loginAPI = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<IUserInfoContext | IApiError> => {
  try {
    const response = await fetch(`${URL}users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorData: IApiError = await response.json();
      return errorData;
    }

    const data: IUserInfoContext = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return {
      error: {
        message: 'Something went wrong. Please try again later.',
      },
    } as IApiError;
  }
};

export const registerAPI = async ({
  email,
  username,
  gender,
  password,
  confirmPassword,
}: {
  email: string;
  username: string;
  gender: string;
  password: string;
  confirmPassword: string;
}): Promise<IUserInfoContext | IApiError> => {
  try {
    const response = await fetch(`${URL}users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        username,
        gender,
        password,
        confirmPassword,
      }),
    });

    if (!response.ok) {
      const errorData: IApiError = await response.json();
      return errorData;
    }

    const data: IUserInfoContext = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return {
      error: {
        message: 'Something went wrong. Please try again later.',
      },
    } as IApiError;
  }
};

export const adminDashboardAPI = async (token: string) => {
  try {
    const response = await fetch(URL + 'admin/dashboard', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
};
export const saveProfileImageAPI = async ({
  token,
  email,
}: any): Promise<IUserInfoContext | undefined> => {
  try {
    const response = await fetch(URL + `users/deleteAccount/${token}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
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
  token,
  email,
  password,
}: any): Promise<IApiMessageResponse | IApiError> => {
  try {
    const response = await fetch(URL + `users/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (!response.ok) {
      const errorData: IApiError = await response.json();
      return errorData;
    }

    const data: IApiMessageResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return {
      error: {
        message: 'Something went wrong. Please try again later.',
      },
    } as IApiError;
  }
};
export const adminDeleteUserAccount = async ({
  token,
  Id,
}: any): Promise<IApiMessageResponse | IApiError> => {
  try {
    const response = await fetch(URL + `admin/dashboard/delete_user`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        token: token,
        id: Id.toString(),
      }),
    });
    if (!response.ok) {
      const errorData: IApiError = await response.json();
      return errorData;
    }

    const data: IApiMessageResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return {
      error: {
        message: 'Something went wrong. Please try again later.',
      },
    } as IApiError;
  }
};

export const getProfileImageAPI = async (
  id: string,
): Promise<IUserInfoContext | undefined> => {
  try {
    const response = await fetch(URL + `users/profileImage/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data: IUserInfoContext = await response.json();
    return data;
  } catch (error) {
    return;
  }
};

export const sendImageToServerAPI = async (
  data: any,
  userID: string | undefined,
) => {
  try {
    const formData = new FormData();
    formData.append('file', data[0]);
    const res = await fetch(
      `http://localhost:3001/users/profile-image/${userID}`,
      {
        method: 'POST',
        body: formData,
      },
    );
    const results: any = await res.json();
    return results;
  } catch (error) {
    return;
  }
};
export const updateUsernameAPI = async ({
  token,
  email,
  newUsername,
}: any): Promise<IApiMessageResponse | IApiError> => {
  try {
    const response = await fetch(URL + `users/update/username`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        email: email,
        username: newUsername,
      }),
    });
    if (!response.ok) {
      const errorData: IApiError = await response.json();
      return errorData;
    }

    const data: IApiMessageResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return {
      error: {
        message: 'Something went wrong. Please try again later.',
      },
    } as IApiError;
  }
};
export const authenticateAPI = async (token: string) => {
  try {
    console.log(token);
    const response = await fetch(URL + 'users/checkToken', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return;
  }
};
export const adminGetAllUsersAPI = async (
  token: string,
): Promise<GetUsersListResponse | undefined> => {
  try {
    const response = await fetch(URL + 'admin/users/all/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data: GetUsersListResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
};
// export const getUsernameAPI = async (
//   username: string,
//   token: string,
// ): Promise<IUserInfoContext | IApiError> => {
//   try {
//     const response = await fetch(`${URL}profile/testme/${username}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       const errorData: IApiError = await response.json();
//       return errorData;
//     }

//     const data: IUserInfoContext = await response.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//     return {
//       error: {
//         message: 'Something went wrong. Please try again later.',
//       },
//     } as IApiError;
//   }
// };
export const profileAPI = async (
  username: string,
  token: string,
): Promise<UserContextState | undefined> => {
  try {
    const response = await fetch(`${URL}profile/testme/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data: UserContextState = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
};
export const getCurrentUser = async (token: string) => {
  try {
    const response = await fetch(URL + 'user/current_user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
};
export const getGoogleClientIdAPI = async () => {
  try {
    const response = await fetch(URL + 'api/auth/google-client-id', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Google Client ID');
    }

    const data = await response.json();

    if (data.status === 'completed' && data.id) {
      return data.id; // Assuming the response contains 'id' for the Google Client ID.
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch Google Client ID');
  }
};
export const postGoogleLogin = async (code: string) => {
  try {
    const response = await fetch('http://localhost:3001/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
};
