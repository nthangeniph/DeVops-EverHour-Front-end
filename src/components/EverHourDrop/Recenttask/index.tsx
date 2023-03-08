import React, { FC } from "react";
import style from "./style.module.scss";
import { FaProjectDiagram } from "react-icons/fa";
import "antd/dist/antd.css";
import { IRecentTaskProps } from "../../../models";
import { convertSecondsToHours, getDaysMonth } from "../utilis";
import { WorkItemTypes } from "../../../enums";
import { TrackedItems } from "./TrackedItems";

export interface IResolvedProps {
  id?: string;
  comment?: string;
  type?: WorkItemTypes;
  tracked?: boolean;
}

export const RecentTask: FC<IRecentTaskProps> = ({
  name,
  projectName,
  taskTimes,
  id,
  totalTime,
  week,
  handleDoubleClick,
}) => {
  const weekdays = getDaysMonth(week.from, week.to);

  return (
    <div className={style.everHourContainer}>
      <div className={style.RecentTask}>
        <FaProjectDiagram color="green" />
        <span className={style.Name}>{name}</span>
        <br />
        <span className={style.projectName}>{projectName} </span>
      </div>
      <div
        className={style.DayTask}
        onDoubleClick={() =>
          handleDoubleClick({
            ...taskTimes?.filter(
              ({ date }) => date == swapDates(weekdays[0])
            )[0],
            taskId: id,
            date: weekdays[0],
          })
        }
      >
        <TrackedItems
          timeSlot={{
            ...taskTimes?.filter(
              ({ date }) => date == swapDates(weekdays[0])
            )[0],
            taskId: id,
            date: swapDates(weekdays[0]),
          }}
        />
      </div>
      <div
        className={style.DayTask}
        onDoubleClick={() =>
          handleDoubleClick({
            ...taskTimes?.filter(
              ({ date }) => date == swapDates(weekdays[1])
            )[0],
            taskId: id,
            date: weekdays[1],
          })
        }
      >
        <TrackedItems
          timeSlot={{
            ...taskTimes?.filter(
              ({ date }) => date == swapDates(weekdays[1])
            )[0],
            taskId: id,
            date: swapDates(weekdays[1]),
          }}
        />
      </div>
      <div
        className={style.DayTask}
        onDoubleClick={() =>
          handleDoubleClick({
            ...taskTimes?.filter(
              ({ date }) => date == swapDates(weekdays[2])
            )[0],
            taskId: id,
            date: weekdays[2],
          })
        }
      >
        <TrackedItems
          timeSlot={{
            ...taskTimes?.filter(
              ({ date }) => date == swapDates(weekdays[2])
            )[0],
            taskId: id,
            date: swapDates(weekdays[2]),
          }}
        />
      </div>

      <div
        className={style.DayTask}
        onDoubleClick={() =>
          handleDoubleClick({
            ...taskTimes?.filter(
              ({ date }) => date == swapDates(weekdays[3])
            )[0],
            taskId: id,
            date: weekdays[3],
          })
        }
      >
        <TrackedItems
          timeSlot={{
            ...taskTimes?.filter(
              ({ date }) => date == swapDates(weekdays[3])
            )[0],
            taskId: id,
            date: swapDates(weekdays[3]),
          }}
        />
      </div>
      <div
        className={style.DayTask}
        onDoubleClick={() =>
          handleDoubleClick({
            ...taskTimes?.filter(
              ({ date }) => date == swapDates(weekdays[4])
            )[0],
            taskId: id,
            date: weekdays[4],
          })
        }
      >
        <TrackedItems
          timeSlot={{
            ...taskTimes?.filter(
              ({ date }) => date == swapDates(weekdays[4])
            )[0],
            taskId: id,
            date: swapDates(weekdays[4]),
          }}
        />
      </div>
      <div
        className={style.DayTask}
        onDoubleClick={() =>
          handleDoubleClick({
            ...taskTimes?.filter(
              ({ date }) => date == swapDates(weekdays[5])
            )[0],
            taskId: id,
            date: weekdays[5],
          })
        }
      >
        <TrackedItems
          timeSlot={{
            ...taskTimes?.filter(
              ({ date }) => date == swapDates(weekdays[5])
            )[0],
            taskId: id,
            date: swapDates(weekdays[5]),
          }}
        />
      </div>
      <div
        className={style.DayTask}
        onDoubleClick={() =>
          handleDoubleClick({
            ...taskTimes?.filter(
              ({ date }) => date == swapDates(weekdays[6])
            )[0],
            taskId: id,
            date: weekdays[6],
          })
        }
      >
        <TrackedItems
          timeSlot={{
            ...taskTimes?.filter(
              ({ date }) => date == swapDates(weekdays[6])
            )[0],
            taskId: id,
            date: swapDates(weekdays[6]),
          }}
        />
      </div>
      <div
        className={style.TotalTime}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className={style.everHourManualTime}>
          <span className={style.everHourTime}>
            {!!totalTime ? `${convertSecondsToHours(totalTime)}:00` : "00:00"}
          </span>
        </div>
      </div>
    </div>
  );
};

function swapDates(date: string) {
  let day = date.split("-")[1];
  let month = date.split("-")[2];
  let year = date.split("-")[0];
  return `${year}-${month}-${day}`;
}
