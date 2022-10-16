import { BugOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { useDrag } from 'react-dnd';
import { WorkItemTypes } from '../../../enums';
import style from './style.module.scss';



interface IWorkItemProps{
    id:string;
    details?:string;
    type?:WorkItemTypes;

}

const WorkItem:FC<IWorkItemProps>=({id,details})=>{
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
    <div className={!isDragging? style.cover:style.moving} 
    id={id}
    ref={drag}
    >
     {!isDragging && (
     <>
     <BugOutlined style={{color:'red' ,margin:'auto 5px'}}/>
     <FontAwesomeIcon icon="fa-solid fa-book-open-cover" />
     <span className={style.itemDetail}>{details}</span> </>
     )
   }
    </div>
   )
}

export {WorkItem};