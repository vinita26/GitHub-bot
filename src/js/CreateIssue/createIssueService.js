import {gitHubAuthentication} from '../recast-ai';
import {store} from '../state';

export function createIssueFunction(data){

    const arrayData = data.split(' ');
    const RepoName = arrayData[0];

    const IssueName = arrayData[1];
    
    //let body = document.querySelector('body');
    let widgets = document.getElementById('widgets');    

    let successAlertDiv = document.createElement('div');
    successAlertDiv.innerHTML = '<div class="alert alert-success" role="alert"> Created Issue '+IssueName+' successfully in repo '+RepoName+' </div>';

    let failedAlertDiv = document.createElement('div');
    failedAlertDiv.innerHTML = '<div class="alert alert-danger" role="alert"> Error, Issue not created</div>';
    
    const issueUri = 'https://api.github.com/repos/vinita26/' + RepoName + '/issues';
    console.log("issueUri", issueUri);
    fetch(issueUri, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "Authorization": gitHubAuthentication
    },
    body: JSON.stringify({
        "title": IssueName,
        "assignees": [
          "vinita26"
        ]
      })
}).then(response => {
    if(response.status=='201' || response.status=='200'){
        widgets.prepend(successAlertDiv);
        store.dispatch({type: 'CREATE_ISSUE_CLICKED', item: 'CREATE_ISSUE_CLICKED' + ' ' +data});
    }
    else{
        widgets.prepend(failedAlertDiv);
        store.dispatch({type: 'CREATE_ISSUE_CLICKED', item: 'CREATE_ISSUE_CLICKED' + ' ' +data});
    }
})
.catch(error => window.confirm("ERROR::", error));
}