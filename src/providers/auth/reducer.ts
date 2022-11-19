import { AuthActionEnums } from "./actions";
import { IAuthActionsContext, IAuthStateContext } from "./contexts";
import flagsReducer from "../utils/flagsReducer";

export function authReducer(
  incomingState: IAuthStateContext,
  action: ReduxActions.Action<IAuthActionsContext>
): IAuthStateContext {
  //#region Register flags reducer
  const state = flagsReducer(incomingState, action);

  const { type, payload } = action;
  //#endregion

  switch (type) {
    case AuthActionEnums.SignUpRequest:
    case AuthActionEnums.SignUpSuccess:
    case AuthActionEnums.SignUpError:
    case AuthActionEnums.LoginUserRequest:
    case AuthActionEnums.LoginUserSuccess:
    case AuthActionEnums.LoginUserError:
    case AuthActionEnums.LogoutUser:
    case AuthActionEnums.SetToken:
      /* NEW_ACTION_ENUM_GOES_HERE */
      //#endregion
      return {
        ...state,
        ...payload,
      };

    default: {
      return state;
    }
  }
}
