import { DevOpsActionEnums } from "./actions";
import { IDevOpStateContext } from "./contexts";
import flagsReducer from "../utils/flagsReducer";

export function devOpsReducer(
  incomingState: IDevOpStateContext,
  action: ReduxActions.Action<IDevOpStateContext>
): IDevOpStateContext {
  //#region Register flags reducer
  const state = flagsReducer(incomingState, action);

  const { type, payload } = action;
  //#endregion

  switch (type) {
    case DevOpsActionEnums.GetWorkItemsRequest:
    case DevOpsActionEnums.GetWorkItemsSuccess:
    case DevOpsActionEnums.GetWorkItemsError:
    case DevOpsActionEnums.UpdateWorkItemsRequest:
    case DevOpsActionEnums.UpdateWorkItemsSuccess:
    case DevOpsActionEnums.UpdateWorkItemsError:
    case DevOpsActionEnums.GetWorkItemsRequest:
    case DevOpsActionEnums.GetProjectsRequest:
    case DevOpsActionEnums.GetProjectsSuccess:
    case DevOpsActionEnums.GetProjectsError:

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
