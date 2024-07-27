import { format, addDays, subDays } from 'date-fns';

// compresses dates so the date returned does not include the time
 export const compressDate = (date) => {
    const receDate = new Date(date);
    return `${receDate.getFullYear()}-${receDate.getMonth() + 1}-${receDate.getDate()}`
}

// Format the date as 'YYYY-MM-DD', changes the value of the calender up top and no errors in console
const formatDateForInput = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};


// handles date display for the current previous and post dates
export const formatDate = (date, str) => {
    let today = new Date(date);
    if (str && str === 'prev') {
        today = subDays(today, 1);
    }
    if (str && str === 'post') {
        today = addDays(today, 1)
    }
    return format(today, 'EEEE, MMMM d yyyy');
}
