import 'jquery';
import 'popper.js';
import 'bootstrap';
import '../css/styles.css';
import {store} from './state';

import RecastApi from './recast-ai';
let recast = new RecastApi();

document.getElementById('submitQuery').addEventListener('click',triggerSearchAction);
document.getElementById('submitQuery').addEventListener('click',callRecast);
document.getElementById('submitQuery').addEventListener('click',clearQueryText);



function callRecast(){   

    recast.getBotValue()
        .then(function(data){
                // window.confirm(data);
            }).catch(function(error) {
                window.confirm('Error While Executing the given command', error);
            });
}

function triggerSearchAction(){
    const queryCommand = document.getElementById('searchbox').value;  
    if(queryCommand==""){
        window.confirm("Please enter your query in query box");
    }
    else{
        store.dispatch({type: 'SEARCHED_ITEM_CLICKED', item: 'SEARCHED_ITEM_CLICKED' + ' ' +queryCommand});
    }
   }

function clearQueryText(){
    document.getElementById('searchbox').value="";
}