import { WorkItemTypes } from "../../enums";

const getDaysMonthArray = (start: any, end: any) => {
    for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
        const date = new Date(dt).toLocaleDateString().split("/");
        arr.push({
            day: parseInt(date[1]),
            month: parseInt(date[0])
        });
    }
    return arr;
};

const getDaysMonth = (start: any, end: any) => {
    for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
        const date = new Date(dt).toLocaleDateString().split("/").reverse().join('-');
       let tempDate=date.split('-').map(dt=>{
            return dt.length>1?dt:`0${dt}`
        });

        arr.push(`${tempDate[0]}-${tempDate[2]}-${tempDate[1]}`);
    }
  
    return arr;
};

const getWeekHeader = (start: any, end: any) => {
    let startDate = new Date(start).toLocaleDateString().split('/');
    let endDate = new Date(end).toLocaleDateString().split('/');
    return `${getMonth(parseInt(startDate[0]))} ${startDate[1]} -- ${getMonth(parseInt(endDate[0]))} ${endDate[1]}`
}


function getMonth(date: number) {
    switch (date) {
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

}

const convertSecondsToHours = (time: number, toSeconds = false) => {

    if (time) {
        if (toSeconds) {
            return time * 3600
        } else {
            return Math.floor(time / 3600)
        }
    }



}


const timeIndicatorColor=(time:number)=>{
    const hours=convertSecondsToHours(time);
    if(hours>10){
        return 'red'
    }else if(5<hours && hours<=10){
        return 'green'

    }else if(hours<5){
        return 'gray'
    }else{
        return 'white'
    }
}
function getWorkTypes(x: string) {
    switch (x) {
        case 'bg':
            return WorkItemTypes.Bug;
        case 'us':
            return WorkItemTypes.User_Story;
        case 'ft':
            return WorkItemTypes.Feature;
        case 'ts':
            return WorkItemTypes.Task;
        case 'rc':
                return WorkItemTypes.Recurring;
      
    }
}
function getWorkTypeSymbol(x: WorkItemTypes) {
    switch (x) {
        case WorkItemTypes.Bug:
            return 'bg';
        case WorkItemTypes.User_Story:
            return 'us';
        case WorkItemTypes.Feature:
            return 'ft';
        case WorkItemTypes.Task:
            return 'ts' ;
        case WorkItemTypes.Recurring:
                return 'rc' ;
        default:
            return 'bg';
    }
}







export { getDaysMonthArray, getDaysMonth, getMonth, convertSecondsToHours,timeIndicatorColor, getWeekHeader,getWorkTypes,getWorkTypeSymbol }