import React, { FC, useCallback, useEffect, useState } from 'react';
import style from './style.module.scss';
import { FaProjectDiagram } from "react-icons/fa";
import 'antd/dist/antd.css';
import { IRecentTaskProps, ITimeSlot } from '../../../models';
import { convertSecondsToHours, getDaysMonth } from '../utilis';
import { DropSlot } from '../../DropSlot';
import { IItemProps } from '../../item';
import { WorkItemTypes } from '../../../enums';
import { GetWorkItemType } from '../../ResolvedIsland/Workitem/utilis';
import { TrackedItems } from './TrackedItems';




export interface IResolvedProps{
    id?:string;
    details?:string;
    type?:WorkItemTypes;
    time?:number;
}


export const RecentTask: FC<IRecentTaskProps> = ({ name, projectName, taskTimes, id,totalTime, week }) => {

    const [activeColumn,setActiveColumn]=useState<string>();
    const [resolvedItem,setResolvedItem]=useState<IResolvedProps>();



    useEffect(()=>{
       if(resolvedItem?.details) setActiveColumn('');
    },[resolvedItem])

    const weekdays = getDaysMonth(week.from, week.to);

    const getTaskId=()=>{
        return weekdays.map(dt=>`${id}${dt.replaceAll("-","")}`)
        
    }
    const isActiveColumn=(id:string)=>{
        return id==activeColumn;
    }


    console.log("active id ::",resolvedItem)
    return (
        <div className={style.everHourContainer}>
            <div className={style.RecentTask}>
                <FaProjectDiagram color='green' /><span className={style.Name}>{name}</span>
                <br />
                <span className={style.projectName}
                >{projectName}  </span>

            </div>
            <div className={style.DayTask} onDoubleClick={()=>setActiveColumn(()=>(getTaskId()[0]))}>
                <span>
                    {/* {convertSecondsToHours(taskTimes?.filter(({ date }) => date == weekdays[0])[0]?.manualTime) || ''} */} 
                   
                </span>
                <TrackedItems/>
            </div>
            <div className={style.DayTask} onDoubleClick={()=>setActiveColumn(()=>(getTaskId()[1]))}>
                <span>
                    {convertSecondsToHours(taskTimes?.filter(({ date }) => date == weekdays[1])[0]?.manualTime) || ''}  
                </span>
            </div>
           {!isActiveColumn(getTaskId()[2]) ? <div className={style.DayTask} onDoubleClick={()=>setActiveColumn(()=>(getTaskId()[2]))}>
                <span>
                  {resolvedItem?.details? `@${resolvedItem.id} (${resolvedItem.time} hrs)`:convertSecondsToHours(taskTimes?.filter(({ date }) => date == weekdays[2])[0]?.manualTime) || ''}
                </span>
            </div>:
            <DropSlot setResolvedItem={setResolvedItem} resolvedItem={resolvedItem} />
            }
            <div className={style.DayTask} onDoubleClick={()=>setActiveColumn(()=>(getTaskId()[3]))}>
                <span>
                    {convertSecondsToHours(taskTimes?.filter(({ date }) => date == weekdays[3])[0]?.manualTime) || ''}
                </span>
            </div>
            <div className={style.DayTask} onDoubleClick={()=>setActiveColumn(()=>(getTaskId()[4]))}>
                <div className={style.dateDetails}>
                    <span>
                        {convertSecondsToHours(taskTimes?.filter(({ date }) => date == weekdays[4])[0]?.manualTime) || ''}
                    </span>
                </div>

            </div>
            <div className={style.DayTask} onDoubleClick={()=>setActiveColumn(()=>(getTaskId()[5]))}>
                <span>
                    {convertSecondsToHours(taskTimes?.filter(({ date }) => date == weekdays[5])[0]?.manualTime) || ''}
                </span>
            </div>
            <div className={style.DayTask} onDoubleClick={()=>setActiveColumn(()=>(getTaskId()[6]))}>
                <span>
                    {convertSecondsToHours(taskTimes?.filter(({ date }) => date == weekdays[6])[0]?.manualTime) || ''}
                </span>
            </div>
            <div className={style.TotalTime}>{convertSecondsToHours(totalTime)}</div>



        </div>
    );
}


