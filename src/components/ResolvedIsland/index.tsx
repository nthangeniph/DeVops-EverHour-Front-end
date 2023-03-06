import React, { FC, Fragment, useEffect, useState } from "react";
import Style from "./style.module.scss";
import { WorkItem } from "./Workitem";
import { SiAzuredevops } from "react-icons/si";
import { FiFilter } from "react-icons/fi";
import { GoCalendar } from "react-icons/go";
import { AiOutlineSetting } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { IWorkItem } from "../../providers/devOps/contexts";
import { Button, Spin, Switch } from "antd";
import { FilterForm } from "../configuration/filter";
import { ConfigForm } from "../configuration/settings";
import { useConfigurations } from "../../providers/configurations";
import { EmptyData } from "../Empty";
import { useDevOps } from "../../providers/devOps";
import { WorkItemTypes } from "../../enums";
import { useAuth } from "../../providers/auth";
import { useBeforeunload } from "react-beforeunload";
import { refreshAccessToken } from "../../utils/auth";
import { Tooltip } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface IResolvedPROPs {
  ResolvedItems: Array<IWorkItem>;
}

const ResolvedIsland: FC<IResolvedPROPs> = ({ ResolvedItems }) => {
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [isConfiguring, setIsConfig] = useState<boolean>(false);
  const { getAllConfigurations, configurations, isTracked, updateIsTracked } =
    useConfigurations();
  const {
    getAllProjects,
    getWorkItems,
    isInProgress: { getWorkItems: isFetchingWork_Items },
  } = useDevOps();
  const { activeUserInfo, logoutUser } = useAuth();
  useBeforeunload(() => refreshAccessToken());

  useEffect(() => {
    if (!!activeUserInfo?.user?.id && !configurations?.companyname) {
      getAllConfigurations(activeUserInfo?.user?.id);
    }
  }, [activeUserInfo?.user?.id]);

  useEffect(() => {
    if (!configurations?.projects?.length && configurations?.userId) {
      getAllProjects();
      setIsFiltering(() => true);
    }
  }, [configurations]);

  useEffect(() => {
    getWorkItems();
  }, [isTracked]);

  const isEditing = isConfiguring || isFiltering;

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
      <div
        className={
          !isEditing ? Style.devOpsWithFilter : Style.devOpsWithFiltering
        }
      >
        <Spin
          spinning={isFetchingWork_Items}
          tip="Fetching Your DevOps Work Items"
          style={{ color: "#b1dbc4" }}
          indicator={<LoadingOutlined style={{ fontSize: 28 }} />}
        >
          <div
            className={!isEditing ? Style.container : Style.containerFiltering}
          >
            {ResolvedItems?.length ? (
              ResolvedItems?.filter(({ tracked }) => {
                if (!tracked && !isTracked) {
                  return true;
                } else if (tracked && isTracked) {
                  return true;
                }
              }).map(({ title, workItemType, id, timeEstimate }) => {
                return (
                  <Fragment key={id}>
                    <WorkItem
                      id={id}
                      details={title}
                      key={id}
                      type={
                        isTracked
                          ? WorkItemTypes?.Recurring
                          : (workItemType as any)
                      }
                      timeEstimate={timeEstimate}
                    />
                  </Fragment>
                );
              })
            ) : (
              <EmptyData
                buttonDescription="Filter Now"
                description="No work Items Found with the current Filters"
                onEmpty={() => setIsFiltering((prev) => !prev)}
              />
            )}
          </div>
        </Spin>
        <div className={Style.openFilter}>
          <div className={Style.configButtons}>
            <Button
              style={{
                border: "none",
                marginBottom: "10px",
              }}
              onClick={() => setIsFiltering((prev) => !prev)}
            >
              <FiFilter size={30} />
            </Button>
            <Button
              style={{
                border: "none",
                backgroundColor: "whitesmoke",
              }}
              disabled
              onClick={() => setIsConfig((prev) => !prev)}
            >
              <AiOutlineSetting size={30} />
            </Button>
            <Switch
              style={{
                border: "none",
                marginTop: "10px",
              }}
              checkedChildren="Tracked"
              unCheckedChildren="UnTracked"
              onChange={(value) => updateIsTracked(value)}
            />
            <Button
              style={{
                border: "none",
                backgroundColor: "whitesmoke",
                marginTop: "10px",
              }}
              disabled
              onClick={() => setIsConfig((prev) => !prev)}
            >
              <GoCalendar size={30} color="green" />
            </Button>
            <Button
              style={{
                border: "none",
                backgroundColor: "whitesmoke",
                marginTop: "10px",
              }}
              onClick={() => logoutUser()}
            >
              <Tooltip title={"Logout"} placement={"bottom"}>
                <MdLogout size={30} color="#838383" />
              </Tooltip>
            </Button>
          </div>
        </div>
        <div>
          {isFiltering ? (
            <FilterForm
              isFiltering={isFiltering}
              setIsFiltering={setIsFiltering}
            />
          ) : (
            <ConfigForm
              isConfiguring={isConfiguring}
              setIsConfig={setIsConfig}
            />
          )}
        </div>
      </div>
    </>
  );
};

export { ResolvedIsland };
