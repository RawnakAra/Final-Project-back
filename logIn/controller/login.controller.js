const user = require('../models/login.model')
const bcrypt = require('bcryptjs')

const getAllUsers = (req,res)=>{
    user.find({},(err , data)=>{
        if(err) 
        return res.status(404).send(err.message)
        return res. status(200).send(data)
    })
}

const register =async (req,res)=>{
    console.log('1')
   const newUser = new user(req.body)
   console.log(newUser)
   try{
    console.log('3')
       await newUser.save()
       console.log('4')
       const token = await newUser.generateAuthToken()
       console.log('5')
       res.status(200).send({newUser ,token})
       console.log('6')
   }catch(e){
    console.log('7')
       res.status(500).send(e.message)
       console.log('8')
   }
}

const logIn =async (req,res)=>{
  try{
      const userlog = await user.findByCredentials(req.body.email,req.body.password);
      const token = await userlog.generateAuthToken();
      res.status(200).json({userlog  ,token})
  }catch(e){
      res.status(404).send(e.message)
  }
}

const logOut =async (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        console.log("req",req.user)
     await req.user.save()
     res.status(200).send('logout')
    }catch(e){
        res.status(404).send(e.message)
    }
}

const logOutAll = async(req,res)=>{
   try{
       req.user.tokens = []
       await req.user.save()
       res.status(200).send()
   }catch(e){
     res.status(500).send(e.message)
   }
}

const deleteUser = async(req,res)=>{
    const id = req.user._id
    user.findByIdAndDelete(id,(err ,data)=>{
        if(err) return res.status(400).send(err.message)
        return res.status(200).send(data)  
    })
}

const deleteUserByAdmin = async(req,res)=>{
   const {id} = req.params
   user.findByIdAndDelete(id , (err ,data)=>{
    if(err) return res.status(400).send(err.message)
    return res.status(200).send(data)  
   })  
}

const toUpdate = async (req,res)=>{
    const id = req.user._id
    if(req.body.password !== undefined){
        req.body.password = await bcrypt.hash(req.body.password , 8)
    }
    user.findByIdAndUpdate(id , req.body , {new:true,runValidators:true},(err , data)=>{
       if(err) return res.status(404).send(err.message)
        return res.status(200).send(data)
    })
}

module.exports = {
    getAllUsers,
    register,
    logIn,
    logOut,
    logOutAll,
    deleteUser,
    deleteUserByAdmin,
    toUpdate
}