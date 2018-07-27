import {store} from '../state';
import {gitHubAuthentication} from '../recast-ai';

export function createRepoConfirmFunction(data){
    
    console.log("Store value:", store);

let widgets = document.getElementById('widgets');   
const successAlertDiv = document.createElement('div');
successAlertDiv.innerHTML = '<div class="alert alert-success" role="alert"> Created repo '+data+' successfully  </div>';

const failedAlertDiv = document.createElement('div');
failedAlertDiv.innerHTML = '<div class="alert alert-danger" role="alert"> Error, Repo '+data+' not created</div>';
        
    fetch('https://api.github.com/user/repos', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': gitHubAuthentication
    },
    body: JSON.stringify({'name': data})
}).then(response => {
    if(response.status=='201' || response.status=='200'){
        widgets.prepend(successAlertDiv);
        let storeState = store.getState();
        let objectItems = storeState.items;
        for(let obj of objectItems){
            if(obj.createRepo.Reponame==data){
                obj.response = response;
            }
        }
    }
    else{
        widgets.prepend(failedAlertDiv);
        let storeState = store.getState();
        let objectItems = storeState.items;
        for(let obj of objectItems){
            if(obj.createRepo.Reponame==data){
                obj.response = response;
            }
        }
    }
})
.catch(error => console.error('ERROR::', error));
}

export function createRepoCancelFunction(){ 
    document.getElementById(successAlertDiv).innerHTML = null;
    failedAlertDiv.innerHTML = null;

}