import { createAction } from "redux-actions";
import { IDevOpStateContext, IUpdateItem, IWorkItem } from "./contexts";

export enum DevOpsActionEnums {
    //#getworkitems region
    GetWorkItemsRequest = 'GET_WORK_ITEMS_REQUEST',
    GetWorkItemsSuccess = 'GET_WORK_ITEMS_SUCCESS',
    GetWorkItemsError = 'GET_WORK_ITEMS_ERROR',
    //#Update region
    UpdateWorkItemsRequest = 'UPDATE_WORK_ITEMS_REQUEST',
    UpdateWorkItemsSuccess = 'UPDATE_WORK_ITEMS_SUCCESS',
    UpdateWorkItemsError = 'UPDATE_WORK_ITEMS_ERROR',

  
    /* NEW_ACTION_TYPE_GOES_HERE */
  }


  export const getWorkItemsAction = createAction<IDevOpStateContext>(DevOpsActionEnums.GetWorkItemsRequest, () => ({}));
  export const getWorkItemsSuccessAction = createAction<IDevOpStateContext,Array<IWorkItem>>(DevOpsActionEnums.GetWorkItemsRequest, (workItems) => ({workItems}));
  export const getWorkItemsErrorAction = createAction<IDevOpStateContext,string>(DevOpsActionEnums.GetWorkItemsRequest, (errorMessage) => ({errorMessage}));

  export const updateWorkItemsAction = createAction<IDevOpStateContext>(DevOpsActionEnums.UpdateWorkItemsRequest, () => ({}));
  export const updateWorkItemsSuccessAction = createAction<IDevOpStateContext,Array<IUpdateItem>>(DevOpsActionEnums.UpdateWorkItemsSuccess, (updateWorkItems) => ({updateWorkItems}));
  export const updateWorkItemsErrorAction = createAction<IDevOpStateContext,string>(DevOpsActionEnums.UpdateWorkItemsError, (errorMessage) => ({errorMessage}));