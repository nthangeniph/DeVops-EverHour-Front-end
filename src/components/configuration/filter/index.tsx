import { Button, DatePicker, Form, Select } from "antd";
import moment from "moment";
import React, { FC, useEffect, useState } from "react";
import { useAuth } from "../../../providers/auth";
import { useConfigurations } from "../../../providers/configurations";
import { IConfigurationCreateInput } from "../../../providers/configurations/contexts";
import { useDevOps } from "../../../providers/devOps";
import Style from "./style.module.scss";

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
export interface IFilter {
  setIsFiltering?: (fun: any) => void;
  isFiltering?: boolean;
}

export const FilterForm: FC<IFilter> = ({ isFiltering, setIsFiltering }) => {
  const { activeUserInfo } = useAuth();
  const { projects, getWorkItems } = useDevOps();
  const {
    updateConfigurations,
    succeeded,
    getAllConfigurations,
    configurations,
  } = useConfigurations();
  const [form] = Form.useForm();
  const [config, setConfig] =
    useState<IConfigurationCreateInput>(configurations);

  useEffect(() => {
    if (succeeded?.updateConfig) {
      getWorkItems();
      console.log("getConfigById002");
      getAllConfigurations(activeUserInfo?.user?.id);
    }
  }, [succeeded?.updateConfig]);
  useEffect(() => {
    if (config?.userId) {
      form.setFields([
        {
          name: "projects",
          value: config?.projects,
        },
        {
          name: "states",
          value: config?.states,
        },
        {
          name: "dateFrom",
          value: moment(config?.dateFrom),
        },
        {
          name: "dateTo",
          value: moment(config?.dateTo),
        },
      ]);
    }
  }, [config]);

  const handleSubmit = (values: any) => {
    //@ts-ignore
    updateConfigurations({ ...values, userId: activeUserInfo?.user?._id });
    setTimeout(() => {
      setIsFiltering(() => !isFiltering);
    }, 1500);
  };
  const onReset = () => {
    setConfig(() => ({}));
    form.resetFields();
  };

  return (
    <div className={isFiltering ? Style.filter : Style.hideFilters}>
      <h2 style={{ display: "flex", margin: "0px 35%" }}>Filters</h2>
      <Form
        form={form}
        onFinish={handleSubmit}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 17 }}
        title="Filters"
      >
        <Form.Item
          label="Projects"
          name="projects"
          rules={[
            { required: true, message: "Please Select at least one Project!" },
          ]}
        >
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
        <Form.Item
          label="States"
          name="states"
          rules={[
            { required: true, message: "Please Select at least one State!" },
          ]}
        >
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
        <Form.Item
          label="From"
          name="dateFrom"
          rules={[{ required: true, message: "Please Select date!" }]}
        >
          <DatePicker format={dateFormat} />
        </Form.Item>
        <Form.Item label="To" name="dateTo">
          <DatePicker format={dateFormat} />
        </Form.Item>
        <div className={Style.buttons}>
          <Button
            style={{ marginRight: "10px" }}
            htmlType="button"
            onClick={onReset}
          >
            Clear
          </Button>
          <Button
            style={{
              marginRight: "10px",
              backgroundColor: "#0096FF",
              color: "white",
            }}
            htmlType="submit"
          >
            Apply
          </Button>
          <Button
            onClick={() => setIsFiltering(() => !isFiltering)}
            style={{
              backgroundColor: !configurations?.projects?.length
                ? "gray"
                : "#FF5733",
              color: "white",
            }}
            disabled={!configurations?.projects?.length}
          >
            Close
          </Button>
        </div>
      </Form>
    </div>
  );
};
