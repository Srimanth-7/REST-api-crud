const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/tejavath")
.then(()=>{
    console.log('connected to mongodb')
}).catch((err)=>{
    console.log("error occured")
})

//schema design 
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    }
})

const User = mongoose.model('User', userSchema)
// Signup API
app.post("/signup", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

//sign in API
app.post("/signin", async(req,res)=>{
    const {username,password} = req.body
    const user = await User.findOne({username})

    if(!user){
        return res.send('user not found!')
    }
    if(user.password !== password){
        return res.send('wrong password')
    }

    res.send('login sucessfull')
    
})


app.get("/users", async(req,res)=>{
    const users = await User.find()
    res.send(users)
    
})

app.put("/users/:username", async(req,res)=>{
    await User.updateOne(
        {"username":req.params.username},
        req.body
    )
    res.send("password updated sucssfully")
})

app.get('/users/:username', async(req,res)=>{
    const user = await User.findOne(
        {
            "username": req.params.username
        }
    )
    res.send(user)
})

app.delete("users/:username", async(req,res)=>{
    await User.deleteOne({
        "username": req.params.username
    })
    res.send('user deleted sucessfully')
})

app.listen(3000, ()=>{
    console.log("server running on port number 3000")
})