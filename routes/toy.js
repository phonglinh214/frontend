const express = require('express')
const ToyModel = require('../models/ToyModel')
const router = express.Router()


router.get('/drop', (req, res) => {
    ToyModel.deleteMany({}, () => {
        console.log("Delete all data succeed !")
        res.redirect('/toy')
    })
})



//URL: localhost:3000/student
router.get('/', (req, res) => {
    ToyModel.find((err, data) => {
        if (!err) {
            //res.send(data)
            //render ra trang index ở thư mục views/student
            res.render('toy/index', { toy: data })
        }
    })
})



router.get('/list', (req, res) => {
    ToyModel.find((err, data) => {
        if (!err) {
            res.render('toy/list', { toy: data, })
        }
    })
})


router.get('/delete/:id', (req, res) => {
    ToyModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete student succeed !");
            //var message = "Delete student succeed !";
            //redirect về trang /student (URL không phải view)
            res.redirect("/toy");
        }
    })
})

//render ra form ADD
router.get('/add', (req, res) => {
    res.render("toy/new");
})

//nhận & xử lý dữ liệu từ form ADD
router.post('/add', (req, res) => {
    //Cách 1: dùng "save"
    // var student = new ToyModel(req.body)
    // student.save((err) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log("Add student succeed !")
    //         res.redirect("/student")
    //     }
    // })
    //Cách 2: dùng "create"
    ToyModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add student succeed !')
            res.redirect("/toy")
        }
    })
})

//render ra form EDIT
router.get('/edit/:id', (req, res) => {
    ToyModel.findById(req.params.id, (err, data) => {
        if (!err) {
            //render ra file: update.hbs (trong thư mục views/student)
            //gửi kèm dữ liệu của object student để load vào form edit
            //student (tên) , data (dữ liệu)
            res.render("toy/update", { toy: data })
        }
    })
})

//nhận & xử lý dữ liệu từ form EDIT
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var toy = req.body;
    ToyModel.findByIdAndUpdate(id, toy, (err) => {
        if (!err) {
            console.log("Update student succeed !")
            res.redirect("/toy")
        }
    })
})

router.get('/detail/:id', (req, res) => {
    ToyModel.findById(req.params.id, (err, toy) => {
        if (!err) {
            res.render('toy/info', { toy: toy })
        }
    })
})





module.exports = router