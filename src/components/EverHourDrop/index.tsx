import React, { FC } from 'react';
import style from './style.module.scss';

import 'antd/dist/antd.css';



export interface IEverHeadProps {
    dailyTimes?: Array<string>;
}


export const EverHourDrop: FC<IEverHeadProps> = ({ dailyTimes }) => {

    const days = dailyTimes?.map(day => day?.substring(9,));

    console.log("days::",dailyTimes,days)
    return (
        <div className={style.everHourContainer}>
            <div className={style.RecentTask}>Recent Tasks</div>
            <div className={style.DayTask}>
                <span>
                    Monday<br />
                {`${days[4]} ${getMonth(dailyTimes[0])}`}
                </span>
            </div>
            <div className={style.DayTask}>
                <span>
                    Tuesday<br />
                {`${days[3]} ${getMonth(dailyTimes[1])}`}
                </span>
            </div>
            <div className={style.DayTask}>
                <span>
                    wednesday<br />
                {`${days[2]} ${getMonth(dailyTimes[2])}`}
                </span>
            </div>
            <div className={style.DayTask}>
                <span>
                    Thursday <br/>
                    {`${days[1]} ${getMonth(dailyTimes[3])}`}
                    </span>
            </div>
            <div className={style.DayTask}>
                <div className={style.dateDetails}>
                    <span style={{ margin: '6px auto' }}>
                        Friday 
                     <br />{`${days[0]} ${getMonth(dailyTimes[4])}`}
                     </span>
                </div>

            </div>
            <div className={style.DayTask}>
                <span>Saturday
                    <br />{`${days[5]} ${getMonth(dailyTimes[5])}`}
                </span>
            </div>
            <div className={style.DayTask}>
                <span>
                    Sunday
                    <br />{`${days[6]} ${getMonth(dailyTimes[6])}`}
                </span>
            </div>
            <div className={style.TotalTime}>Total</div>



        </div>
    );
}


function getMonth(date: string) {
    let month = parseInt(date?.substring(6, 8))
    switch (month) {
        case 1:
            return 'January'
        case 2:
            return "February"
        case 3:
            return 'March'
        case 4:
            return "April"
        case 5:
            return 'May'
        case 6:
            return "June"
        case 7:
            return 'July'
        case 8:
            return 'August'
        case 9:
            return 'September'
        case 10:
            return 'October'
        case 11:
            return 'November'
        case 12:
            return 'December'
        default:
            return ''
    }
    return
}






