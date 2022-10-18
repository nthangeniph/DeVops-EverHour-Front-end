const getDaysMonthArray = (start: any, end: any) => {
    for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
        const date = new Date(dt).toLocaleDateString().split("/");
        arr.push({
            day: parseInt(date[0]),
            month: parseInt(date[1])
        });
    }
    return arr;
};

const getDaysMonth = (start: any, end: any) => {
    for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
        const date = new Date(dt).toLocaleDateString().split("/").reverse().join('-');
        arr.push(date);
    }
    return arr;
};

const getWeekHeader = (start: any, end: any) => {
    let startDate = new Date(start).toLocaleDateString().split('/');
    let endDate = new Date(end).toLocaleDateString().split('/')
    return `${getMonth(parseInt(startDate[1]))} ${startDate[0]} -- ${getMonth(parseInt(endDate[1]))} ${endDate[0]}`
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






export { getDaysMonthArray, getDaysMonth, getMonth, convertSecondsToHours, getWeekHeader }