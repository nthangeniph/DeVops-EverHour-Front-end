import React, { useEffect, useState } from 'react';
import { WorkItemTypes } from '../enums';
import { EverHourHub } from './EverHourDrop';
import { ResolvedIsland } from './ResolvedIsland';


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
            <div style={{height:'500px',overflow:'scroll'}}>
            <EverHourHub/> 
            </div>
           
            
                    
        </div>
    )
}

export default DragDrop;