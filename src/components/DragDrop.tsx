import { BugOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import styles from '../styles/Home.module.css'
import { IItemProps, Item } from './item';
import { ResolvedIsland } from './ResolvedIsland';
import { WorkItem } from './ResolvedIsland/Workitem';
const ResolvedItems=[
    {
        id:'8355',
        details:'send appeals back to POS'
    },
    {
        id:'8333325',
        details:'When adding a new school, including schooling gender'
    },
    {
        id:'837543',
        details:'Add Export Button On The Inspection Assignment Details View'
    },
    {
        id:'868855',
        details:'API: Clean-up unused Properties and columns especially on SchoolApplication'
    },
    {
        id:'83155',
        details:'Confirmation for Invite to Interview has some words missing'
    },
    {
        id:'833005',
        details:'API: Enforce controls when registering a new Learner and Parent'
    },
    {
        id:'8775',
        details:'DevOps Resoved'
    },
    {
        id:'8255',
        details:'Lungile N Resoved'
    }
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
   
   
    return (
        <div>
           <div className={styles.Pictures} style={{display:'flex'}}>
         
           </div>
           <ResolvedIsland>
            <>
            {
                ResolvedItems.slice(0,6).map(({details,id})=>{
                    return (
                    <>
                    <WorkItem id={id} details={details} key={id}/>
                    </>
                    )
                })
            }</>
         
           </ResolvedIsland>
           <div className={styles.Board} style={{width:'300px',height:'400px',border:'solid 5px red',color:'black'}} ref={drop}>
           {
                board.map(({details,id})=>{
                    return <Item id={id} details={details} key={id}/>
                })
            }
           </div>
        </div>
    )
}

export default DragDrop;