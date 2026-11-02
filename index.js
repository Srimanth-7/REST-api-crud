const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json())
mongoose.connect("mongodb://localhost:27017/tejavath")
.then(()=>{
    console.log('mongodb connected')
}).catch((err)=>{
    console.log('mongodb not connected**')
}) 

//schema design :
  //user schema
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required:true
    }
})

  //product schema
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    }
})

  //item schema
const itemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type: String,
        required: true 
    }
});


//Model Create
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Item = mongoose.model('Item', itemSchema);

app.post('/signup', async(req,res)=>{
    const user = await User.create(req.body)
    res.send(user)
})

app.get('/users', async(req,res)=>{
    const users = await User.find()
    res.send(users);
})

app.get("/users/:username", async (req,res)=>{
    const user = await User.findOne({
        "username":req.params.username
    })
    res.send(user)
})



app.post('/products', async (req,res)=>{
    const product = await Product.create(req.body)
    res.send(product)
})

app.post('/items', async (req, res)=>{
    const item = await Item.create(req.body)
    res.send(item);
}
)

app.put("/users/:username", async (req,res)=>{
    await User.updateOne(
        {'username': req.params.username},
        req.body
    )
    res.send("password updated")
})

app.put('/products/:name', async (req,res)=>{
    await Product.updateOne(
        {"name":req.params.name},
        req.body
    )
    res.send("category updated sucessfully")
})

app.delete("/users/:username", async(req,res)=>{
    await User.deleteOne({
        "username":req.params.username
    })
    res.send("deleted sucessfully")
})

app.get('/', (req,res)=>{
    res.send('Home Route')
})

app.listen(3000, ()=>{
    console.log('server running succesffully')
})