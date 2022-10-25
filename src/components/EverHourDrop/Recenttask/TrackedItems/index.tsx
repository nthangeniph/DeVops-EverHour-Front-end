import React, { FC } from 'react';
import { WorkItemTypes } from '../../../../enums';
import { ITimeSlot } from '../../../../models';
import { BsFillChatSquareQuoteFill } from "react-icons/bs";
import { GetWorkItemType } from '../../../ResolvedIsland/Workitem/utilis';
import style from './style.module.scss';
import { Tooltip } from 'antd';
import { getWorkTypes } from '../../utilis';




export interface ITrackedItemProps {
    timeSlot?: ITimeSlot;
}
export const TrackedItems: FC<ITrackedItemProps> = ({
    timeSlot = {
        "id": "ev:249523131111781",
        "date": "2022-09-09",
        "comment": `Parent has to update the address they should not be able to cancel (bg3467743),High School Principals should not be able to add parents to the pre-reg table (us4532357),Highlight the parent and learner in red and add a text (ft7632234),Adding a learner on pre-reg to school thats just been added (ts3421345)`,
        "manualTime": 18000
    } }) => {

    let workItems = timeSlot.comment.split(',').map(tsk => {
        let length = tsk.length - 11;
        return tsk.substring(length,)
    });
    let workItemsType = workItems
        .map(wkItm => wkItm.substring(1, 3))
        .map(y => getWorkTypes(y));
    let createComents = timeSlot.comment
        .split(',')
        .map((commt,index) => <p>{`${index+1}.${commt}`}</p>)
    return (
        <div className={style.cover}>
            <div className={style.items}>
                {workItemsType.map(itemtype => {
                    return GetWorkItemType(itemtype)
                })}
            </div>
            <div className={style.actions}>
                <Tooltip placement="left" title={createComents} mouseEnterDelay={1}>
                    <BsFillChatSquareQuoteFill color='green' style={{ margin: '0px 8px' }} />
                </Tooltip>
            </div>
        </div>
    )
}
