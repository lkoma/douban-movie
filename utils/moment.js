function getDate() {
    const date = new Date();
    const y = date.getFullYear();
    let m = date.getMonth();
    let d = date.getDate();
    if (m < 10) {
        m = `0${m}`;
    }
    if (d < 10) {
        d = `0${d}`;
    }
    return `${y}-${m}-${d}`;
}
function getTime() {
    const date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    if (h < 10) {
        h = `0${h}`;
    } 
    if (m < 10) {
        m = `0${m}`;
    } 
    return `${h}:${m}`;
}
module.exports = { getDate, getTime };