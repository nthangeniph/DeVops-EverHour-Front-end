import { Button, Divider, Form, Input } from "antd";
import React, { FC } from "react";
import Style from "./style.module.scss";

export interface IFilter {
  setIsConfig?: (fun: any) => void;
  isConfiguring?: boolean;
}

export const ConfigForm: FC<IFilter> = ({ isConfiguring, setIsConfig }) => {
  return (
    <div className={isConfiguring ? Style.filter : Style.hideFilters}>
      <h2 style={{ display: "flex", margin: "0px 35%" }}>Configurations</h2>
      <Form labelCol={{ span: 7 }} wrapperCol={{ span: 17 }} title="Filters">
        <Divider>DevOps</Divider>
        <Form.Item label="Display Name" name={"devOpsDisplayName"}>
          <Input className={Style.inputs} />
        </Form.Item>
        <Form.Item label="Username" name={"devOpsUsername"}>
          <Input className={Style.inputs} />
        </Form.Item>
        <Form.Item label="Pat" name={"pat"}>
          <Input.Password className={Style.inputs} />
        </Form.Item>
        <Divider>EverHour</Divider>
        <Form.Item label="XApiKey " name={"xApiKey"}>
          <Input.Password className={Style.inputs} />
        </Form.Item>
        <div className={Style.buttons}>
          <Button style={{ marginRight: "10px" }}>Clear</Button>
          <Button
            style={{
              marginRight: "10px",
              backgroundColor: "#0096FF",
              color: "white",
            }}
          >
            Apply
          </Button>
          <Button
            onClick={() => setIsConfig(() => !isConfiguring)}
            style={{ backgroundColor: "#FF5733", color: "white" }}
          >
            Close
          </Button>
        </div>
      </Form>
    </div>
  );
};
