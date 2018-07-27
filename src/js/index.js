import 'jquery';
import 'popper.js';
import 'bootstrap';
import '../css/styles.css';
import {store} from './state';
import { createRepoWidget } from "./CreateRepo/createRepoView";

import RecastApi from './recast-ai';
let recast = new RecastApi();


document.getElementById('submitQuery').addEventListener('click',checkForEmpty);
document.getElementById('submitQuery').addEventListener('click',callRecast);
document.getElementById('submitQuery').addEventListener('click',clearQueryText);

window.onload=refreshedPage();

function refreshedPage(){
    let localvalue = JSON.parse(window.localStorage.getItem('States'));
    console.log('state:', localvalue);
    if(localvalue){

        for(let obj of localvalue.items){
            for(let key in obj){
                console.log("Key value" , key);
                if(key=='createRepo'){
                    console.log('repo indent found');
                    console.log('length:',key.length);
                    // for(let prop of key){
                        // if(prop == 'Reponame'){
                           // console.log("prop", prop);
                           // createRepoWidget(RepoName);
                       // }
                   // }
                    
                }
            }
        }
    }
    
}

function callRecast(){   

    recast.getBotValue()
        .then(function(data){
                // window.confirm(data);
            }).catch(function(error) {
                window.confirm('Error While Executing the given command', error);
            });
}

function checkForEmpty(){
    const queryCommand = document.getElementById('searchbox').value;  
    if(queryCommand==""){
        window.confirm("Please enter your query in query box");
    }
   }

function clearQueryText(){
    document.getElementById('searchbox').value="";
}