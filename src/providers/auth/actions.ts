export enum AuthActionEnums {
    CheckAuthAction = 'CHECK_AUTH_ACTION',
    SetToken = 'SET_TOKEN',
    //SetHeaders = 'SET_HEADERS',
    LoginUserRequest = 'LOGIN_USER_REQUEST',
    LoginUserSuccess = 'LOGIN_USER_SUCCESS',
    LoginUserError = 'LOGIN_USER_ERROR',
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