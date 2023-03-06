import { Button, DatePicker, Form, Input, Select, Tooltip } from "antd";
import React, { FC, useEffect, useMemo, useState } from "react";
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
import { useDevOps, useDevOpsActions } from "../../providers/devOps";
import { IUpdateItems } from "../../providers/devOps/contexts";
import { useEverHour } from "../../providers/everHour";
import { WorkItemTypes } from "../../enums";
import { useConfigurations } from "../../providers/configurations";
import TextArea from "antd/lib/input/TextArea";

export interface IDropProps {
  setResolvedItem?: (value: IResolvedProps[]) => void;
  setDeVOpsUpdate?: (value: IDevOpInfo[]) => void;
  setIsEditing?: (value: boolean) => void;
  setSlot?: (value: ITimeSlot) => void;
  resolvedItem?: IResolvedProps[];
  devOpsUpdate?: IDevOpInfo[];
  slot?: ITimeSlot;
}

const dateFormat = "YYYY-DD-MM";

const { Option } = Select;

export const DropSlot: FC<IDropProps> = ({
  resolvedItem,
  setResolvedItem,
  setIsEditing,
  slot,
}) => {
  const [initialSlot, setInitialSlot] = useState<ITimeSlot>(slot);
  const { workItems: ResolvedItems, isInProgress, projects } = useDevOps();
  const { updateTask } = useEverHour();
  const { updateWorkItems, refreshWorkItems, getWorkItems } =
    useDevOpsActions();
  const { isTracked } = useConfigurations();
  const [isManual, setIsManual] = useState<boolean>(false);
  const [slotHolder, setSlotHolder] = useState<IDevOpInfo[]>([]);

  const time = useMemo(() => {
    if (initialSlot?.manualTime > 100) {
      return initialSlot?.manualTime / 3600;
    }
    return initialSlot.manualTime;
  }, [initialSlot]);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "item",
    drop: ({ details, type, id, timeEstimate }: IItemProps) => {
      setSlotHolder((prev) => [
        ...prev,
        {
          id,
          type,
          tracked: true,
        },
      ]);
      setResolvedItem([
        ...resolvedItem,
        {
          comment: `${details} (${getWorkTypeSymbol(
            isTracked ? WorkItemTypes.Recurring : type
          )}${id})`,
        },
      ]);

      //@ts-ignore
      setInitialSlot((prev) => ({
        ...prev,
        comment: !!prev?.comment
          ? `${prev.comment}|${details} (${getWorkTypeSymbol(type)}${id})`
          : `${details} (${getWorkTypeSymbol(type)}${id})`,
        manualTime: !!time ? time + (timeEstimate || 0) : timeEstimate || 0,
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
        let hasComment = tsk.substring(length).replaceAll(" ", "");
        if (!!hasComment) return hasComment;
        return null;
      }),
    [initialSlot]
  );

  let workItemsType = workItems
    ?.map((wkItm) => wkItm?.substring(1, 3))
    ?.map((y) => getWorkTypes(y));

  let resolveItemsId = useMemo(
    () => workItems?.map((wkItm) => wkItm.substring(3, 7)),
    [workItems]
  );

  useEffect(() => {
    const filterResolvedItems = ResolvedItems.map(({ id, ...rest }) => {
      let inUse = slotHolder?.find(({ id: idx }) => idx == id);
      if (inUse?.tracked) {
        return {
          ...rest,
          id,
          tracked: true,
        };
      } else {
        return {
          ...rest,
          id,
          tracked: false,
        };
      }
    });
    refreshWorkItems(filterResolvedItems, projects);
  }, [slotHolder]);

  let createComents = useMemo(() => {
    return initialSlot?.comment
      ?.split("|")
      ?.map((commt, index) => <p key={`${commt}${index}`}>{commt}</p>);
  }, [initialSlot]);

  const removeItem = (position: number) => {
    let inProgressTasks = slotHolder.filter(({ tracked }) => tracked);
    setInitialSlot(() => ({
      ...initialSlot,
      comment:
        initialSlot?.comment
          ?.split("|")
          .filter(({}, indx) => indx != position)
          .join("|") || null,
    }));
    setSlotHolder(() =>
      inProgressTasks.map((item, index) =>
        index == position ? { ...item, tracked: false } : item
      )
    );
  };
  const handleDone = () => {
    const newUpdateItem = resolveItemsId.map((id) => ({
      id: parseInt(id),
      tracked: true,
    })) as IUpdateItems;

    updateWorkItems(newUpdateItem);
    updateTask({
      ...initialSlot,
      manualTime:
        initialSlot.manualTime > 100
          ? initialSlot.manualTime
          : initialSlot.manualTime * 3600,
    });
    setInitialSlot({});
    setIsEditing(false);
  };

  const handleClose = () => {
    getWorkItems();
    setInitialSlot({});
    setIsEditing(false);
  };

  return (
    <div className={style.editForm}>
      <div
        className={!isOver ? style.dropContainer : style.isOverColumn}
        ref={drop}
        onDoubleClick={() => setIsManual((prev) => !prev)}
      >
        {workItemsType?.length && !isManual ? (
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
        ) : isManual ? (
          <TextArea
            placeholder="Work item details"
            defaultValue={initialSlot?.comment}
            autoSize={{ minRows: 3, maxRows: 3 }}
          />
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
            {ResolvedItems?.map(({ id }) => (
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
          <Select defaultValue={initialSlot?.taskId}>
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
            value={!!time ? time : 0}
            onChange={({ target: { value } }) => {
              if (!isNaN(parseInt(value))) {
                setInitialSlot({ ...initialSlot, manualTime: parseInt(value) });
              } else {
                setInitialSlot({ ...initialSlot, manualTime: 0 });
              }
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
          disabled
        >
          {" "}
          <BsClipboardPlus color="white" />
          <span style={{ margin: "2px", color: "white" }}>Next</span>
        </Button>
        <Button
          className={style.buttons}
          style={{
            backgroundColor: resolveItemsId?.length ? "#009444" : "gray",
          }}
          disabled={!resolveItemsId?.length || isInProgress?.updateWorkItems}
        >
          <FaCheckCircle color="white" />
          <span
            style={{ margin: "2px", color: "white" }}
            onClick={() => handleDone()}
          >
            {" "}
            Done
          </span>
        </Button>
      </div>
    </div>
  );
};
