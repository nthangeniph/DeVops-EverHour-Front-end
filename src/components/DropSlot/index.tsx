import {
  Button,
  DatePicker,
  Form,
  Input,
  Mentions,
  Select,
  Tooltip,
} from "antd";
import React, { FC, useMemo, useState } from "react";
import { FaProjectDiagram } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { MdWorkOutline } from "react-icons/md";
import { BiTimer } from "react-icons/bi";
import { SlClose } from "react-icons/sl";
import { BsClipboardPlus } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useDrop } from "react-dnd";
import { IResolvedProps } from "../EverHourDrop/Recenttask";
import { IItemProps } from "../item";
import timeSheet from "../timesheet.json";
import style from "./style.module.scss";
import { getWorkTypes, getWorkTypeSymbol } from "../EverHourDrop/utilis";
import { ITimeSlot } from "../../models";
import { IDevOpInfo } from "../EverHourDrop";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { GetWorkItemType } from "../ResolvedIsland/Workitem/utilis";
import { useDevOps } from "../../providers/devOps";

export interface IDropProps {
  setResolvedItem?: (value: IResolvedProps[]) => void;
  setDeVOpsUpdate?: (value: IDevOpInfo[]) => void;
  setIsEditing?: (value: boolean) => void;
  setSlot?: (value: ITimeSlot) => void;
  resolvedItem?: IResolvedProps[];
  devOpsUpdate?: IDevOpInfo[];
  slot?: ITimeSlot;
}

const dateFormat = "YYYY-MM-DD";

const { Option } = Select;

export const DropSlot: FC<IDropProps> = ({
  resolvedItem,
  devOpsUpdate = [],
  setResolvedItem,
  setIsEditing,
  setDeVOpsUpdate,
  slot,
}) => {
  const [initialSlot, setInitialSlot] = useState<ITimeSlot>(slot);
  const {workItems:ResolvedItems}=useDevOps();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "item",
    drop: ({ details, type, id }: IItemProps) => {
      setResolvedItem([
        ...resolvedItem,
        { comment: `${details} (${getWorkTypeSymbol(type)}${id})` },
      ]);
      setDeVOpsUpdate([
        ...devOpsUpdate,
        {
          id,
          type,
          tracked: true,
        },
      ]);
      //@ts-ignore
      setInitialSlot((prev) => ({
        ...prev,
        comment: !!prev?.comment
          ? `${prev.comment}|${details} (${getWorkTypeSymbol(type)}${id})`
          : `${details} (${getWorkTypeSymbol(type)}${id})`,
      }));
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

  let workItems = useMemo(
    () =>
      initialSlot?.comment?.split("|")?.map((tsk) => {
        let length = tsk.length - 9;
        return tsk.substring(length).replaceAll(" ", "");
      }),
    [initialSlot]
  );

  let workItemsType = workItems
    ?.map((wkItm) => wkItm.substring(1, 3))
    ?.map((y) => getWorkTypes(y));
  let resolveItemsId = useMemo(
    () => workItems?.map((wkItm) => wkItm.substring(3, 8)),
    [workItems]
  );
  let createComents = initialSlot?.comment
    ?.split("|")
    ?.map((commt) => <p>{commt}</p>);

  const removeItem = (position: number) => {
    setInitialSlot(() => ({
      ...initialSlot,
      comment: initialSlot?.comment
        ?.split("|")
        .filter(({}, indx) => indx != position)
        .join("|"),
    }));
  };
  const handleClose=()=>{
    setInitialSlot({});
    setIsEditing(false)
  }
  console.log("selected items:", resolveItemsId);
  return (
    <div className={style.editForm}>
      <div
        className={!isOver ? style.dropContainer : style.isOverColumn}
        ref={drop}
      >
        {workItemsType?.length ? (
          workItemsType?.map((itemtype, index) => {
            return (
              <div className={style.ItemPreview} key={uuidv4()}>
                <div className={style.itemIcon}>
                  <Tooltip
                    placement="top"
                    title={createComents[index]}
                    mouseEnterDelay={0.5}
                  >
                    {GetWorkItemType(itemtype, 25)}
                  </Tooltip>
                </div>
                <div className={style.removeItem}>
                  <MdDeleteForever
                    type="button"
                    size={20}
                    color="#ef4136"
                    onClick={() => removeItem(index)}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p>Drop new workItems here</p>
        )}
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
          <Select
            style={{ width: "100%" }}
            mode="multiple"
            value={resolveItemsId?.length ? resolveItemsId : undefined}
          >
            {ResolvedItems.map(({id}) => (
              <Option value={id} key={id}>
                {id}
              </Option>
            ))}
          </Select>
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
          <Select defaultValue={initialSlot?.id}>
            {recentTasks.map(({ id, projectName }) => {
              return (
                <Select.Option value={id} key={id}>
                  {projectName}
                </Select.Option>
              );
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
          <DatePicker
            defaultValue={moment(initialSlot?.date, dateFormat)}
            style={{ width: "100%" }}
          />
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
            defaultValue={
              initialSlot?.manualTime ? initialSlot?.manualTime / 3600 : 0
            }
            onChange={({ target: { value } }) => {
              if (!isNaN(parseInt(value)))
                setInitialSlot({ ...initialSlot, manualTime: parseInt(value) });
            }}
          />
        </Form.Item>
      </Form>
      <div className={style.editButtons}>
        <Button
          className={style.buttons}
          style={{ backgroundColor: "#ef4136" }}
          onClick={handleClose}
        >
          <SlClose color="white" />
          <span style={{ margin: "2px", color: "white" }}>Close</span>
        </Button>
        <Button
          className={style.buttons}
          style={{ backgroundColor: "#1c75bc" }}
        >
          {" "}
          <BsClipboardPlus color="white" />
          <span style={{ margin: "2px", color: "white" }}>Next</span>
        </Button>
        <Button
          className={style.buttons}
          style={{ backgroundColor: "#009444" }}
        >
          <FaCheckCircle color="white" />
          <span
            style={{ margin: "2px", color: "white" }}
            onClick={() => setIsEditing(false)}
          >
            {" "}
            Done
          </span>
        </Button>
      </div>
    </div>
  );
};
