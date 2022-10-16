import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { WorkItemTypes } from '../enums';
import styles from '../styles/Home.module.css'
import { EverHourDrop } from './EverHourDrop';
import { IItemProps } from './item';
import { ResolvedIsland } from './ResolvedIsland';
import timeSheet from './timesheet.json';

const ResolvedItems=[
    {
        id:'8355',
        details:'send appeals back to POS',
        type:WorkItemTypes.Bug
    },
    {
        id:'8333325',
        details:'When adding a new school, including schooling gender',
        type:WorkItemTypes.User_Story
    },
    {
        id:'837543',
        details:'Add Export Button On The Inspection Assignment Details View',
        type:WorkItemTypes.User_Story
    },
    {
        id:'868855',
        details:'API: Clean-up unused Properties and columns especially on SchoolApplication',
        type:WorkItemTypes.Feature
    },
    {
        id:'83155',
        details:'Confirmation for Invite to Interview has some words missing',
        type:WorkItemTypes.Task

    },
    {
        id:'833005',
        details:'API: Enforce controls when registering a new Learner and Parent',
        type:WorkItemTypes.Bug
    },
    {
        id:'8775',
        details:'DevOps Resoved',
        type:WorkItemTypes.Task
    },
    {
        id:'8255',
        details:'Lungile N Resoved',
        type:WorkItemTypes.Feature
    },
    {
        id:'868855',
        details:'API: Clean-up unused Properties and columns especially on SchoolApplication',
        type:WorkItemTypes.User_Story
    },
    {
        id:'83155',
        details:'Confirmation for Invite to Interview has some words missing',
        type:WorkItemTypes.Task

    },
    {
        id:'833005',
        details:'API: Enforce controls when registering a new Learner and Parent',
        type:WorkItemTypes.Bug
    },
]

const DragDrop=()=>{
    const [board,setBoard]=useState<IItemProps[]>([]);
    const [{isOver},drop]=useDrop(()=>({
        accept:'item',
        drop:(item:IItemProps)=>{
            console.log('details ::',item.id)
            setBoard(prev=>[...prev,item])
        },
        collect:(monitor)=>({
            isOver:!!monitor.isOver()
        }),
        canDrop:(item,monitor)=>{
            return !!item.id
        }
    }));


console.log("timeSheets ::",timeSheet)
   
   
    return (
        <div>
           <ResolvedIsland ResolvedItems={ResolvedItems}/>
    
           <div className={styles.Board} style={{width:'100%',height:'600px',color:'black'}} ref={drop}>
    
            <EverHourDrop dailyTimes={timeSheet?.dailyTimes}/>
           </div>
        </div>
    )
}

export default DragDrop;