const path = require('path')
const flash = require('connect-flash')
const logger = require('morgan')
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const passport = require('passport')
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
const expressValidator = require('express-validator')

const MongoStore = require('connect-mongo')(session)

const indexRouter = require('./routes')
const usersRouter = require('./routes/users/users')
const adminRouter = require('./routes/admin/admin')
const cartRouter = require('./routes/cart/cart')
const productsRouter = require('./routes/products/products')

const Category = require('./routes/products/models/Category')

const cartMiddleware = require('./routes/cart/utils/cartMiddleware')

require('dotenv').config()

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(`MongoDB Error: ${err}`))

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))


app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
      url: process.env.MONGODB_URI,
      autoReconnect: true
    }),
    cookie: {
      secure: false,
      maxAge: 365 * 24 * 60 * 60 * 1000
    }
  })
)

app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
require('./lib/passport/passport.js')(passport)

app.use(
  expressValidator({
    errorFormatter: (param, message, value) => {
      const namespace = param.split('.')
      const root = namespace.shift()
      let formParam = root

      while (namespace.length) {
        formParam += '[' + namespace.shift() + ']'
      }

      return {
        param: formParam,
        message: message,
        value: value
      }
    }
  })
)

app.use((req, res, next) => {
  res.locals.user = req.user

  res.locals.errors = req.flash('errors')
  res.locals.success = req.flash('success')
  res.locals.loginMessage = req.flash('loginMessage')
  res.locals.errorValidate = req.flash('errorValidate')

  console.log('res locals', res.locals);
  

  next()
})

app.use((req, res, next) => {
  Category.find({})
    .then(categories => {
      // console.log(`res.locals.categories`, res.locals.categories)
      res.locals.categories = categories
      // console.log(res.locals.categories)
      next()
    })
    .catch(error => next(error))
})

app.use(cartMiddleware)

app.use('/', indexRouter)
app.use('/api/users', usersRouter)
app.use('/api/admin', adminRouter)
app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app