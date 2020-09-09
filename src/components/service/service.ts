import axios from 'axios';
import {unwrap} from "./serviceUtility"

class Service{
GetMovies(){
  // return axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=0bdd84d5534b9b1f988719cdeba8dc4d').then(unwrap);
  return axios.get('http://localhost:5000/api/GetMovies').then(unwrap);
}
GetHours4Movie(movie_id){
  return axios.get('http://localhost:5000/api/GetHours/m/'+movie_id).then(unwrap);
}
GetHours(){
  return axios.get('http://localhost:5000/api/GetHours/m').then(unwrap);
}
GetHour4Day(date){
  return axios.get('http://localhost:5000/api/GetHours/d/'+date).then(unwrap);
}
GetHallByID(id){
  return axios.get('http://localhost:5000/api/GetHall/'+id).then(unwrap);
}
}
export const service = new Service();
