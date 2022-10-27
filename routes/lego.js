const express = require('express')
const LegoModel = require('../models/LegoModel')
const router = express.Router()


router.get('/drop', (req, res) => {
    LegoModel.deleteMany({}, () => {
        console.log("Delete all data succeed !")
        res.redirect('/lego')
    })
})



//URL: localhost:3000/student
router.get('/', (req, res) => {
    LegoModel.find((err, data) => {
        if (!err) {
            //res.send(data)
            //render ra trang index ở thư mục views/student
            res.render('lego/index', { lego: data })
        }
    })
})



router.get('/list', (req, res) => {
    LegoModel.find((err, data) => {
        if (!err) {
            res.render('lego/list', { lego: data, })
        }
    })
})


router.get('/delete/:id', (req, res) => {
    LegoModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete student succeed !");
            //var message = "Delete student succeed !";
            //redirect về trang /student (URL không phải view)
            res.redirect("/lego");
        }
    })
})

//render ra form ADD
router.get('/add', (req, res) => {
    res.render("lego/new");
})

//nhận & xử lý dữ liệu từ form ADD
router.post('/add', (req, res) => {
    //Cách 1: dùng "save"
    // var student = new LegoModel(req.body)
    // student.save((err) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log("Add student succeed !")
    //         res.redirect("/student")
    //     }
    // })
    //Cách 2: dùng "create"
    LegoModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add student succeed !')
            res.redirect("/lego")
        }
    })
})

//render ra form EDIT
router.get('/edit/:id', (req, res) => {
    LegoModel.findById(req.params.id, (err, data) => {
        if (!err) {
            //render ra file: update.hbs (trong thư mục views/student)
            //gửi kèm dữ liệu của object student để load vào form edit
            //student (tên) , data (dữ liệu)
            res.render("lego/update", { lego: data })
        }
    })
})

//nhận & xử lý dữ liệu từ form EDIT
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var lego = req.body;
    LegoModel.findByIdAndUpdate(id, lego, (err) => {
        if (!err) {
            console.log("Update student succeed !")
            res.redirect("/lego")
        }
    })
})

router.get('/detail/:id', (req, res) => {
    LegoModel.findById(req.params.id, (err, lego) => {
        if (!err) {
            res.render('lego/info', { lego: lego })
        }
    })
})





module.exports = router