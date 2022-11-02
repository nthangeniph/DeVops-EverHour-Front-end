import React, { FC, useEffect, useState } from 'react';
import { EverHourHeader } from './EverHourHeader';
import { IResolvedProps, RecentTask } from './Recenttask';
// import timeSheet from '../timesheet.json';
import style from './style.module.scss'
import { Collapse } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { getWeekHeader } from './utilis';
import { DropSlot } from '../DropSlot';
import { ITimeSlot } from '../../models';
import { useEverHour } from '../../providers/everHour';


const { Panel } = Collapse;

export interface IDevOpInfo{
  id?: string;
  type?: string;
  tracked?: boolean;
}

export const EverHourHub: FC<any> = ({ }) => {
  const [resolvedItem,setResolvedItem]=useState<IResolvedProps[]>([]);
  const [devOpsUpdate,setDeVOpsUpdate]=useState<IDevOpInfo[]>([])
  const [isEditingMode,setIsEditing]=useState<boolean>(false);
  const [slot, setSlot]=useState<ITimeSlot>();
  const {getWeekTasks,weekTask}=useEverHour();

  useEffect(()=>{
          getWeekTasks({week:'38'})
  },[])



  const handleDoubleClick=(data:ITimeSlot)=>{
    console.log("Drop item ::",data)
    let workItems = data?.comment?.split(',')?.map(tsk => {
      let length = tsk.length - 6;
      return ({id: tsk.substring(length,length-1),
              type: tsk.substring(length-2,length+3),
              tracked:true
              })
    })

      setDeVOpsUpdate(()=>workItems)
      setSlot(()=>data)
      setIsEditing(true);
 }


  return (
    <div className={style.outCover}>
      <div className={style.Board} >
        <Collapse defaultActiveKey={['1']} style={{ width: '100%' }} bordered={true} >
          {/* {timeSheet.map((weekTask, index) => { */}
  
            return (
              <Panel header={getWeekHeader(weekTask?.week?.from, weekTask?.week?.to)||''} key={ 1} className={style.custom} >
                <EverHourHeader week={weekTask?.week} />

                {weekTask?.weekTasks?.map(task => (<RecentTask
                  key={uuidv4()}
                  name={task.name}
                  taskTimes={task.taskTimes}
                  id={task?.id}
                  projectName={task.projectName}
                  totalTime={task.totalTime}
                  week={weekTask.week} 
                  handleDoubleClick={handleDoubleClick}
                  setIsEditing={setIsEditing}/>
                ))}
              </Panel>
            )
         {/* // })} */}
        </Collapse>
      </div>
      {isEditingMode && (
        <div className={style.addEdit}>
          <div className={style.dropIsland}>
         <DropSlot 
              setIsEditing={setIsEditing} 
              setResolvedItem={setResolvedItem} 
              setSlot={setSlot}
              slot={slot}
              resolvedItem={resolvedItem} 
              devOpsUpdate={devOpsUpdate} 
              setDeVOpsUpdate={setDeVOpsUpdate}/>
          </div>
        </div>
        )}
    </div>

  )
}