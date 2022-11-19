import React, {
  FC,
  useReducer,
  useContext,
  PropsWithChildren,
  useEffect,
} from "react";
import { useMutate } from "restful-react";
import { getFlagSetters } from "../utils/flagsSetters";
import {
  logoutUserAction,
  sigInUserAction,
  sigInUserErrorAction,
  sigInUserSuccessAction,
  sigupUserAction,
  sigupUserErrorAction,
  sigupUserSuccessAction,
} from "./actions";
import {
  AuthActionsContext,
  AuthStateContext,
  ILogin,
  ISignUp,
} from "./contexts";
import { message } from "antd";
import { authReducer } from "./reducer";
import { IActiveUserInfo } from "../../models/account.model";
import { saveUserToken, removeAccessToken } from "../../utils/auth";
import { useRouter } from "next/router";
import { DASHBOARD_PAGE_URL } from "../../routes";

const AuthProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {});
  const { mutate: signUpHttp } = useMutate({
    path: "/api/auth/signup",
    verb: "POST",
  });
  const { mutate: loginUserHttp } = useMutate({
    path: "/api/auth/signin",
    verb: "POST",
  });

  const { push } = useRouter();

  useEffect(() => {
    if (state.activeUserInfo?.accessToken) {
      saveUserToken(state.activeUserInfo?.accessToken);
      push(DASHBOARD_PAGE_URL);
    }
  }, [state.activeUserInfo]);
  const signUpUser = (payload: ISignUp) => {
    dispatch(sigupUserAction());
    signUpHttp(payload)
      .then(({ user }) => {
        dispatch(sigupUserSuccessAction(user));
      })
      .catch(({ message: errorMessage }) => {
        dispatch(sigupUserErrorAction(errorMessage));
        message.error(errorMessage, 3);
      });
  };
  const loginUser = (payload: ILogin) => {
    dispatch(sigInUserAction());
    loginUserHttp(payload)
      .then((res) => {
        dispatch(sigInUserSuccessAction(res));
      })
      .catch((res) => {
        dispatch(sigInUserErrorAction(res?.error.message));
      });
  };
  const logoutUser = () => {
    removeAccessToken();
    dispatch(logoutUserAction({}));
  };
  const checkAuth = (payload: IActiveUserInfo) => {
    dispatch(sigInUserSuccessAction(payload));
  };

  return (
    <AuthStateContext.Provider value={state}>
      <AuthActionsContext.Provider
        value={{
          ...getFlagSetters(dispatch),
          loginUser,
          signUpUser,
          logoutUser,
          checkAuth,

          /* NEW_ACTION_GOES_HERE */
        }}
      >
        {children}
      </AuthActionsContext.Provider>
    </AuthStateContext.Provider>
  );
};

function useAuthState() {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
}

function useAuthActions() {
  const context = useContext(AuthActionsContext);
  if (context === undefined) {
    throw new Error("useAuthActions must be used within a AuthProvider");
  }
  return context;
}

function useAuth() {
  return { ...useAuthActions(), ...useAuthState() };
}

export { AuthProvider, useAuth, useAuthState, useAuthActions };
