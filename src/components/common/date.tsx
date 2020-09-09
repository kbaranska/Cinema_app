export default function getDate(day,month,year){
if(day ===undefined || month=== undefined || year=== undefined){
    var todayDate = new Date;
   var today=todayDate.toLocaleString();
return today; 
} else {
    return day+"."+month+"."+year
}
}