import React, { FC, useState } from 'react';
import style from './style.module.scss';
import { FaProjectDiagram } from "react-icons/fa";
import 'antd/dist/antd.css';
import { IRecentTaskProps } from '../../../models';
import { convertSecondsToHours, getDaysMonth } from '../utilis';
import { WorkItemTypes } from '../../../enums';
import { TrackedItems } from './TrackedItems';




export interface IResolvedProps{
    id?:string;
    details?:string;
    type?:WorkItemTypes;
    time?:number;
}


export const RecentTask: FC<IRecentTaskProps> = ({ name, projectName, taskTimes, id,totalTime, week ,setIsEditing}) => {

    const [resolvedItem,setResolvedItem]=useState<IResolvedProps>();



    const weekdays = getDaysMonth(week.from, week.to);


     const handleDoubleClick=(date:string)=>{
        let item:IResolvedProps={
            id,
            ...taskTimes.filter(({ date }) => date==date)
        }
          setResolvedItem(()=>item);
          setIsEditing(true);
     }

    return (
        <div className={style.everHourContainer}>
            <div className={style.RecentTask}>
                <FaProjectDiagram color='green' /><span className={style.Name}>{name}</span>
                <br />
                <span className={style.projectName}
                >{projectName}  </span>

            </div>
            <div className={style.DayTask} onDoubleClick={()=>handleDoubleClick(weekdays[0])}>
                <span>
                    {/* {convertSecondsToHours(taskTimes?.filter(({ date }) => date == weekdays[0])[0]?.manualTime) || ''} */} 
                   
                </span>
                <TrackedItems/>
            </div>
            <div className={style.DayTask} onDoubleClick={()=>handleDoubleClick(weekdays[1])}>
                <span>
                    {convertSecondsToHours(taskTimes?.filter(({ date }) => date == weekdays[1])[0]?.manualTime) || ''}  
                </span>
            </div>
            <div className={style.DayTask} onDoubleClick={()=>handleDoubleClick(weekdays[2])}>
                <span>
                  {resolvedItem?.details? `@${resolvedItem.id} (${resolvedItem.time} hrs)`:convertSecondsToHours(taskTimes?.filter(({ date }) => date == weekdays[2])[0]?.manualTime) || ''}
                </span>
            </div>
         
            <div className={style.DayTask} onDoubleClick={()=>handleDoubleClick(weekdays[3])}>
                <span>
                    {convertSecondsToHours(taskTimes?.filter(({ date }) => date == weekdays[3])[0]?.manualTime) || ''}
                </span>
            </div>
            <div className={style.DayTask} onDoubleClick={()=>handleDoubleClick(weekdays[4])}>
                <div className={style.dateDetails}>
                    <span>
                        {convertSecondsToHours(taskTimes?.filter(({ date }) => date == weekdays[4])[0]?.manualTime) || ''}
                    </span>
                </div>

            </div>
            <div className={style.DayTask} onDoubleClick={()=>handleDoubleClick(weekdays[5])}>
                <span>
                    {convertSecondsToHours(taskTimes?.filter(({ date }) => date == weekdays[5])[0]?.manualTime) || ''}
                </span>
            </div>
            <div className={style.DayTask} onDoubleClick={()=>handleDoubleClick(weekdays[6])}>
                <span>
                    {convertSecondsToHours(taskTimes?.filter(({ date }) => date == weekdays[6])[0]?.manualTime) || ''}
                </span>
            </div>
            <div className={style.TotalTime}>{convertSecondsToHours(totalTime)}</div>



        </div>
    );
}


