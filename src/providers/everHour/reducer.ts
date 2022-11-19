import { EverHourActionEnums } from "./actions";
import { IEverHourStateContext } from "./contexts";
import flagsReducer from "../utils/flagsReducer";
import { getDaysMonth } from "../../components/EverHourDrop/utilis";

export function everHourReducer(
  incomingState: IEverHourStateContext,
  action: ReduxActions.Action<IEverHourStateContext>
): IEverHourStateContext {
  //#region Register flags reducer
  const state = flagsReducer(incomingState, action);

  const { type, payload } = action;
  //#endregion

  switch (type) {
    case EverHourActionEnums.GetWeekTasksRequest:
    case EverHourActionEnums.GetWeekTasksSuccess:
    case EverHourActionEnums.GetWeekTasksError:
    case EverHourActionEnums.UpdateTaskRequest:
    case EverHourActionEnums.UpdateTaskSuccess:
    case EverHourActionEnums.UpdateTasksError:
    case EverHourActionEnums.UpdateSlot:
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
