const express = require('express');
const Data = require('./postDb.js');

const router = express.Router();


router.get('/', (req, res) => {
  Data.get()
  .then(data =>{
    res.status(200).json(data)
  })
  .catch(err =>{
    res.status(500).json({errorMessage:'Could not get posts'})
  })
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Data.getById(id)
  .then(data =>{
    if(!data){
      res.status(404).json({message: 'No post with that ID exists'})
    }else {
      res.status(200).json(data)
    }
  })
  .catch(err =>{
    res.status(500).json({errorMessage: 'Could not retrieve post'})
  })
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Data.getById(id)
  .then(post =>{
    if(!post){
      res.status(404).json({message: 'No post with that ID exists'})
    } else{
      Data.remove(id)
      .then(data =>{
        res.status(200).json(data)
      })
      .catch(err =>{
        res.status(500).json({errorMessage: 'Could not remove post'})
      })
    }
  })
  .catch(err =>{
    res.status(500).json({errorMessage: 'Could not retrieve post'})
  })

});

router.put('/:id', (req, res) => {
 const { id } = req.params;
 const { text } = req.body;
 if(!text){
   res.status(404).json({message:'Please include text for your update'})
 }else {
    Data.getById(id)
    .then(post =>{
      if(!post){
        res.status(404).json({message: 'No post with that ID exists'})
      } else {
        Data.update(id, req.body)
        .then()
        .catch()
      }
    })
    .catch(err =>{
      res.status(500).json({errorMessage: 'Could not retrieve post'})
    })
 }

}); //updates, but postman seems to be doing a timeout and i havent done middleware yet NEEDS VALIDATION

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
