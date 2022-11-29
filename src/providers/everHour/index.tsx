import React, { FC, useReducer, useContext, PropsWithChildren } from 'react';
import { useMutate } from 'restful-react';
import { getDaysMonth } from '../../components/EverHourDrop/utilis';
import { getFlagSetters } from '../utils/flagsSetters';
import { getWeekTasksAction, getWeekTasksErrorAction, getWeekTasksSuccessAction, updateTaskAction, updateTaskErrorAction } from './actions';
import {  EverHourActionsContext, EverHourStateContext, ITimeSlot, IWeekTasksInput } from './contexts';
import { everHourReducer } from './reducer';



const EverHourProvider:FC<PropsWithChildren<any>> = ({ children }) => {

    const [state, dispatch] = useReducer(everHourReducer, {});
    const {  mutate:fetchWeekTaskHttp} = useMutate({
        path: "/api/everHour/getWeekTasks",
        verb:'POST'
      });
      const {  mutate:updateTaskHttp} = useMutate({
        path: "/api/everHour/updateTask",
        verb:'PUT'
      });
const getWeekTasks=(payload:IWeekTasksInput)=>{
    dispatch(getWeekTasksAction());
    fetchWeekTaskHttp(payload)
    .then(({timeSheets})=>{
      console.log("has something:",timeSheets)
      //@ts-ignore
           dispatch(getWeekTasksSuccessAction(timeSheets))
    })
    .catch((error)=>{
        dispatch(getWeekTasksErrorAction(error))
    })

}
const updateTask=(payload:ITimeSlot)=>{
  dispatch(updateTaskAction());
   
  updateTaskHttp(payload)
  .then((res)=>{
  
    const {timeSheets}=state;
    const updatedTimeSheets=(timeSheets?.map(time=>{
      

      const {week,weekTasks,dailyTimes}=time
      const weekdays = getDaysMonth(week.from, week.to);
    
      if(weekdays.includes(payload?.date)){
         const updatedWeekTasks=weekTasks.map((task)=>{
          if(task.id==payload?.id){
            
            const index=task.taskTimes.findIndex((x)=>x.date==payload?.date);
             const currentTime=task.taskTimes[index].manualTime;
            if(index>=0){
              
              task.taskTimes[index]={...res,id:task.id,  manualTime:res.time};
            }else{
              task.taskTimes.push({...res,id:task.id,manualTime:res.time})
            }
               return {...task,totalTime:task?.totalTime-currentTime+res.time};
          }
          return task;
         })

         return {
          week,
          dailyTimes,
          weekTasks:updatedWeekTasks
         }
      }
      return time;
    }))

         dispatch(getWeekTasksSuccessAction(updatedTimeSheets))
  })
  .catch((error)=>{
      dispatch(updateTaskErrorAction(error))
  })

} 
    return(
        <EverHourStateContext.Provider value={state}>
        <EverHourActionsContext.Provider
          value={{
            ...getFlagSetters(dispatch),
            getWeekTasks,
            updateTask
    
            /* NEW_ACTION_GOES_HERE */
          }}
        >
          {children}
        </EverHourActionsContext.Provider>
      </EverHourStateContext.Provider>
    )
}


function useEverHourState() {
    const context = useContext(EverHourStateContext);
    if (!context) {
      throw new Error('useEverHourState must be used within a EverHourProvider');
    }
    return context;
  }
  
  function useEverHourActions() {
    const context = useContext(EverHourActionsContext);
    if (context === undefined) {
      throw new Error('useEverHourActions must be used within a EverHourProvider');
    }
    return context;
  }
  
  function useEverHour() {
    return { ...useEverHourActions(), ...useEverHourState() };
  }
  
  export { EverHourProvider, useEverHourActions, useEverHourState, useEverHour };