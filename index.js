const express = require("express")
const path = require("path")
const exphbs = require("express-handlebars")
const members = require("./Members")
const app = express()

//seting untuk tampilan
app.engine("handlebars", exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//setingan untuk bodyparser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Main homepage berkaitan dengan default index di views
app.get("/", (req, res) => {
    res.render('index', {
        title: "Anggota App",
        members
    })
})

//setting untuk folder statis
app.use(express.static(path.join(__dirname, 'public')))

//settingan untuk API anggota
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server berjalan pada port ${PORT}`)
})