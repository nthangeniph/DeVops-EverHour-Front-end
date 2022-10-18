import React, { useState,FC } from 'react';
import { useDrop } from 'react-dnd';
import { IItemProps } from '../item';
import { EverHourHeader } from './EverHourHeader';
import { RecentTask } from './Recenttask';
import timeSheet from '../timesheet.json';
import style from './style.module.scss'
import { Collapse } from 'antd';
import { getWeekHeader } from './utilis';


const { Panel } = Collapse;

export const EverHourHub:FC<any>=({})=>{

  
   return(
     <div className={style.Board} >
     <Collapse defaultActiveKey={['1']} style={{width:'100%'}} bordered={true} >
    {timeSheet.map((weekTask,index)=>{
        return(
            <Panel header={getWeekHeader(weekTask.week.from,weekTask.week.to)} key={index+1} className={style.custom} >
            <EverHourHeader week={weekTask.week} />
         
            {weekTask.result.map(task=>(<RecentTask
              name={task.name} 
              taskTimes={task.taskTimes} 
              id={task?.id}
              projectName={task.projectName}
              totalTime={task.totalTime}
              week={weekTask.week}/>
         ))}
         </Panel>
        )
    })}
    </Collapse>
    </div>
   )
}