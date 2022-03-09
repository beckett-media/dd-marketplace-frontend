const moment = require('moment');

export const getMonthName = (month) => {
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    return months[month];
};

export const getDifferenceInDays = (date) => {
    return moment.duration(moment(date).diff(moment())).asDays();
};

export const isBidStarted = (bidStart) =>
    !moment(new Date()).isBefore(moment(bidStart));
