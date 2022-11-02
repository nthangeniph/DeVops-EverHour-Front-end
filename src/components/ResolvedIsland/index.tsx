import React, { FC } from 'react';
import Style from './style.module.scss';
import { WorkItem } from './Workitem';
import { SiAzuredevops } from "react-icons/si";
import { IWorkItem } from '../../providers/devOps/contexts';

interface IResolvedPROPs {
    ResolvedItems: Array<IWorkItem>,
}

const ResolvedIsland: FC<IResolvedPROPs> = ({ ResolvedItems }) => {

    return (
        <>
            <div style={{ height: '20px', width: '25%', color: 'black', margin: '3px auto', display: 'flex', justifyContent: 'center' }}>
                <SiAzuredevops color='#77CCFF' style={{ margin: 'auto 10px' }} />
                <span style={{ margin: 'auto 0px' }}>DevOps Resolved Island</span>
            </div>
            <div className={Style.container}>
                {
                    ResolvedItems?.map(({ title,workItemType,id, }) => {
                        return (
                            <>
                                <WorkItem id={id} details={title} key={id} type={workItemType as any} />
                            </>
                        )
                    }
                    )
                }
            </div>
        </>


    )

}

export { ResolvedIsland };