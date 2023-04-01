import { createContext } from "react";
import { IFlagsState } from "../../interfaces/flagsState";


export type IFlagProgressFlags =
  | 'createConfig'
  | 'updateConfig'
 /* NEW_IN_PROGRESS_FLAG_GOES_HERE */;
export type IFlagSucceededFlags =
  | 'createConfig'
  | 'updateConfig'
 /* NEW_SUCCEEDED_FLAG_GOES_HERE */;
export type IFlagErrorFlags =
  | 'createConfig'
  | 'updateConfig'
   /* NEW_ERROR_FLAG_GOES_HERE */;
export type IFlagActionedFlags =
  | 'createConfig'
  | 'updateConfig'
 /* NEW_ACTIONED_FLAG_GOES_HERE */;

 export interface IWeekTasksInput{
    readonly limit?:string;
 }
 export interface ITaskUpdateInput{
    readonly comment?:string;
    readonly date?:string;
    readonly taskId?:string;
    readonly time?:string;
 }
 export interface IConfigurationUpdateInput{
   readonly userId?:string;
    readonly projects?:Array<string>;
    readonly states?:Array<string>;
    readonly dateFrom?:string;
    readonly dateTo?:string;
 }
 export interface IConfigurationCreateInput{
   readonly companyname?:string;
   readonly userId?:string;
   readonly projects?:Array<string>;
   readonly states?:Array<string>;
   readonly dateFrom?:string;
   readonly dateTo?:string;
}
  

 export interface IConfigStateContext
 extends IFlagsState<IFlagProgressFlags, IFlagSucceededFlags, IFlagErrorFlags, IFlagActionedFlags> {
   readonly configurations?:IConfigurationCreateInput;
   readonly isTracked?:boolean;

   readonly errorMessage?:string;

 }

 export interface IConfigActionsContext
 extends IFlagsState<IFlagProgressFlags, IFlagSucceededFlags, IFlagErrorFlags, IFlagActionedFlags> {
  getAllConfigurations?:(userId:string)=>void;
  updateConfigurations?:(payload:IConfigurationUpdateInput)=>void;
  updateIsTracked?:(isTracked:boolean)=>void; 

 }

 export const ConfigurationStateContext = createContext<IConfigStateContext>({isTracked:false});

export const ConfigurationActionsContext = createContext<IConfigActionsContext | undefined>(undefined);