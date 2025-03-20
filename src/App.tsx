import { useEffect } from "react";
import { Provider, useDispatch } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { CustomThemeProvider } from "./context";
import Routes from "./routes";
import store from "./services/index";
import { updateUser } from "./services/reducers/user";
import Auth from "./services/storage/Auth";
import { GlobalStyle } from "./styles/global";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const [session, incommingUser] = await Promise.all([
          Auth.getSession(),
          Auth.getUser(),
        ]);
        if (!session || !incommingUser) return;
        dispatch(updateUser({ ...incommingUser, token: session }));
      } catch (error) {
        console.error({ title: "Load_User", error });
      }
    })();
  }, [dispatch]);

  return (
    <CustomThemeProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </CustomThemeProvider>
  );
};

export function WrappedApp() {
  return (
    <Provider store={store}>
      <App />
      <GlobalStyle />
    </Provider>
  );
}
