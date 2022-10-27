var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var toyRouter = require('./routes/toy')
var legoRouter = require('./routes/lego')
//var customerRouter = require('./routes/customer')


//Lỗi cors là một chính sách của trình duyệt nhằm ngăn chặn việc truy cập tài nguyên của các domain khác khi không được phép
var cors = require('cors')

var mongoose = require('mongoose')
var url =
    "mongodb+srv://phonglinh214:nhatkop235@cluster0.0g3x0jm.mongodb.net/asm"
    
    //'mongodb://localhost:27017/asm'


mongoose.connect(url, { useNewUrlParser: true }, err => {
    if (!err) {
        console.log('DB connect succeed !')
    } else {
        console.error(err)
    }
})

var hbs = require('hbs')
hbs.registerHelper('dateFormat', require('handlebars-dateformat'))
hbs.registerHelper('equal', require('handlebars-helper-equal'))

var app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/toy', toyRouter)
app.use("/lego", legoRouter)
//app.use('/customer', customerRouter)


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

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server is running at: http://localhost:3000')
})

module.exports = app