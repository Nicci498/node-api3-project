const express = require('express');
const Data = require('./userDb.js');
const PostData = require('../posts/postDb.js')
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  Data.insert(req.body)
  .then(data =>{
    res.status(201).json(data)
  })
  .catch(err =>{
    res.status(500).json({message:"Failed to create user"})
  })
}); //working

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  //const comment = {...req.body, post_id: id};
const { id } = req.params;
const thing = {...req.body, user_id: id} 
  PostData.insert(thing)
  .then(data =>{
    res.status(201).json(data)
  })
  .catch(err =>{
    console.log(err)
    res.status(500).json({message:'Failed to create post'})
  })
}); //working 

router.get('/', (req, res) => {
  Data.get()
  .then(data =>{
    res.status(200).json(data)
  })
  .catch(err =>{
    res.status(500).json({errorMessage:'Could not get posts'})
  })
});//working

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});//working

router.get('/:id/posts', validateUserId, (req, res) => {
  Data.getUserPosts(req.user.id)
  .then(data =>{
   res.status(200).json(data)
  })
  .catch(err =>{
    res.status(500).json({message:'Failed to get posts'})
  })
});//working

router.delete('/:id', validateUserId, (req, res) => {
  Data.remove(req.params.id)
  .then(data =>{
    res.status(200).json({message:'Delete successful'})
  })
  .catch(err =>{
    res.status(500).json({errorMessage:'You cant delete either'})
  })
});//says success, but doesnt delete

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
});

//custom middleware


//validates the user id on every request that expects a user id parameter
function validateUserId(req, res, next) {
const { id } = req.params;
Data.getById(id)
.then(user =>{
  console.log(user)
  if(user){   
    req.user = user;
    console.log(req.user) //console logs the id and name of user

    next();
   
  } else{
  res.status(400).json({ message: "invalid user id"}) //this one works
  }
})
.catch(err =>{
  res.status(500).json({errorMessage:'couldnt get user'})
})
// if the id parameter is valid, store that user object as req.user
// if the id parameter does not match any user id in the database, cancel the request and respond with status 400 and { message: "invalid user id" }

}

function validateUser(req, res, next) {
  // do your magic!
  if(!req.body){
    res.status(400).json({ message: "missing user data" });
  } else if(!req.body.name) {
    res.status(400).json({message:"missing required name field"});
  } else{
    next()
  }

}

function validatePost(req, res, next) {
  if(req.body.length === 0){
    res.status(400).json({message:'missing post data'})
  } else if(!req.body.text){
    res.status(400).json({message:'missing required text field'})
  } else{
    next();
  }
}

module.exports = router;
