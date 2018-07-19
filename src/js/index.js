import 'jquery';
import 'popper.js';
import 'bootstrap';
import '../css/styles.css';

// const recastVal = require('./recast-ai.js');
import RecastApi from "./recast-ai";
let recast = new RecastApi();

document.getElementById("searchbox").addEventListener('keydown',callRecast);
document.getElementById("submitQuery").addEventListener("click",callRecast);
var query = document.getElementById("searchbox").value;

function callRecast(){   

    recast.getBotValue()
            .then(function(data){
                console.log(data);
                
            }).catch(function(error) {
                console.log('There has been a problem with your create repository operation: ', error.message);
                window.confirm("Error While Creating Respository");
            });
}
