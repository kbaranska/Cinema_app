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
      // console.log(value);
      res.send(value);
    }
  )
  // console.log(req);
  // console.log(res.data);
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
//pobieranie zajetych miejsc
async function getBookedSeats(movie_id,date,hour)
{
  let seats;
  let seat2return;
  seats=await Hour.find({movie_id:movie_id,date:date});
  seats[0].hours_HallInfo.map(h=>h.hour===hour?seat2return=h.booked_seats:undefined);
  return seat2return;
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
//pobieranie zajętych miejsc
app.get('/api/GetHour/bs',(req,res)=>{
  //req.query.hour => params!!
  const booked_seats=getBookedSeats(req.query.movie_id,req.query.date,req.query.hour).then(function(value){
    res.send(value)
  })
})

//pobieranie zajętych miejsc
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
// createMovie("Harry Potter and Philosopher's Stone",'An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.',11111,"https://images-na.ssl-images-amazon.com/images/I/713KEd-8jyL._AC_SL1500_.jpg")
// createMovie("Harry Potter and the Chamber of Secrets",'An ancient prophecy seems to be coming true when a mysterious presence begins stalking the corridors of a school of magic and leaving its victims paralyzed.',11112,"https://i.pinimg.com/originals/fa/a5/49/faa549bf766a7128c479f3e6bdddd00f.jpg");
// createMovie("Harry Potter and the Prisoner of Azkaban",'Harry Potter, Ron and Hermione return to Hogwarts School of Witchcraft and Wizardry for their third year of study, where they delve into the mystery surrounding an escaped prisoner who poses a dangerous threat to the young wizard.',11113,"https://images-na.ssl-images-amazon.com/images/I/71LhuS46M-L._AC_SY679_.jpg")
// createMovie("Harry Potter and the Goblet of Fire","Harry Potter finds himself competing in a hazardous tournament between rival schools of magic, but he is distracted by recurring nightmares.",11114,"https://images-na.ssl-images-amazon.com/images/I/51pFF7a2j%2BL._AC_.jpg");
// createMovie("Harry Potter and the Order of the Phoenix", "With their warning about Lord Voldemort's (Ralph Fiennes') return scoffed at, Harry (Daniel Radcliffe) and Dumbledore (Sir Michael Gambon) are targeted by the Wizard authorities as an authoritarian bureaucrat slowly seizes power at Hogwarts.",11115,"https://m.media-amazon.com/images/M/MV5BMTM0NTczMTUzOV5BMl5BanBnXkFtZTYwMzIxNTg3._V1_.jpg");
// createMovie("Harry Potter and the Half-Blood Prince","As Harry Potter (Daniel Radcliffe) begins his sixth year at Hogwarts, he discovers an old book marked as 'the property of the Half-Blood Prince' and begins to learn more about Lord Voldemort's (Ralph Fiennes') dark past",11116,"https://images-na.ssl-images-amazon.com/images/I/51aXA-F6lSL._AC_.jpg")
// createMovie("Harry Potter and the Deathly Hallows – Part 1","As Harry (Daniel Radcliffe), Ron (Rupert Grint), and Hermione (Emma Watson) race against time and evil to destroy the Horcruxes, they uncover the existence of the three most powerful objects in the wizarding world: the Deathly Hallows.",11117,"https://images-na.ssl-images-amazon.com/images/I/71T7tbAYKrL._AC_SL1333_.jpg")
// createMovie("Harry Potter and the Deathly Hallows – Part 2 ","Harry, Ron, and Hermione search for Voldemort's remaining Horcruxes in their effort to destroy the Dark Lord as the final battle rages on at Hogwarts.",11118,"https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_UX182_CR0,0,182,268_AL_.jpg")

//Dodawanie Godzin do bazy 
async function createHours(_movieid, _info, _date, _hall_ids) {
  const hour = new Hour({
    movie_id: _movieid,
    hours_HallInfo: _info,
    date: _date,
  })

  const result = await hour.save()
}

app.post("/api/seedDatabase", (req, res) => {
  // const hall = getHallByID(req.params.hall_id).then(function (value) {
  //   res.send(value);
  //   console.log(value)
  // })
  var z = "10.10.2020"
   createHours(11111, [{
    hour: '12:00',
    hall_id: 111,
    booked_seats:[]
  }, {
    hour: '15:00',
    hall_id: 112,
    booked_seats:[]
  }, {
    hour: '22:00',
    hall_id: 113,
    booked_seats:[]
  
  }], z)
  
  createHours(11112, [{
    hour: '13:00',
    hall_id: 221,
    booked_seats:[]
  }, {
    hour: '15:00',
    hall_id: 222,
    booked_seats:[]
  }, {
    hour: '22:00',
    hall_id: 223,
    booked_seats:[]
  }], z)
  
  createHours(11113, [{
    hour: '10:00',
    hall_id: 331,
    booked_seats:[]
  }, {
    hour: '16:00',
    hall_id: 332,
    booked_seats:[]
  }, {
    hour: '23:00',
    hall_id: 333,
    booked_seats:[]
  }], z)
  
res.send('OK');
})

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