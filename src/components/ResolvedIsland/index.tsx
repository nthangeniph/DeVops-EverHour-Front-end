import React, { FC, useState } from "react";
import Style from "./style.module.scss";
import { WorkItem } from "./Workitem";
import { SiAzuredevops } from "react-icons/si";
import { FaFilter } from "react-icons/fa";
import { IWorkItem } from "../../providers/devOps/contexts";
import { Button, DatePicker, Form, Select } from "antd";
import { useDevOps } from "../../providers/devOps";

interface IResolvedPROPs {
  ResolvedItems: Array<IWorkItem>;
}
const stateOptions = [
  {
    value: "Active",
    id: "active",
  },
  {
    value: "Resolved",
    id: "resolved",
  },
  {
    value: "Closed",
    id: "closed",
  },
  {
    value: "New",
    id: "new",
  },
];
const dateFormat = "DD/MM/YYYY";
const tailLayout = {
  wrapperCol: { offset: 2, span: 7 },
};

const ResolvedIsland: FC<IResolvedPROPs> = ({ ResolvedItems }) => {
  const { projects } = useDevOps();
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  return (
    <>
      <div
        style={{
          height: "20px",
          width: "25%",
          color: "black",
          margin: "25px auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <SiAzuredevops color="#77CCFF" style={{ margin: "14px 5px" }} />
        <span style={{ margin: "10px 0px" }}>DevOps Resolved Island</span>
      </div>
      <div className={Style.devOpsWithFilter}>
        <div
          className={!isFiltering ? Style.container : Style.containerFiltering}
        >
          {ResolvedItems?.map(({ title, workItemType, id, timeEstimate }) => {
            return (
              <>
                <WorkItem
                  id={id}
                  details={title}
                  key={id}
                  type={workItemType as any}
                  timeEstimate={timeEstimate}
                />
              </>
            );
          })}
        </div>
        <div className={Style.openFilter}>
          <Button
            style={{
              border: "none",
            }}
            onClick={() => setIsFiltering((prev) => !prev)}
          >
            <FaFilter size={30} />
            <br />
            <span>Filters</span>
          </Button>
        </div>
        <div className={isFiltering ? Style.filter : Style.hideFilters}>
          <h2 style={{ display: "flex", margin: "0px 35%" }}>Filters</h2>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 17 }}
            title="Filters"
          >
            <Form.Item label="Projects">
              <Select mode="multiple">
                {projects?.map(({ id, name }) => {
                  return (
                    <Select.Option value={name} key={id}>
                      {name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item label="States">
              <Select mode="multiple">
                {stateOptions.map(({ id, value }) => {
                  return (
                    <Select.Option value={value} key={id}>
                      {value}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item label="From">
              <DatePicker format={dateFormat} />
            </Form.Item>
            <Form.Item label="To">
              <DatePicker format={dateFormat} />
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
                onClick={() => setIsFiltering((prev) => !prev)}
                style={{ backgroundColor: "#FF5733", color: "white" }}
              >
                Close
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export { ResolvedIsland };
