const express = require ("express")
const app = express()
const cors = require("cors")
const pool = require("./db")

//middleware
app.use(cors())
app.use(express.json())

//routes

//create 
app.post("/links", async (req,res) => {
    //await for the function
    try {
        const {name,url} = req.body
        const newlink = await pool.query("INSERT INTO favlinks (name,url) VALUES($1,$2) RETURNING *",
        [name,url])

        res.json(newlink.rows[0])
        
    } catch (err) {
        console.error(err.message)
        
    }
})

//get all links
app.get("/links", async(req,res) => {
    try {
        const alllinks = await pool.query("SELECT * FROM favlinks")
        res.json(alllinks.rows)
        
    } catch (err) {
        console.error(err.message)
        
    }
})


//get a link by id
app.get("/links/:id", async(req,res) => {
    try {
        const {id} = req.params
        const linkid = await pool.query("SELECT * FROM favlinks WHERE id = $1", [id])
        
        res.json(linkid.rows[0])

    } catch (err) {
        console.error(err.message)
        
    }
})

//update
app.put("/links/:id", async (res,req) => {
    try {
        const {id} = req.params
        const updateLinks = await pool.query("UPDATE favlinks SET name = $1, url = $2 WHERE id = $3",
         [req.body.name, req.body.url, id])

         //res.json("Update complete!")

         res.status(200).json(updateLinks.rows)
        
    } catch (err) {
        console.error(err.message)
        
    }
})


//delete
app.delete("/links/:id", async (req,res) => {
    try {
        const {id} = req.params
        const deletelink = await pool.query("DELETE FROM favlinks WHERE id = $1 RETURNING *",[id] )

        res.status(200).json(deletelink.rows)
        
    } catch (err) {
        console.log(err.message)
        
    }
})





app.listen(8000, () => {
    console.log("server has started on port 8000")
})

