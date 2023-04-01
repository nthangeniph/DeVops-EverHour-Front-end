import { createAction } from "redux-actions";
import { IAccountOut, IActiveUserInfo } from "../../models/account.model";
import { IAuthStateContext } from "./contexts";

export enum AuthActionEnums {
    CheckAuthAction = 'CHECK_AUTH_ACTION',
    SetToken = 'SET_TOKEN',
    //SetHeaders = 'SET_HEADERS',
    LoginUserRequest = 'LOGIN_USER_REQUEST',
    LoginUserSuccess = 'LOGIN_USER_SUCCESS',
    LoginUserError = 'LOGIN_USER_ERROR',
    SignUpRequest = 'SIGN_UP_REQUEST',
    SignUpSuccess = 'SIGN_UP_SUCCESS',
    SignUpError = 'SIGN_UP_ERROR',
    LogoutUser = 'LOGOUT_USER',
    FetchUserDataRequest = 'FETCH_USER_DATA_REQUEST',
    FetchUserDataSuccess = 'FETCH_USER_DATA_SUCCESS',
    FetchUserDataError = 'FETCH_USER_DATA_ERROR',
  
    //#region Rest Password
    VerifyOtpSuccess = 'VERIFY_OTP_SUCCESS',
    //#endregion
  
    ResetPasswordSuccess = 'RESET_PASSWORD_SUCCESS',
    /* NEW_ACTION_TYPE_GOES_HERE */
  }

  export const sigupUserAction = createAction<IAuthStateContext>(AuthActionEnums.SignUpRequest, () => ({}));
  export const sigupUserSuccessAction = createAction<IAuthStateContext,IAccountOut>(AuthActionEnums.SignUpSuccess, (accountDetails) => ({accountDetails}));
  export const sigupUserErrorAction = createAction<IAuthStateContext,string>(AuthActionEnums.SignUpError, (errorMessage) => ({errorMessage}));


  export const sigInUserAction = createAction<IAuthStateContext>(AuthActionEnums.LoginUserRequest, () => ({}));
  export const sigInUserSuccessAction = createAction<IAuthStateContext,IActiveUserInfo>(AuthActionEnums.LoginUserSuccess, (activeUserInfo) => ({activeUserInfo}));
  export const sigInUserErrorAction = createAction<IAuthStateContext,string>(AuthActionEnums.LoginUserError, (errorMessage) => ({errorMessage}));
  export const logoutUserAction = createAction<IAuthStateContext,IActiveUserInfo>(AuthActionEnums.LogoutUser, (activeUserInfo) => ({activeUserInfo}));



  
