import React  from 'react';
import { GiOpenBook } from "react-icons/gi";
import { BsBugFill } from "react-icons/bs";
import { BiTask } from "react-icons/bi";
import { ImTrophy } from "react-icons/im";
import { WorkItemTypes } from '../../../enums';





const GetWorkItemType=(type?:WorkItemTypes)=>{
    switch(type){
        case WorkItemTypes.Bug:
            return <BsBugFill style={{color:'red' ,margin:'auto 5px',maxWidth:'20%'}}/>
        case WorkItemTypes.User_Story:
            return  <GiOpenBook color='#89CFF0'  style={{margin:'auto 5px',maxWidth:'20%',height:'35px'}} />
        case WorkItemTypes.Task:
            return <BiTask  color='gold'  style={{margin:'auto 5px',maxWidth:'20%',height:'35px'}} />
        case WorkItemTypes.Feature:
            return <ImTrophy color='purple'  style={{margin:'auto 5px',maxWidth:'20%',height:'35px'}} />
        default:
            console.log("Work item not found")
    }
}


export {GetWorkItemType}


