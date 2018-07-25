import 'jquery';
import 'popper.js';
import 'bootstrap';
import '../css/styles.css';

// const recastVal = require('./recast-ai.js');
import RecastApi from './recast-ai';
let recast = new RecastApi();

document.getElementById('submitQuery').addEventListener('click',callRecast);


function callRecast(){   

    recast.getBotValue()
        .then(function(data){
                // window.confirm(data);
            }).catch(function(error) {
                window.confirm('Error While Creating Respository with error', error);
            });
}
