import React, { useState, useRef } from 'react';
import "./movies.css";
import { service } from "../service/service"
import useEffectAsync from '../service/useEffectAsync';
import Spinner from "../common/spinner"
import Date_Picker from '../common/calendar';
interface MoviesProps {
  className?: string;
}
export default function Movies(props: MoviesProps) {
  const [movies, setMovies] = useState(null);
  const [hours, setHours] = useState([{ hours_HallInfo: [{ hall_id: 0, hour: "", booked_seats: [{}] }], _id: "", movie_id: "" }])
  const childRef = useRef(null);
  const [dataChanged, setDataChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [weekDays, setWeekDays] = useState(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
  const [tempDay, setTempDay] = useState("");
  const [chosenDay, setChosenDay] = useState(new Date().toLocaleDateString())
  const load = async () => {
    setIsLoading(true);
    //Movies
    await loadMovies();
    //Hours
    await loadHours();
    //Dni tygodnia
    var finalTab = setOrderedWeekDays();
    setWeekDays(finalTab)
    setTempDay(finalTab[0]);
    setIsLoading(false);
    document.getElementById(finalTab[0]).style.fontSize = "30px"
  }
  const loadHours = async () => {
    var de = new Date;
    let promiseHours = service.GetHour4Day(de.toLocaleDateString());
    let responseHours = await promiseHours;
    setHours(responseHours)
  }
  const setOrderedWeekDays = () => {
    var d = new Date();
    var weekDay = d.getDay()
    let tempWeek = weekDays.slice(weekDay);
    let tempWeek2 = weekDays.slice(0, weekDay);
    var finalTab = tempWeek.concat(tempWeek2);
    return finalTab;
  }
  const loadMovies = async () => {
    let promiseMovies = service.GetMovies();
    let responseMovies = await promiseMovies;
    setMovies(responseMovies)
  }
  async function changeDay(day) {
    var idx = weekDays.indexOf(day);
    var nextDay = new Date();
    nextDay.setDate(new Date().getDate() + idx)
    let promiseHours = service.GetHour4Day(nextDay.toLocaleDateString());
    let responseHours = await promiseHours;
    setHours(responseHours)
    setChosenDay(nextDay.toLocaleDateString())
    if (day !== tempDay) {
      document.getElementById(day).style.fontSize = "30px"
      document.getElementById(tempDay).style.fontSize = ""
      setTempDay(day)
    }
    childRef.current.setCurrentDay(nextDay);

  }
  async function setDatebyCalendar(date) {
    let promiseHours = service.GetHour4Day(date.toLocaleDateString());
    let responseHours = await promiseHours;
    setHours(responseHours)
    setChosenDay(date.toLocaleDateString())
    document.getElementById(tempDay).style.fontSize = ""
  }

  useEffectAsync(async () => {

    load();
  }, [dataChanged])
  return (
    <div>
      <link rel='stylesheet' id='fontawesome-css' href='https://use.fontawesome.com/releases/v5.0.1/css/all.css?ver=4.9.1' type='text/css' media='all' />
      {isLoading ? (<Spinner />) : movies === null ? <Spinner /> :
        <div style={{ display: "inline-block" }}><div> {weekDays.map(day => { return <button onClick={() => changeDay(day)} className="days hourButton" key={day} id={day}>{day}</button> })}
          <Date_Picker ref={childRef} setDateByCalendar={(date) => setDatebyCalendar(date)} />
        </div>
          <ul>  {movies.map((movie, index) =>
            <li className={"card-body  container singleCard a" + movie.id} key={movie.id}>
              <div className="row">
                <div className="col-sm poster">
                  <div><img className="poster_img" src={movie.poster_path} ></img></div>
                </div>
                <div className="col-sm overview">
                  <div className="title">{movie.title}</div>
                  <div></div>
                  {movie.overview}
                </div>
                <div className="col-sm">
                  Hours
                  {hours.map(h => h.hours_HallInfo.map(hour => {
                  if (h.movie_id == movie.id) {
                    return <div><a href="tickets">
                      <button className="hourButton" onClick={() => {
                        var object = { hour: hour.hour, chosenDay: chosenDay, movieID: movie.id, movieTitle: movie.title, hall_id: hour.hall_id.toString() }
                        localStorage.setItem("chosen_movie",JSON.stringify(object))
                      }}>
                        {hour.hour}
                      </button>
                    </a></div>
                  }
                }))}
                </div>
              </div>
            </li>
          )}</ul></div>}
    </div>
  )
}