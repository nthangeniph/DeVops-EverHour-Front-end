import { Button, DatePicker, Form, Input, InputNumber, Mentions, Select } from "antd";
import React, { FC, useState } from "react";
import { FaProjectDiagram } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { MdWorkOutline } from "react-icons/md";
import { BiTimer } from "react-icons/bi";
import { SlClose } from "react-icons/sl";
import { BsClipboardPlus } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { useDrop } from "react-dnd";
import { IResolvedProps } from "../EverHourDrop/Recenttask";
import { IItemProps } from "../item";
import timeSheet from "../timesheet.json";
import style from "./style.module.scss";

export interface IDropProps {
  setResolvedItem?: (value: IResolvedProps) => void;
  resolvedItem?: IResolvedProps;
}

const { Option } = Mentions;
export const DropSlot: FC<IDropProps> = ({ resolvedItem, setResolvedItem }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "item",
    drop: (item: IItemProps) => {
      setResolvedItem({ ...resolvedItem, ...item });
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

  return (
    <div className={style.editForm}>
      <div
        className={!isOver ? style.dropContainer : style.isOverColumn}
        ref={drop}
      >
        <Input
          placeholder="Drop new workItems here"
          maxLength={2}
          style={{ width: "100%" }}
          onChange={({ target: { value } }) => {
            if (!isNaN(parseInt(value)))
              setResolvedItem({ ...resolvedItem, time: parseInt(value) });
          }}
        />
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
          <Select>
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
          <DatePicker style={{ width: "100%" }} />
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
            onChange={({ target: { value } }) => {
              if (!isNaN(parseInt(value)))
                setResolvedItem({ ...resolvedItem, time: parseInt(value) });
            }}
          />
        </Form.Item>
      </Form>
      <div className={style.editButtons}>
        <Button  className={style.buttons}><SlClose color='red' /><span style={{margin:'2px',color:'red'}}>Close</span></Button>
        <Button className={style.buttons} > <BsClipboardPlus color='blue' /><span style={{margin:'2px',color:'blue'}}>Next</span></Button>
        <Button className={style.buttons}><FaCheckCircle color='green' /><span style={{margin:'2px', color:'green'}}> Done</span></Button>
      </div>
    </div>
  );
};
