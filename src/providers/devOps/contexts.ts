import { createContext } from "react";
import { IFlagsState } from "../../interfaces/flagsState";


export type IFlagProgressFlags =
  | 'getWorkItems'
  | 'updateWorkItems'
  | 'getProjects'
 /* NEW_IN_PROGRESS_FLAG_GOES_HERE */;
export type IFlagSucceededFlags =
  | 'getWorkItems'
  | 'updateWorkItems'
  | 'getProjects'
 /* NEW_SUCCEEDED_FLAG_GOES_HERE */;
export type IFlagErrorFlags =
  | 'getWorkItems'
  | 'updateWorkItems'
  | 'getProjects'
   /* NEW_ERROR_FLAG_GOES_HERE */;
export type IFlagActionedFlags =
  | 'getWorkItems'
  | 'updateWorkItems'
  | 'getProjects'
 /* NEW_ACTIONED_FLAG_GOES_HERE */;


 export interface IUpdateItem {
    id?: number,
    tracked?: boolean;
}
export interface IWorkItem{
    id?: string;
    title?: string;
    state?: string;
    workItemType?: string;
    teamProject?: string;
    tags?: string;
    tracked?: boolean;
    changedDate?: string;
    assignedTo?: string;
    timeEstimate?:number;

}
export interface IProject{
  id?: string;
  name?: string;
}
export interface IUpdateItems{
  updateWorkItems?:IUpdateItem[]
}
 export interface IDevOpStateContext
  extends IFlagsState<IFlagProgressFlags, IFlagSucceededFlags, IFlagErrorFlags, IFlagActionedFlags> {
        workItems?:Array<IWorkItem>;
        projects?:Array<IProject>;
        updateWorkItems?:IUpdateItems;
        errorMessage?:string;
  }

  export interface IDevOpActionsContext
  extends IFlagsState<IFlagProgressFlags, IFlagSucceededFlags, IFlagErrorFlags, IFlagActionedFlags> {
     getWorkItems?:()=>void;
     getAllProjects?:()=>void;
     updateWorkItems:(items:IUpdateItems)=>void;
     refreshWorkItems?:(items:Array<IWorkItem>,projects:Array<IProject>)=>void;
     refreshUpdateItems?:(items:IUpdateItems)=>void;
  }

  
export const DevOpsStateContext = createContext<IDevOpStateContext>({});

export const DevOpsActionsContext = createContext<IDevOpActionsContext | undefined>(undefined);