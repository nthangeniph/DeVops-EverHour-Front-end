import React, { FC } from 'react';
import style from './style.module.scss';
import 'antd/dist/antd.css';
import { IWeek } from '../../../models';
import { getDaysMonthArray, getMonth, getWeekHeader } from '../utilis';



export interface IEverHeadProps {
    week?: IWeek;
}


export const EverHourHeader: FC<IEverHeadProps> = ({ week }) => {

    const days = getDaysMonthArray(new Date(week.from), new Date(week.to))
   
    return (
        <div className={style.everHourContainer}>
            <div className={style.RecentTask}>Recent Tasks</div>
            <div className={style.DayTask}>
                <span>
                    Monday<br />
                    {`${days[0].day} ${getMonth(days[0].month)}`}
                </span>
            </div>
            <div className={style.DayTask}>
                <span>
                    Tuesday<br />
                    {`${days[1].day} ${getMonth(days[1].month)}`}
                </span>
            </div>
            <div className={style.DayTask}>
                <span>
                    wednesday<br />
                    {`${days[2].day} ${getMonth(days[2].month)}`}
                </span>
            </div>
            <div className={style.DayTask}>
                <span>
                    Thursday <br />
                    {`${days[3].day} ${getMonth(days[3].month)}`}
                </span>
            </div>
            <div className={style.DayTask}>
                <div className={style.dateDetails}>
                    <span>
                        Friday
                        <br />{`${days[4].day} ${getMonth(days[4].month)}`}
                    </span>
                </div>

            </div>
            <div className={style.DayTask}>
                <span>Saturday
                    <br />{`${days[5].day} ${getMonth(days[5].month)}`}
                </span>
            </div>
            <div className={style.DayTask}>
                <span>
                    Sunday
                    <br />{`${days[6].day} ${getMonth(days[6].month)}`}
                </span>
            </div>
            <div className={style.TotalTime}>Total</div>



        </div>
    );
}


