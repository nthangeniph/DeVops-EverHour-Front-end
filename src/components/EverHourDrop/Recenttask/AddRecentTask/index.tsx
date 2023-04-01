import { PlusSquareOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { FC, useState } from "react";
import style from "./style.module.scss";

interface IAddTaskProps {}

const AddRecentTask: FC<IAddTaskProps> = ({}) => {
  return (
    <div className={style.AddCapsule}>
      <div className={style.AddTaskButtons}>
        <Button type="primary">
          {" "}
          <PlusSquareOutlined />
          Add Task
        </Button>
      </div>
    </div>
  );
};
export { AddRecentTask };
