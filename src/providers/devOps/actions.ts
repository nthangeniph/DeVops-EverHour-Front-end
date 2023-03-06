import { createAction } from "redux-actions";
import { IDevOpStateContext, IProject, IUpdateItems, IWorkItem } from "./contexts";

export enum DevOpsActionEnums {
  //#getworkitems region
  GetWorkItemsRequest = 'GET_WORK_ITEMS_REQUEST',
  GetWorkItemsSuccess = 'GET_WORK_ITEMS_SUCCESS',
  GetWorkItemsError = 'GET_WORK_ITEMS_ERROR',

  GetProjectsRequest = 'GET_PROJECTS_REQUEST',
  GetProjectsSuccess = 'GET_PROJECTS_SUCCESS',
  GetProjectsError = 'GET_PROJECTS_ERROR',
  //#Update region
  UpdateWorkItemsRequest = 'UPDATE_WORK_ITEMS_REQUEST',
  UpdateWorkItemsSuccess = 'UPDATE_WORK_ITEMS_SUCCESS',
  UpdateWorkItemsError = 'UPDATE_WORK_ITEMS_ERROR',


  /* NEW_ACTION_TYPE_GOES_HERE */
}


export const getWorkItemsAction = createAction<IDevOpStateContext>(DevOpsActionEnums.GetWorkItemsRequest, () => ({}));
export const getWorkItemsSuccessAction = createAction<IDevOpStateContext, Array<IWorkItem>, Array<IProject>>(DevOpsActionEnums.GetWorkItemsSuccess, (workItems, projects) => ({ workItems, projects }));
export const getWorkItemsErrorAction = createAction<IDevOpStateContext, string>(DevOpsActionEnums.GetWorkItemsError, (errorMessage) => ({ errorMessage }));

export const getProjectsAction = createAction<IDevOpStateContext>(DevOpsActionEnums.GetProjectsRequest, () => ({}));
export const getProjectsSuccessAction = createAction<IDevOpStateContext, Array<IProject>>(DevOpsActionEnums.GetProjectsSuccess, (projects) => ({ projects }));
export const getProjectsErrorAction = createAction<IDevOpStateContext, string>(DevOpsActionEnums.GetProjectsError, (errorMessage) => ({ errorMessage }));

export const updateWorkItemsAction = createAction<IDevOpStateContext>(DevOpsActionEnums.UpdateWorkItemsRequest, () => ({}));
export const updateWorkItemsSuccessAction = createAction<IDevOpStateContext, IUpdateItems>(DevOpsActionEnums.UpdateWorkItemsSuccess, (updateWorkItems) => ({ updateWorkItems }));
export const updateWorkItemsErrorAction = createAction<IDevOpStateContext, string>(DevOpsActionEnums.UpdateWorkItemsError, (errorMessage) => ({ errorMessage }));