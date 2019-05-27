const express = require("express")
const uuid = require("uuid")
const router = express.Router()
const members = require("../../Members")

//dapatakan semua data
router.get("/", (req, res) => {
    res.json(members)
})

//dapatkan perdata
router.get("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    }else{
        res.status(400).json({msg: "tidak ada anggota dengan id tersebut"})
    }
})

//buat baru
router.post("/", (req, res) => {
    const newMember = {
        id: uuid.v4(),
        nama: req.body.nama,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.nama || !newMember.email){
        return res.status(400).json({msg: "masukan email dan nama"})
    }
    members.push(newMember)
    res.json(members)
})


//tes untuk update dan delete pake postman 
//update keanggotaan
router.put("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if(found){
        const updateMember = req.body
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.nama = member.nama ? updateMember.nama : member.nama
                member.email = member.email ? updateMember.emai: member.email
                res.json({msg: "berhasi diupdate", member})
            }
        })
    }else{
        res.status(400).json({msg: "tidak ada anggota dengan id tersebut"})
    }
})

//hapus
router.delete("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if(found) {
        res.json({
            msg: "anggota dihapus",
            members: members.filter(member => member.id !== parseInt(req.params.id))
        })
    }else{
        res.status(400).json({msg: "tidak ada nggota dengan id tersebut"})
    }
})

module.exports = router