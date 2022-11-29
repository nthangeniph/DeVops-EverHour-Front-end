export interface IWeek{
  id?:number;
  from?:string;
  to?:string;

}
export interface ITimeSlot{
    taskId?:string;
    date?:string;
    manualTime?:number;
    comment?:string;
}
export interface IRecentTaskProps {
    id?: string;
    name?: string;
    projectId?: string;
    projectName?: string;
    week?:IWeek;
    taskTimes?: Array<ITimeSlot>;
    totalTime?:number;
    handleDoubleClick?:(data:ITimeSlot)=>void;
    setIsEditing?:(value:boolean)=>void;
}