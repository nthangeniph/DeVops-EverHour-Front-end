import React, { useEffect, useState } from 'react';
import { WorkItemTypes } from '../enums';
import { EverHourHub } from './EverHourDrop';
import { ResolvedIsland } from './ResolvedIsland';


const ResolvedItems=[
    {
        id:'83550',
        details:'send appeals back to POS',
        type:WorkItemTypes.Bug
    },
    {
        id:'83315',
        details:'When adding a new school, including schooling gender',
        type:WorkItemTypes.User_Story
    },
    {
        id:'87543',
        details:'Add Export Button On The Inspection Assignment Details View',
        type:WorkItemTypes.User_Story
    },
    {
        id:'84855',
        details:'API: Clean-up unused Properties and columns especially on SchoolApplication',
        type:WorkItemTypes.Feature
    },
    {
        id:'83165',
        details:'Confirmation for Invite to Interview has some words missing',
        type:WorkItemTypes.Task

    },
    {
        id:'83105',
        details:'API: Enforce controls when registering a new Learner and Parent',
        type:WorkItemTypes.Bug
    },
    {
        id:'87705',
        details:'DevOps Resoved',
        type:WorkItemTypes.Task
    },
    {
        id:'82565',
        details:'Lungile N Resoved',
        type:WorkItemTypes.Feature
    },
    {
        id:'46855',
        details:'API: Clean-up unused Properties and columns especially on SchoolApplication',
        type:WorkItemTypes.User_Story
    },
    {
        id:'81155',
        details:'Confirmation for Invite to Interview has some words missing',
        type:WorkItemTypes.Task

    },
    {
        id:'83105',
        details:'API: Enforce controls when registering a new Learner and Parent',
        type:WorkItemTypes.Bug
    },
]

const DragDrop=()=>{
  
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }

    return (
        <div>
           <ResolvedIsland ResolvedItems={ResolvedItems} />
            <div style={{height:'500px'}}>
            <EverHourHub/> 
            </div>
           
            
                    
        </div>
    )
}

export default DragDrop;