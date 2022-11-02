import React, { FC, useReducer, useContext, useEffect, PropsWithChildren } from 'react';
import { useMutate } from 'restful-react';
import { getFlagSetters } from '../utils/flagsSetters';
import { getWorkItemsAction, getWorkItemsErrorAction, getWorkItemsSuccessAction, updateWorkItemsAction, updateWorkItemsErrorAction, updateWorkItemsSuccessAction } from './actions';
import { DevOpsActionsContext, DevOpsStateContext, IUpdateItem, IUpdateItems, IWorkItem } from './contexts';
import { devOpsReducer } from './reducer';



const DevOpsProvider:FC<PropsWithChildren<any>> = ({ children }) => {

    const [state, dispatch] = useReducer(devOpsReducer, {});
    const {  mutate:fetchWorkItemsHttp} = useMutate({
        path: "/api/devOps/getAllWorkItems",
        verb:'POST'
      });
      const {  mutate:updateWorkItemsHttp} = useMutate({
        path: "/api/devOps/updateWorkItems",
        verb:'PATCH'
      });

    const getWorkItems=()=>{
        dispatch((getWorkItemsAction()))
        fetchWorkItemsHttp({}).then((result)=>{
            dispatch(getWorkItemsSuccessAction(result?.items))
        }).catch(error=>{
            dispatch(getWorkItemsErrorAction(error))
    })
    }
    const updateWorkItems=(payload:IUpdateItems)=>{
        dispatch((updateWorkItemsAction()))
        updateWorkItemsHttp({
            workItems:payload
        }).then(({message})=>{
            if(message){
                dispatch(updateWorkItemsSuccessAction(payload))
            }
    }).catch(error=>{
        dispatch(updateWorkItemsErrorAction(error))
})

    }
    const refreshWorkItems=(payload:Array<IWorkItem>)=>{
        dispatch(getWorkItemsSuccessAction(payload))
    }
    const refreshUpdateItems=(payload:IUpdateItems)=>{
        dispatch(updateWorkItemsSuccessAction(payload))
    }
    return(
        <DevOpsStateContext.Provider value={state}>
        <DevOpsActionsContext.Provider
          value={{
            ...getFlagSetters(dispatch),
            getWorkItems,
            updateWorkItems,
            refreshWorkItems,
            refreshUpdateItems
            /* NEW_ACTION_GOES_HERE */
          }}
        >
          {children}
        </DevOpsActionsContext.Provider>
      </DevOpsStateContext.Provider>
    )
}


function useDevOpsState() {
    const context = useContext(DevOpsStateContext);
    if (!context) {
      throw new Error('useDevOpsState must be used within a DevOpsProvider');
    }
    return context;
  }
  
  function useDevOpsActions() {
    const context = useContext(DevOpsActionsContext);
    if (context === undefined) {
      throw new Error('useDevOpsActions must be used within a DevOpsProvider');
    }
    return context;
  }
  
  function useDevOps() {
    return { ...useDevOpsActions(), ...useDevOpsState() };
  }
  
  export { DevOpsProvider, useDevOpsActions, useDevOpsState, useDevOps };