const express = require("express");
const app = express(); // create express app
const mongoose = require('mongoose');
var cors = require('cors');

app.use(cors());

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/sapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB..'))
  .catch(err => console.log('Could not connect to MongoDB...'))

const movieSchema = new mongoose.Schema({
  title: String,
  overview: String,
  id: Number,
  poster_path: String
}, {
  collection: 'movies'
})

const hourSchema = new mongoose.Schema({
  movie_id: Number,
  hours_HallInfo: [{
    hour: String,
    hall_id: Number,
    booked_seats:[{type:Number}]
  }],
  date: String,
}, {
  collection: 'hours'
})

const hallSchema = new mongoose.Schema({
  hall_id: {
    type: Number,
    unique: true
  },
  hall_number: Number,
  number_of_seats: Number,
 }, {
  collection: 'hall'
})

const Movie = mongoose.model('Movie', movieSchema, 'movies');
const Hour = mongoose.model('Hour', hourSchema, 'hours');
const Hall = mongoose.model('Hall', hallSchema, 'hall');

// Pobieranie listy filmów
async function getMovies() {
  const movies = await Movie.find();
  // console.log(movies)
  return movies;
}

app.get("/api/GetMovies", (req, res) => {
  const movies = getMovies().then(
    function (value) {
      console.log(value);
      res.send(value);
    }
  )
});

//Pobieranie godzin przezs film/ bez filmu mozna wszystkie
async function getHoursByMid(movieid) {
  let hours;
  if (movieid) {
    hours = await Hour.find({
      movie_id: movieid
    });
  } else {
    hours = await Hour.find();
  }
  console.log(hours)
  return hours;
}
//pobieranie godzin na konkretny dzień
async function getHoursByDate(date) {
  let hours;
  hours = await Hour.find({
    date: date
  });
  return hours;
}
//pobieranie sali kinowej 
async function getHallByID(hall_id) {
  let hall;
  hall = await Hall.find({
    hall_id: hall_id
  })
  return hall;
}
app.get("/api/GetHours/d/:date", (req, res) => {
  const hours = getHoursByDate(req.params.date).then(function (value) {
    // console.log(value);
    res.send(value)
  })
})
app.get("/api/GetHours/m/:movie_id?", (req, res) => {
  const hours = getHoursByMid(req.params.movie_id).then(
    function (value) {
      // console.log(value);
      res.send(value);
    }
  )
});
//pobieranie sali dla wybranego filmu i godziny 
app.get("/api/GetHall/:hall_id", (req, res) => {
  const hall = getHallByID(req.params.hall_id).then(function (value) {
    res.send(value);
    console.log(value)
  })

})
//Dodawanie Filmu do bazy 
async function createMovie(_title, _overview, _id, _poster_path) {
  const movie = new Movie({
    title: _title,
    overview: _overview,
    id: _id,
    poster_path: _poster_path,
  })
  const result = await movie.save()
}
// createMovie('Tenet','Armed with only one word - Tenet - and fighting for the survival of the entire world, the Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.',577922,"/k68nPLbIST6NP96JmTxmZijEvCA.jpg");
// createMovie("Rogue","Battle-hardened O’Hara leads a lively mercenary team of soldiers on a daring mission: rescue hostages from their captors in remote Africa. But as the mission goes awry and the team is stranded, O’Hara’s squad must face a bloody, brutal encounter with a gang of rebels.",718444, "/uOw5JD8IlD546feZ6oxbIjvN66P.jpg")
// createMovie("Ava","A black ops assassin is forced to fight for her own survival after a job goes dangerously wrong.",539885,"/A3z0KMLIEGL22mVrgaV7KDxKRmT.jpg")

//Dodawanie Godzin do bazy 
async function createHours(_movieid, _info, _date, _hall_ids) {
  const hour = new Hour({
    movie_id: _movieid,
    hours_HallInfo: _info,
    date: _date,
  })

  const result = await hour.save()
}
var z = "8.09.2020"
// createHours(577922, [{
//   hour: '12:00',
//   hall_id: 111,
//   booked_seats:[]
// }, {
//   hour: '15:00',
//   hall_id: 112,
//   booked_seats:[]
// }, {
//   hour: '22:00',
//   hall_id: 113,
//   booked_seats:[]

// }], z)

// createHours(718444, [{
//   hour: '13:00',
//   hall_id: 221,
//   booked_seats:[]
// }, {
//   hour: '15:00',
//   hall_id: 222,
//   booked_seats:[]
// }, {
//   hour: '22:00',
//   hall_id: 223,
//   booked_seats:[]
// }], z)

// createHours(539885, [{
//   hour: '10:00',
//   hall_id: 331,
//   booked_seats:[]
// }, {
//   hour: '16:00',
//   hall_id: 332,
//   booked_seats:[]
// }, {
//   hour: '23:00',
//   hall_id: 333,
//   booked_seats:[]
// }], z)

//Dodawanie sali do bazy 
async function createHall(_hall_id, _hall_number) {
  let available_seats;
  switch(_hall_number){
    case 1: available_seats=50; break;
    case 2: available_seats=70; break;
    case 3: available_seats=100; break;

  }
  const hall = new Hall({
    hall_id: _hall_id,
    hall_number: _hall_number,
    number_of_seats:available_seats
  })

  const result = await hall.save()
}
// createHall(111,1)
// createHall(112,1)
// createHall(113,1)

// createHall(221,2)
// createHall(222, 2)
// createHall(223,2)

// createHall(331,3)
// createHall(332,3)
// createHall(334,3)

//PORT 
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))