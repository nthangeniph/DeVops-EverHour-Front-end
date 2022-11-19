import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { WorkItemTypes } from '../enums';
import { useDevOps } from '../providers/devOps';
import { EverHourHub } from './EverHourDrop';
import { ResolvedIsland } from './ResolvedIsland';




const DragDrop=()=>{
    const {  getWorkItems ,workItems,isInProgress} = useDevOps()

    useEffect(()=>{
      getWorkItems()
    },[])
  
    console.log("items::",workItems,isInProgress)
  
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }

    return (
        <div>
            <Spin spinning={isInProgress?.getWorkItems} tip='Fetching Your DevOps Work Items'>
           <ResolvedIsland ResolvedItems={workItems} />
           </Spin>
            <div style={{height:'45rem'}}>
            <EverHourHub/> 
            </div>
           
            
                    
        </div>
    )
}

export default DragDrop;