import {gitHubAuthentication} from '../recast-ai';
import {store} from '../state';

export function editIssueFunction(data){
    
    let arrayData = data.split(' ');
    let RepoName = arrayData[0];
    let IssueId = arrayData[1];

    let body = document.querySelector('body'); 

    const successAlertDiv = document.createElement('div');
    successAlertDiv.innerHTML = '<div class="alert alert-success" role="alert"> Issue '+IssueId+' closed successfully          </div>';

    const failedAlertDiv = document.createElement('div');
    failedAlertDiv.innerHTML = '<div class="alert alert-danger" role="alert"> Error: Issue is not closed  </div>';

    const issueUri = 'https://api.github.com/repos/vinita26/' + RepoName + '/issues/'+IssueId;
    
    fetch(issueUri, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': gitHubAuthentication
    },
    body: JSON.stringify({
        'number': IssueId,
        'state': 'closed'
      })
}).then(response => {
    if(response.status=='201' || response.status=='200'){
        body.appendChild(successAlertDiv);
        store.dispatch({type: 'EDIT_ISSUE_CLICKED', item: 'EDIT_ISSUE_CLICKED' + ' ' +data});
    }
    else{
        body.appendChild(failedAlertDiv);
        store.dispatch({type: 'EDIT_ISSUE_CLICKED', item: 'EDIT_ISSUE_CLICKED' + ' ' +data});
    }
})
.catch(error => window.confirm('ERROR:', error));
}
