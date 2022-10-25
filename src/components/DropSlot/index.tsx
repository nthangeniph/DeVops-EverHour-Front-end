import { Button, DatePicker, Form, Input, Mentions, Select, Tooltip } from "antd";
import React, { FC } from "react";
import { FaProjectDiagram } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { MdWorkOutline } from "react-icons/md";
import { BiTimer } from "react-icons/bi";
import { SlClose } from "react-icons/sl";
import { BsClipboardPlus } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { AiOutlineMinusSquare } from "react-icons/ai";
import { useDrop } from "react-dnd";
import { IResolvedProps } from "../EverHourDrop/Recenttask";
import { IItemProps } from "../item";
import timeSheet from "../timesheet.json";
import style from "./style.module.scss";
import { getWorkTypes, getWorkTypeSymbol } from "../EverHourDrop/utilis";
import { ITimeSlot } from "../../models";
import { IDevOpInfo } from "../EverHourDrop";
import moment from "moment";
import { GetWorkItemType } from "../ResolvedIsland/Workitem/utilis";

export interface IDropProps {
  setResolvedItem?: (value: IResolvedProps[]) => void;
  setDeVOpsUpdate?: (value: IDevOpInfo[]) => void;
  setIsEditing?: (value: boolean) => void;
  setSlot?: (value: ITimeSlot) => void;
  resolvedItem?: IResolvedProps[];
  devOpsUpdate?: IDevOpInfo[];
  slot?:ITimeSlot;
}


const dateFormat = 'YYYY-MM-DD';


const { Option } = Mentions;
export const DropSlot: FC<IDropProps> = ({ resolvedItem,devOpsUpdate=[], setResolvedItem,setIsEditing,setDeVOpsUpdate,setSlot,slot }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "item",
    drop: ({ details,type,id}: IItemProps) => {
      setResolvedItem([
         ...resolvedItem,{ comment:`${details} (${getWorkTypeSymbol(type)}${id})` }
        ]);
        setDeVOpsUpdate([
          ...devOpsUpdate,{
                       id,type,tracked:true
        }
        ])
        setSlot({
          ...slot,
          comment:slot?.comment?`${slot.comment},${details} (${getWorkTypeSymbol(type)}${id})`:`${details} (${getWorkTypeSymbol(type)}${id})`
        })
        
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
    canDrop: (item, monitor) => {
      return true;
    },
  }));

  const recentTasks = timeSheet[0].result.map(({ id, projectName }) => {
    return {
      id,
      projectName,
    };
  });


  let pattern = /^\(\w\w\d*\),$/;
 
let workItems = slot?.comment?.split(pattern)?.map(tsk => {
    let length = tsk.length - 9;
    return tsk.substring(length,).replaceAll(' ','')
});
let workItemsType = workItems
    ?.map(wkItm => wkItm.substring(1, 3))
    ?.map(y => getWorkTypes(y));
let createComents = slot?.comment
    ?.split(pattern)
    ?.map((commt) => <p>{commt}</p>);
    console.log("slot data001:",workItems)
console.log("slot data:",createComents)
  return (
    <div className={style.editForm}>
      <div
        className={!isOver ? style.dropContainer : style.isOverColumn}
        ref={drop}
        placeholder="Drop new workItems here"
      >
        {workItemsType?.map((itemtype,index) => {
                    return(<div className={style.ItemPreview}>
                      <div className={style.itemIcon}>
                      <Tooltip placement="top" title={createComents[index]} mouseEnterDelay={0.5}>
                      {GetWorkItemType(itemtype,45)}
                      </Tooltip>
                        </div>
                        <div className={style.removeItem}>
                        <AiOutlineMinusSquare type="button" size={20} color='red'/>
                        </div>
  
                    </div>) 
                })}
      </div>

      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: 200 }}
      >
        <Form.Item
          label={
            <span>
              Work item <MdWorkOutline color="green" />
            </span>
          }
          required
          labelCol={{ span: 7 }}
        >
           <Mentions style={{ width: "100%" }} defaultValue="@345875">
            <Option value="345875">345875</Option>
            <Option value="275342">275342</Option>
            <Option value="417840">417840</Option>
          </Mentions>
        </Form.Item>
        <Form.Item
          label={
            <span>
              Task <FaProjectDiagram color="green" />
            </span>
          }
          
          required
          labelCol={{ span: 7 }}
        >
          <Select defaultValue={slot?.id}>
            {recentTasks.map(({ id, projectName }) => {
              return <Select.Option value={id}>{projectName}</Select.Option>;
            })}
          </Select>

        </Form.Item>
        <Form.Item
          label={
            <span>
              Date <MdDateRange color="green" />
            </span>
          }
          required
          labelCol={{ span: 7 }}
        >
          <DatePicker  defaultValue={moment(slot?.date, dateFormat)} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label={
            <span>
              Time <BiTimer color="green" />
            </span>
          }
          required
          labelCol={{ span: 7 }}
        >
          <Input
            maxLength={2}
            style={{ width: "100%" }}
            defaultValue={slot?.manualTime?slot?.manualTime/3600:0}
            onChange={({ target: { value } }) => {
              if (!isNaN(parseInt(value)))
              setSlot({ ...slot,manualTime: parseInt(value) });
            }}
          />
        </Form.Item>
      </Form>
      <div className={style.editButtons}>
        <Button  className={style.buttons}><SlClose color='red' /><span style={{margin:'2px',color:'red'}}>Close</span></Button>
        <Button className={style.buttons} > <BsClipboardPlus color='blue' /><span style={{margin:'2px',color:'blue'}}>Next</span></Button>
        <Button className={style.buttons}><FaCheckCircle color='green' /><span style={{margin:'2px', color:'green'}} onClick={()=> setIsEditing(false)}> Done</span></Button>
      </div>
    </div>
  );
};
