import { createContext } from "react";
import { IFlagsState } from "../../interfaces/flagsState";


export type IFlagProgressFlags =
  | 'getWeekTasks'
  | 'updateTask'
 /* NEW_IN_PROGRESS_FLAG_GOES_HERE */;
export type IFlagSucceededFlags =
  | 'getWeekTasks'
  | 'updateTask'
 /* NEW_SUCCEEDED_FLAG_GOES_HERE */;
export type IFlagErrorFlags =
  | 'getWeekTasks'
  | 'updateTask'
   /* NEW_ERROR_FLAG_GOES_HERE */;
export type IFlagActionedFlags =
  | 'getWeekTasks'
  | 'updateTask'
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
 export interface ITimeSlot{
    readonly id?:string;
    readonly date?:string;
    readonly comment?:string;
    readonly manualTime?:number;
 }
 export interface ITaskItem{
    readonly id?:string;
    readonly name?:string;
    readonly projectId?:string;
    readonly projectName?:string;
    readonly taskTimes?:ITimeSlot[];
    readonly totalTime?:number;
 }
 export interface IWeek{
   readonly id?:number;
   readonly from?:string;
   readonly to?:string;

}
 export interface IWeekTasks{
    readonly weekTasks?:ITaskItem[];
    readonly dailyTimes?:string[];
    readonly week?:IWeek;

 }

 export interface IEverHourStateContext
 extends IFlagsState<IFlagProgressFlags, IFlagSucceededFlags, IFlagErrorFlags, IFlagActionedFlags> {
   readonly timeSheets?:IWeekTasks[];
   readonly weekTasks?:IWeekTasks;
   readonly timeSlot?:ITimeSlot;
   readonly errorMessage?:string;

 }

 export interface IEverHourActionsContext
 extends IFlagsState<IFlagProgressFlags, IFlagSucceededFlags, IFlagErrorFlags, IFlagActionedFlags> {
   getWeekTasks?:(payload:IWeekTasksInput)=>void;
   updateTask?:(payload:ITimeSlot)=>void;
   refreshTasks?:(payload:ITimeSlot) => void;

 }

 export const EverHourStateContext = createContext<IEverHourStateContext>({});

export const EverHourActionsContext = createContext<IEverHourActionsContext | undefined>(undefined);