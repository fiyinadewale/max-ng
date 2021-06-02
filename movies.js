const { json } = require('body-parser');
const requestIp = require('request-ip');
const connection = require('./connect');
const func = require('./functions')
const axios = require('axios');
var express = require('express');
var request = require('request');
var router = express.Router();
//Routes will go here

// route to get list of movies
router.get('/', function(req, res){
   
   var movies = [];
   var options = {
     'method': 'GET',
     'url': 'https://swapi.dev/api/films/',
     'headers': {
     }
   };
   request(options, async function (error, response) {
     if (error) throw new Error(error);
         var data = JSON.parse(response.body);
         var movs = data.results;
         for(var i=0; i<movs.length; i++){
            let query =  'SELECT COUNT(id) as num FROM comments WHERE episode_id='+movs[i]['episode_id'];
            var num_comments = await connection.query(query);
            var temp = {id:movs[i]['episode_id'], title:movs[i]['title'], opening_crawl:movs[i]['opening_crawl'], number_of_comments:num_comments['rows']['0']['num']};
            movies.push(temp);
         } 
         res.json(movies)
      });
});



// route to add comment for a movie
router.get('/comment', function(req, res){
   if(!req.query.id || !req.query.comment){
      res.status(400).json({message: "Bad Request"});
   } else {
      if(req.query.comment.length <= 500){
         var ip = requestIp.getClientIp(req); 
         var temp_date = new Date();
         var newdatetime = temp_date.toUTCString();
         connection.query('INSERT INTO comments(episode_id, body, ip_address, comment_time) VALUES ($1, $2, $3, $4)', [req.query.id, req.query.comment, ip, newdatetime], (error, results) => {
            if (error) {
              throw error
            }
            res.json({message: "New Comment Added"});
         })
         
      }else{
         res.status(400).json({message: "Comment too large"});
      } 
   }
});

//get all comments for a movie
router.get('/comments/:id([0-9]*)', function (req, res) {
   var id = req.params.id;
   let query = "SELECT * FROM comments WHERE episode_id="+id+" ORDER BY comment_time DESC";
   connection.query(query, function (error, comments, fields) {
      if (error) throw error;
      if(comments['rows'].length > 0){
         res.json(comments['rows']);
      }else{
         res.status(404).json({message:'Not found'});
      }
   });    
});

//get all comments
router.get('/comments', function (req, res) {
   let query = "SELECT * FROM comments ORDER BY comment_time DESC";
   connection.query(query, function (error, comments, fields) {
      if (error) throw error;
      if(comments['rows'].length > 0){
         res.json(comments['rows']);
      }else{
         res.status(404).json({message:'Not found'});
         
      }
      
   });    
});



router.get('/character/', async function (req, res) {
   var allcharacters = [];
   var sort = (req.query.sort) ? req.query.sort:'name'; // default name others:height
   var order = (req.query.order) ? req.query.order:'asc'; // default asc others desc
   
   
   var id = req.query.id;
   var total_characters = 0;
   var total_height = 0;
   var config = {
      method: 'get',
      url: 'https://swapi.dev/api/films/'+id,
      headers: { }
   };
   const characters = (await axios(config)).data.characters;
   for(var i =0; i < characters.length; i++){
      var temp = characters[i];
      var info = await func.get_character_info(temp);
      var temp_array = {name:info.name.toLowerCase(), gender:info.gender, height:info.height};
      allcharacters.push(temp_array);
    }
    var finalarray = [];
    //filter by gender
    if(req.query.gender){
      finalarray = func.filterByGender(allcharacters, req.query.gender);
    }else{
      finalarray = allcharacters;
    }

    //sort by name or height
    if(sort == "name" && order =='asc' ){
      finalarray.sort(function(a, b) {
         return a.name == b.name ? 0 : a.name > b.name ? 1 : -1;
       })
    }else if(sort == "name" && order =='desc'){
      finalarray.sort(function(a, b) {
         return a.name == b.name ? 0 : a.name < b.name ? 1 : -1;
       })
    }else if(sort == "height" && order =='asc' ){
       
      finalarray.sort(function(a, b) {
         return a.height - b.height;
       })
    }else if(sort == "height" && order =='desc'){
      finalarray.sort(function(a, b) {
         return b.height - a.height;
       })
    }
    for(var i = 0; i < finalarray.length; i++){
      total_height+=Number(finalarray[i].height);
    }
    total_characters = finalarray.length;
    
    res.json({
       num_of_characters: total_characters,
       total_height: func.convert_cm_to_ft_in(total_height),
       data: finalarray
    });
});



module.exports = router;

