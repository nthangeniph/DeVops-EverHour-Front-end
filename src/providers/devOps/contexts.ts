import { createContext } from "react";
import { IFlagsState } from "../../interfaces/flagsState";


export type IFlagProgressFlags =
  | 'getWorkItems'
  | 'updateWorkItems'
 /* NEW_IN_PROGRESS_FLAG_GOES_HERE */;
export type IFlagSucceededFlags =
  | 'getWorkItems'
  | 'updateWorkItems'
 /* NEW_SUCCEEDED_FLAG_GOES_HERE */;
export type IFlagErrorFlags =
  | 'getWorkItems'
  | 'updateWorkItems'
   /* NEW_ERROR_FLAG_GOES_HERE */;
export type IFlagActionedFlags =
  | 'getWorkItems'
  | 'updateWorkItems'
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
    changedDate?: string;
    assignedTo?: string;
    timeEstimate?:number;

}
 export interface IDevOpStateContext
  extends IFlagsState<IFlagProgressFlags, IFlagSucceededFlags, IFlagErrorFlags, IFlagActionedFlags> {
        workItems?:Array<IWorkItem>;
        updateWorkItems?:Array<IUpdateItem>;
        errorMessage?:string;
  }

  export interface IDevOpActionsContext
  extends IFlagsState<IFlagProgressFlags, IFlagSucceededFlags, IFlagErrorFlags, IFlagActionedFlags> {
     getWorkItems?:()=>void;
     updateWorkItems?:(items:Array<IUpdateItem>)=>void;
     refreshWorkItems?:(items:Array<IWorkItem>)=>void;
     refreshUpdateItems?:(items:Array<IUpdateItem>)=>void;
  }

  
export const DevOpsStateContext = createContext<IDevOpStateContext>({});

export const DevOpsActionsContext = createContext<IDevOpActionsContext | undefined>(undefined);