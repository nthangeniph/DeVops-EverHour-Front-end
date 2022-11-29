import { createAction } from "redux-actions";
import { IEverHourStateContext,  ITimeSlot,  IWeekTasks } from "./contexts";

export enum EverHourActionEnums {
    //#getworkitems region
    GetWeekTasksRequest = 'GET_WEEK_TASKS_REQUEST',
    GetWeekTasksSuccess = 'GET_WEEK_TASKS_SUCCESS',
    GetWeekTasksError = 'GET_WEEK_TASKS_ERROR',
    //#Update region
    UpdateTaskRequest = 'UPDATE_TASK_REQUEST',
    UpdateTaskSuccess = 'UPDATE_TASK_SUCCESS',
    UpdateTasksError = 'UPDATE_TASK_ERROR',
    UpdateSlot='UPDATE_SLOT'
  
    /* NEW_ACTION_TYPE_GOES_HERE */
  }


  export const getWeekTasksAction = createAction<IEverHourStateContext>(EverHourActionEnums.GetWeekTasksRequest, () => ({}));
  export const getWeekTasksSuccessAction = createAction<IEverHourStateContext,IWeekTasks[]>(EverHourActionEnums.GetWeekTasksSuccess, (timeSheets) => ({timeSheets}));
  export const getWeekTasksErrorAction = createAction<IEverHourStateContext,string>(EverHourActionEnums.GetWeekTasksError, (errorMessage) => ({errorMessage}));

  export const updateTaskAction = createAction<IEverHourStateContext>(EverHourActionEnums.UpdateTaskRequest, () => ({}));
  export const updateTaskSuccessAction = createAction<IEverHourStateContext,ITimeSlot>(EverHourActionEnums.UpdateTaskSuccess, (timeSlot) => ({timeSlot}));
  export const updateTaskErrorAction = createAction<IEverHourStateContext,string>(EverHourActionEnums.UpdateTasksError, (errorMessage) => ({errorMessage}));