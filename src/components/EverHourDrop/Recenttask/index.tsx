import React, { FC, useState } from 'react';
import style from './style.module.scss';
import { FaProjectDiagram } from "react-icons/fa";
import 'antd/dist/antd.css';
import { IRecentTaskProps, ITimeSlot } from '../../../models';
import { convertSecondsToHours, getDaysMonth } from '../utilis';
import { WorkItemTypes } from '../../../enums';
import { TrackedItems } from './TrackedItems';




export interface IResolvedProps{
    id?:string;
    comment?:string;
    type?:WorkItemTypes;
    tracked?:boolean;
   
}


export const RecentTask: FC<IRecentTaskProps> = ({ name, projectName, taskTimes, id,totalTime, week,handleDoubleClick ,setIsEditing}) => {

    const [resolvedItem,setResolvedItem]=useState<IResolvedProps>();


    const weekdays = getDaysMonth(week.from, week.to);

    
     console.log("dta::",taskTimes)
    return (
        <div className={style.everHourContainer}>
            <div className={style.RecentTask}>
                <FaProjectDiagram color='green' /><span className={style.Name}>{name}</span>
                <br />
                <span className={style.projectName}
                >{projectName}  </span>

            </div>
            <div className={style.DayTask} onDoubleClick={()=>handleDoubleClick({
                ...taskTimes?.filter(({ date }) => date == weekdays[0])[0],
                id,
                date:weekdays[0]})}>
                <span>
                    {/* {convertSecondsToHours(taskTimes?.filter(({ date }) => date == weekdays[0])[0]?.manualTime) || ''} */} 
                   
                </span>
                <TrackedItems/>
            </div>
            <div className={style.DayTask} onDoubleClick={()=>handleDoubleClick({
                ...taskTimes?.filter(({ date }) => date == weekdays[1])[0],
                id,
                date:weekdays[1]})}
            >
                <span>
                    {convertSecondsToHours(taskTimes?.filter(({ date }) => date == weekdays[1])[0]?.manualTime) || ''}  
                </span>
            </div>
            <div className={style.DayTask} onDoubleClick={()=>handleDoubleClick({
                ...taskTimes?.filter(({ date }) => date == weekdays[2])[0],
                id,
                date:weekdays[2]})}
            >
                <span>
                  {/* {resolvedItem?.details? `@${resolvedItem.id} (${resolvedItem.time} hrs)`:convertSecondsToHours(taskTimes?.filter(({ date }) => date == weekdays[2])[0]?.manualTime) || ''} */}
                </span>
            </div>
         
            <div className={style.DayTask} onDoubleClick={()=>handleDoubleClick({
                ...taskTimes?.filter(({ date }) => date == weekdays[3])[0],
                id,
                date:weekdays[3]})}
           >
                <span>
                    {convertSecondsToHours(taskTimes?.filter(({ date }) => date == weekdays[3])[0]?.manualTime) || ''}
                </span>
            </div>
            <div className={style.DayTask} onDoubleClick={()=>handleDoubleClick({
                ...taskTimes?.filter(({ date }) => date == weekdays[4])[0],
                id,
                date:weekdays[4]})}
           >
                <div className={style.dateDetails}>
                    <span>
                        {convertSecondsToHours(taskTimes?.filter(({ date }) => date == weekdays[4])[0]?.manualTime) || ''}
                    </span>
                </div>

            </div>
            <div className={style.DayTask} onDoubleClick=
            {()=>handleDoubleClick({
                ...taskTimes?.filter(({ date }) => date == weekdays[5])[0],
                id,
                date:weekdays[5]})}>
                <span>
                    {convertSecondsToHours(taskTimes?.filter(({ date }) => date == weekdays[5])[0]?.manualTime) || ''}
                </span>
            </div>
            <div className={style.DayTask} onDoubleClick={()=>handleDoubleClick({
                ...taskTimes?.filter(({ date }) => date == weekdays[6])[0],
                id,
                date:weekdays[6]})}
            >
                <span>
                    {convertSecondsToHours(taskTimes?.filter(({ date }) => date == weekdays[6])[0]?.manualTime) || ''}
                </span>
            </div>
            <div className={style.TotalTime}>{convertSecondsToHours(totalTime)}</div>



        </div>
    );
}


