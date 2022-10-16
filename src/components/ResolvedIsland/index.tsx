import React,{ FC} from 'react';
import Style from './style.module.scss';

interface IResolvedPROPs{
    children: JSX.Element,
}

const ResolvedIsland:FC<IResolvedPROPs>=({children})=>{

    return (
        <div className={Style.container}>
           {children}
        </div>

    )

}

export {ResolvedIsland};