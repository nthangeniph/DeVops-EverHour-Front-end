import { createAction } from "redux-actions";
import { IConfigStateContext, IConfigurationCreateInput } from "./contexts";

export enum ConfigurationActionEnums {
    //#getworkitems region
    GetConfigRequest = 'GET_CONFIG_REQUEST',
    GetConfigSuccess = 'GET_CONFIG_SUCCESS',
    GetConfigError = 'GET_CONFIG_ERROR',
    //#Update region
    UpdateConfigRequest = 'UPDATE_CONFIG_REQUEST',
    UpdateConfigSuccess = 'UPDATE_CONFIG_SUCCESS',
    UpdateConfigError = 'UPDATE_CONFIG_ERROR',
    
    UpdateIsTracked = 'UPDATE_IS_TRACKED ',
  
  
    /* NEW_ACTION_TYPE_GOES_HERE */
  }


  export const getConfigurationAction = createAction<IConfigStateContext>(ConfigurationActionEnums.GetConfigRequest, () => ({}));
  export const getConfigurationSuccessAction = createAction<IConfigStateContext,IConfigurationCreateInput>(ConfigurationActionEnums.GetConfigSuccess, (configurations) => ({configurations}));
  export const getConfigurationErrorAction = createAction<IConfigStateContext,string>(ConfigurationActionEnums.GetConfigError, (errorMessage) => ({errorMessage}));

  export const updateConfigAction = createAction<IConfigStateContext>(ConfigurationActionEnums.UpdateConfigRequest, () => ({}));
  export const updateConfigSuccessAction = createAction<IConfigStateContext,IConfigurationCreateInput>(ConfigurationActionEnums.UpdateConfigSuccess, (configurations) => ({configurations}));
  export const updateConfigErrorAction = createAction<IConfigStateContext,string>(ConfigurationActionEnums.UpdateConfigError, (errorMessage) => ({errorMessage}));

  export const updateIsTrackedAction = createAction<IConfigStateContext,boolean>(ConfigurationActionEnums.UpdateIsTracked, (isTracked) => ({isTracked}));