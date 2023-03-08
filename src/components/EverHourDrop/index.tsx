import React, { FC, useEffect, useRef, useState } from "react";
import { EverHourHeader } from "./EverHourHeader";
import { IResolvedProps, RecentTask } from "./Recenttask";
import style from "./style.module.scss";
import { Collapse } from "antd";
import { v4 as uuidv4 } from "uuid";
import ReactLoading from "react-loading";
import { getDaysMonth, getWeekHeader, timeIndicatorColor } from "./utilis";
import { DropSlot } from "../DropSlot";
import { ITimeSlot } from "../../models";
import { useEverHour } from "../../providers/everHour";

const { Panel } = Collapse;

export interface IDevOpInfo {
  id?: string;
  type?: string;
  tracked?: boolean;
}

export const EverHourHub: FC<any> = ({}) => {
  const [resolvedItem, setResolvedItem] = useState<IResolvedProps[]>([]);
  const [devOpsUpdate, setDeVOpsUpdate] = useState<IDevOpInfo[]>([]);
  const [isEditingMode, setIsEditing] = useState<boolean>(false);
  const [slot, setSlot] = useState<ITimeSlot>();
  const [limit, setLimit] = useState<number>(7);
  const dataFetchedRef = useRef(false);
  const { getWeekTasks, timeSheets, succeeded } = useEverHour();

  useEffect(() => {
    if (limit) {
      if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;
      getWeekTasks({ limit: limit.toString() });
    }
  }, [limit]);

  useEffect(() => {
    if (succeeded?.updateTask) {
      getWeekTasks({ limit: limit.toString() });
    }
  }, [succeeded?.updateTask]);

  const handleDoubleClick = (data: ITimeSlot) => {
    let workItems = data?.comment?.split("|")?.map((tsk) => {
      let length = tsk.length - 6;
      return {
        id: tsk.substring(length, length - 1),
        type: tsk.substring(length - 2, length + 3),
        tracked: true,
      };
    });

    setDeVOpsUpdate(() => workItems);
    setSlot(() => data);
    setIsEditing(true);
  };

  return (
    <div className={style.outCover}>
      {timeSheets?.length ? (
        <div className={style.Board}>
          <Collapse
            defaultActiveKey={["1"]}
            style={{ width: "100%" }}
            bordered={true}
          >
            {timeSheets.map(({ weekTasks, week }, index) => {
              let weekTotal = weekTasks?.reduce((totalWeek, { totalTime }) => {
                return totalWeek + totalTime;
              }, 0);
              let timeIndicator = {};
              getDaysMonth(week.from, week.to).map((day) => {
                //@ts-ignore
                timeIndicator[day] = 0;
              });

              getDaysMonth(week.from, week.to).map((day) => {
                let x = weekTasks
                  .map(({ taskTimes }) => {
                    if (taskTimes.find(({ date }) => date == day)?.id) {
                      return taskTimes.find(({ date }) => date == day);
                    }
                  })
                  .filter((task) => !!task?.id);
                //@ts-ignore
                timeIndicator[day] = x.reduce((current, value) => {
                  return current + value.manualTime;
                }, 0);
              });

              return (
                <Panel
                  header={
                    <div className={style.weekHeader}>
                      <h2 className={style.headerText}>
                        {getWeekHeader(week.from, week.to)}
                      </h2>
                      <div className={style.timeReview}>
                        {getDaysMonth(week.from, week.to).map((day) => {
                          //@ts-ignore
                          let color = timeIndicatorColor(timeIndicator[day]);
                          return (
                            <div
                              key={day}
                              className={style.indicator}
                              style={{ backgroundColor: `${color}` }}
                            ></div>
                          );
                        })}
                      </div>
                      <div style={{ display: "flex" }}>
                        <h2>{`${weekTotal / 3600}h`}</h2>
                      </div>
                    </div>
                  }
                  key={index + 1}
                  className={style.custom}
                >
                  <EverHourHeader week={week} key={uuidv4()} />

                  {weekTasks?.map((task) => {
                    weekTotal = +task.totalTime;
                    return (
                      <RecentTask
                        key={uuidv4()}
                        name={task.name}
                        taskTimes={task.taskTimes}
                        id={task?.id}
                        projectName={task.projectName}
                        totalTime={task.totalTime}
                        week={week}
                        handleDoubleClick={handleDoubleClick}
                        setIsEditing={setIsEditing}
                      />
                    );
                  })}
                </Panel>
              );
            })}
          </Collapse>
        </div>
      ) : (
        <div className={style.loading}>
          <div>
            <ReactLoading
              className={style.loaderIcon}
              type={"bars"}
              color="#AFE1AF	"
              width={"45%"}
            />
            <h3 style={{ margin: "auto" }}>EverHour Data Loading </h3>
          </div>
        </div>
      )}
      {isEditingMode && (
        <div className={style.addEdit}>
          <div className={style.dropIsland}>
            <DropSlot
              setIsEditing={setIsEditing}
              setResolvedItem={setResolvedItem}
              setSlot={setSlot}
              slot={slot}
              resolvedItem={resolvedItem}
              devOpsUpdate={devOpsUpdate}
              setDeVOpsUpdate={setDeVOpsUpdate}
            />
          </div>
        </div>
      )}
    </div>
  );
};
