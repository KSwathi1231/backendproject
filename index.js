const express = require("express")
const cors=require("cors")
require('dotenv').config();
const mongoose = require("mongoose")
const app = express()
app.use(express.json());

app.use(cors())

mongoose.connect(String(process.env.MONGO_URI))
.then(()=>console.log("mongodb connected"))
.catch((err)=>console.log("Mongo failed",err))

console.log(process.env.MONGO_URI);
const todoSchema=mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    }
})
const Todo = mongoose.model('Todo',todoSchema);



//create todo
app.post('/',async(req,res)=>{
    //text req.body.text

    console.log(req.body);
    const todo =await new Todo({
        text:req.body.text
    })
    await todo.save();
    res.json(todo);
})


app.delete("/:id",async(req,res)=>{
    await Todo.findByIdAndDelete(req.params.id);
    res.send("Deleted");
})

app.patch("/:id",async(req,res)=>{
    const todo=await Todo.findByIdAndUpdate(req.params.id,{
        completed:req.body.completed
    })
    res.json(todo)
})




// 7777
app.listen(7777,()=>console.log("7777 port"))

app.get('/',async(req,res)=>{
    const todos = await Todo.find();
    res.json(todos);
})