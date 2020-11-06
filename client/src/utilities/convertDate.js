const formatDate = (date) => {
    const longMonths = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "Decembery",
    ];
    const isoDate = new Date(date);
    const day = isoDate.getDate();
    const month = longMonths[isoDate.getMonth()];
    const year = isoDate.getFullYear();
    const fullDate = `${day}-${month}-${year}`;
    return fullDate;
};

export default formatDate;
