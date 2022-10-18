import { Input } from 'antd';
import React ,{FC, useState} from 'react';
import { useDrop } from 'react-dnd';
import { IResolvedProps } from '../EverHourDrop/Recenttask';
import { IItemProps } from '../item';
import style from './style.module.scss'


export interface IDropProps{
    setResolvedItem?:(value:IResolvedProps)=>void;
    resolvedItem?:IResolvedProps;
}
export const DropSlot:FC<any>=({resolvedItem,setResolvedItem})=>{
    const [{isOver},drop]=useDrop(()=>({
        accept:'item',
        drop:(item:IItemProps)=>{
            setResolvedItem(({...resolvedItem,...item}))
        },
        collect:(monitor)=>({
            isOver:!!monitor.isOver()
        }),
        canDrop:(item,monitor)=>{
            return true
        }
    }));

    return (
        
        <div className={!isOver? style.dropContainer:style.isOverColumn}  ref={drop}>
         <Input placeholder='Time Spent' 
                      maxLength={2}  
                      style={{width:'100%'}}
                      onChange={({target:{value}})=>{
                        if(!isNaN(parseInt(value)))setResolvedItem(()=>({...resolvedItem,time:parseInt(value)}))}
                      
                    }/>
        </div>
    )

}