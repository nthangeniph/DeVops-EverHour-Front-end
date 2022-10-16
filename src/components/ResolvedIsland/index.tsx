import React, { FC } from 'react';
import { IItemProps } from '../item';
import Style from './style.module.scss';
import { WorkItem } from './Workitem';
import { SiAzuredevops } from "react-icons/si";

interface IResolvedPROPs {
    ResolvedItems: Array<IItemProps>,
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
                    ResolvedItems.map(({ details, id, type }) => {
                        return (
                            <>
                                <WorkItem id={id} details={details} key={id} type={type} />
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