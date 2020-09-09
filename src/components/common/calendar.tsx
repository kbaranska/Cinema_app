import { useState, useImperativeHandle, forwardRef, useEffect } from "react";
import React from "react";
import DatePicker  from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./calendar.css"
import calendar from "../../images/calendar.png"
import { moveMessagePortToContext } from "worker_threads";
import moment from "moment";

 const Date_picker=forwardRef((props:{setDateByCalendar:(date)=>void},ref)=>{

const [startDate, setStartDate] = useState(new Date());
   const dateSetter=(date)=>{
    setStartDate(date); 
    return props.setDateByCalendar(date)

   }
    useImperativeHandle(
     ref, () => ({
          setCurrentDay(date) {
            setStartDate(date);
          }
       }),
   );
   useEffect(()=>{
})

    return (
      <DatePicker
        selected={startDate}
        onChange={date => {dateSetter(date)}}
        minDate={new Date()}
        maxDate={new Date().setDate(new Date().getDate()+10)}
    customInput={<div className="calendar_div"><img className="calendar_img" src={calendar}></img>{startDate.toLocaleString().substr(0,startDate.toLocaleString().indexOf(','))}</div>}
      />
    
    );
})
export default Date_picker;