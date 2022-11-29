import { BugOutlined } from '@ant-design/icons';
import React from 'react';
import { useDrag } from 'react-dnd';
import { WorkItemTypes } from '../enums';


export interface IItemProps{
    id:string;
    details?:string;
    type:WorkItemTypes;
    timeEstimate:number
}
const Item=({id,details}:IItemProps)=>{
    const [{isDragging},drag]=useDrag(()=>({
        type:'item',
        item:{id,details},
        collect:(monitor)=>({
            isDragging:!!monitor.isDragging(),
        }),
        options:{
            dropEffect:'move'
        },
        end:(draggedItem, monitor)=>{
            if(monitor.didDrop()){
                console.log("got drop",draggedItem)
            }else{
                console.log("didn't get drop",draggedItem)
            }
        }
            
        })
    );
    return(
        <div style={{border:isDragging?'5px solid green':'solid black 3px',width:'250px',height:'70px', margin:'15px',display:'flex',backgroundColor:'white'}} 
        id={id}
        ref={drag}
        >
            <BugOutlined style={{color:'red' ,margin:'auto 5px'}}/>
             <span style={{height:'48px', overflowY:'scroll',margin:'auto 3px'}}>{details}</span>      
        </div>
    )
}
export {Item};