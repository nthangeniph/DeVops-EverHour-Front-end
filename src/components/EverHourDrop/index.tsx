import React, { FC, useEffect, useState } from 'react';
import { EverHourHeader } from './EverHourHeader';
import { IResolvedProps, RecentTask } from './Recenttask';
import timeSheet from '../timesheet.json';
import style from './style.module.scss'
import { Collapse } from 'antd';
import { getWeekHeader } from './utilis';
import { DropSlot } from '../DropSlot';


const { Panel } = Collapse;

export const EverHourHub: FC<any> = ({ }) => {
  const [resolvedItem,setResolvedItem]=useState<IResolvedProps>();
  const [isEditingMode,setIsEditing]=useState<boolean>(false);


  useEffect(()=>{
   if(resolvedItem?.id){
    setIsEditing(prev=>!prev)
   }
  },[resolvedItem?.details])


  return (
    <div className={style.outCover}>
      <div className={style.Board} >
        <Collapse defaultActiveKey={['1']} style={{ width: '100%' }} bordered={true} >
          {timeSheet.map((weekTask, index) => {
            return (
              <Panel header={getWeekHeader(weekTask.week.from, weekTask.week.to)} key={index + 1} className={style.custom} >
                <EverHourHeader week={weekTask.week} />

                {weekTask.result.map(task => (<RecentTask
                  name={task.name}
                  taskTimes={task.taskTimes}
                  id={task?.id}
                  projectName={task.projectName}
                  totalTime={task.totalTime}
                  week={weekTask.week} 
                  setIsEditing={setIsEditing}/>
                ))}
              </Panel>
            )
          })}
        </Collapse>
      </div>
      {isEditingMode && (
        <div className={style.addEdit}>
          <div className={style.dropIsland}>
         <DropSlot setResolvedItem={setResolvedItem}/>
          </div>
        </div>
        )}
    </div>

  )
}