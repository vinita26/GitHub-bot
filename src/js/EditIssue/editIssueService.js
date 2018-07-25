export function editIssueFunction(data){

    let arrayData = data.split(' ');
    let RepoName = arrayData[0];
    let IssueId = arrayData[1];

    let body = document.querySelector('body'); 

    const successAlertDiv = document.createElement('div');
    successAlertDiv.innerHTML = '<div class="alert alert-success" role="alert"> Issue closed successfully          </div>';

    const failedAlertDiv = document.createElement('div');
    failedAlertDiv.innerHTML = '<div class="alert alert-danger" role="alert"> Error: Issue is not closed  </div>';

    const gitHubAuthentication = 'Bearer 8c02c2d99549cc41b7c58921fad6d86b174f4566';

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
    }
    else{
        body.appendChild(failedAlertDiv);
    }
})
.catch(error => window.confirm('ERROR:', error));
}
