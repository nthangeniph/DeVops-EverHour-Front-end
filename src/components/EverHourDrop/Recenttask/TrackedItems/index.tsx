import React, { FC } from "react";
import { ITimeSlot } from "../../../../models";
import { BsFillChatSquareQuoteFill } from "react-icons/bs";
import { GetWorkItemType } from "../../../ResolvedIsland/Workitem/utilis";
import style from "./style.module.scss";
import { Tooltip } from "antd";
import { convertSecondsToHours, getWorkTypes } from "../../utilis";

export interface ITrackedItemProps {
  timeSlot?: ITimeSlot;
}
export const TrackedItems: FC<ITrackedItemProps> = ({ timeSlot }) => {
  let workItems = timeSlot?.comment?.split("|").map((tsk) => {
    let length = tsk.length - 9;
    return tsk.substring(length).replaceAll(" ", "");
  });
  let workItemsType =
    workItems
      ?.map((wkItm) => wkItm.substring(1, 3))
      ?.map((y) => getWorkTypes(y)) || [];
  let createComents = timeSlot?.comment
    ?.split("|")
    ?.map((commt, index) => <p>{`${index + 1}.${commt}`}</p>);

  return (
    <>
      {!!workItemsType[0] ? (
        <div className={style.cover}>
          <div className={style.items}>
            {workItemsType.map((itemtype) => {
              return GetWorkItemType(itemtype);
            })}
          </div>
          <div className={style.actions}>
            <Tooltip
              placement="left"
              title={createComents}
              mouseEnterDelay={0.5}
            >
              <BsFillChatSquareQuoteFill
                color="green"
                style={{ margin: "0px 8px" }}
              />
            </Tooltip>
          </div>
          <div className={style.manualTime}>
            <span className={style.timeText}>
              {`${convertSecondsToHours(timeSlot?.manualTime)}:00`}
            </span>
          </div>
        </div>
      ) : (
        <div className={style.everHourManualTime}>
          <span className={style.everHourTime}>
            {!!timeSlot?.manualTime
              ? `${convertSecondsToHours(timeSlot?.manualTime)}:00`
              : ""}
          </span>
        </div>
      )}
    </>
  );
};
