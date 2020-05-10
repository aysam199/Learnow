const app = module.exports = require ('express')();

const {morgan,helmet,bodyParser,cors} = require ('./middlewares/standard');
const {notFound,errorHandler} = require('./middlewares/middlewares');

const coursesRouter = require('./routes/courses');
const usersRouter = require ('./routes/users');
const groupsRouter = require('./routes/groups');
const messagesRouter = require('./routes/messages');
require ('dotenv').config();

var whitelist = ['http://localhost:3000', 'https://learnow.netlify.com','http://localhost:5000'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.options('*', cors());

app.use(morgan('common'));

app.use(helmet());

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use('/getcourses',coursesRouter);

app.use('/users',usersRouter);

app.use('/groups',groupsRouter);

app.use('/messages',messagesRouter);


app.get('/', (req, res) => {
  res.send('Welcome home');
});


app.use(notFound);
app.use(errorHandler);

app.all('*',(req,res)=>{
  res.status(404).send({message:'Are you even more lost? not found 404'});
});