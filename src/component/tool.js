export const range = (size, startAt = 0) => [...Array(size).keys()].map(i => i + startAt)
export function    getTime(date) { //日期格式化
    let year = date.getFullYear()
    let month= date.getMonth()+ 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let day=date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let hours=date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minutes=date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let seconds=date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    let s=year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds
    
    return s
}
