const axios = require('axios');
async function get_character_info(url){
    var config = {
       method: 'get',
       url: url,
       headers: { }
    };
 
    const result = await axios(config);
    return result.data;        
 }
 
 function convert_cm_to_ft_in(x) {
    var rawfeet = ((x * 0.393700) / 12);
    var feet = Math.floor(rawfeet);
    var inches = Math.round((rawfeet - feet) * 12);
    return feet + " ft and " + inches + ' in';
 }
 function filterByGender(array, value){
    var filtered = [];
    for(var i = 0; i < array.length; i++){
        var arr = array[i];
        if(arr.gender == value){
            filtered.push(arr);
        }
    }    
    return filtered;
 }

 module.exports = {get_character_info, convert_cm_to_ft_in, filterByGender};