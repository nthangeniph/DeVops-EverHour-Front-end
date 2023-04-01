import { ConfigurationActionEnums } from "./actions";
import { IConfigStateContext } from "./contexts";
import flagsReducer from "../utils/flagsReducer";

export function configurtationReducer(
  incomingState: IConfigStateContext,
  action: ReduxActions.Action<IConfigStateContext>
): IConfigStateContext {
  //#region Register flags reducer
  const state = flagsReducer(incomingState, action);

  const { type, payload } = action;
  //#endregion

  switch (type) {
    case ConfigurationActionEnums.GetConfigRequest:
    case ConfigurationActionEnums.GetConfigSuccess:
    case ConfigurationActionEnums.GetConfigError:
    case ConfigurationActionEnums.UpdateConfigRequest:
    case ConfigurationActionEnums.UpdateConfigSuccess:
    case ConfigurationActionEnums.UpdateConfigError:
    case ConfigurationActionEnums.UpdateIsTracked:
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
