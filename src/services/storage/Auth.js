import store from "../index";

export const authenticate = async ({ token }) => {
  try {
    if (!token) {
      throw new Error("Token de acesso inválido.");
    }

    await localStorage.setItem("@UserSession", token);
    store.dispatch(updateUser({ token }));
  } catch (error) {
    handleAsyncStorageError(error);
  }
};

export const getSession = () => {
  try {
    const userSession = store.getState().user?.value?.token;
    if (userSession) return userSession;
    const session = localStorage.getItem("@UserSession");
    return session;
  } catch (error) {
    handleLocalStorageError(error);
  }
};

export const getUser = async () => {
  try {
    const userInfo = store.getState().user;
    if (userInfo?.value && Object.keys(userInfo.value).length > 0)
      return userInfo.value;
    const user = localStorage.getItem("@User");
    return JSON.parse(user);
  } catch (error) {
    handleLocalStorageError(error);
    return null;
  }
};

export default {
  getSession,
  getUser,
  authenticate,
};
