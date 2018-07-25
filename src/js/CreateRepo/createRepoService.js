import store from '../state';
import {createStore} from 'redux';

export function createRepoConfirmFunction(data){ 

const body = document.querySelector('body');
const successAlertDiv = document.createElement('div');
successAlertDiv.innerHTML = '<div class="alert alert-success" role="alert"> Created repo '+data+' successfully  </div>';

const failedAlertDiv = document.createElement('div');
failedAlertDiv.innerHTML = '<div class="alert alert-danger" role="alert"> Error, Repo not created</div>';

const gitHubAuthentication = 'Bearer 8c02c2d99549cc41b7c58921fad6d86b174f4566';

        
    fetch('https://api.github.com/user/repos', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': gitHubAuthentication
    },
    body: JSON.stringify({'name': data})
}).then(response => {
    if(response.status=='201' || response.status=='200'){
        body.appendChild(successAlertDiv);
        // Trigger Events
        store.dispatch({type: 'CREATE_REPO', item: "repoName"});
    }
    else{
        body.appendChild(failedAlertDiv);
    }
})
.catch(error => console.error('ERROR::', error));
}

export function createRepoCancelFunction(){ 
    document.getElementById(successAlertDiv).innerHTML = null;
    failedAlertDiv.innerHTML = null;

}