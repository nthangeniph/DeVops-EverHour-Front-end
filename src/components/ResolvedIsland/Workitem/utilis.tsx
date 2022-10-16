import { BugOutlined } from '@ant-design/icons';
import React  from 'react';
import { GiOpenBook } from "react-icons/gi";
import { BiTask } from "react-icons/bi";
import { ImTrophy } from "react-icons/im";
import { WorkItemTypes } from '../../../enums';





const GetWorkItemType=(type?:WorkItemTypes)=>{
    console.log("work itemType ::",type)
    switch(type){
        case WorkItemTypes.Bug:
            return <BugOutlined style={{color:'red' ,margin:'auto 5px'}}/>
        case WorkItemTypes.User_Story:
            return  <GiOpenBook color='#89CFF0'  style={{margin:'auto 5px',width:'35px',height:'35px'}} />
        case WorkItemTypes.Task:
            return <BiTask  color='gold'  style={{margin:'auto 5px',width:'35px',height:'35px'}} />
        case WorkItemTypes.Feature:
            return <ImTrophy color='purple'  style={{margin:'auto 5px',width:'35px',height:'35px'}} />
        default:
            console.log("Work item not found")
    }
}


export {GetWorkItemType}


