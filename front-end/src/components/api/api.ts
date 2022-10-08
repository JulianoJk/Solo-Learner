// API call to use when user wants to login
export const loginAPI = async (
    email: string,
    password: string
  ): Promise<IUserInfoContext | string | undefined> => {
    try {
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data: IUserInfoContext = await response.json();
      if (response.ok) {
        return data;
      } else {
        return data.message;
      }
    } catch (error) {
      return;
    }
  };