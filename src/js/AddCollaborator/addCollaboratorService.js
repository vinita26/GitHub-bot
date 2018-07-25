export function addCollaboratorFunction(data){
    const gitHubAuthentication = 'Bearer 8c02c2d99549cc41b7c58921fad6d86b174f4566';

    let arrayData = data.split(' ');
    let RepoName = arrayData[0];
    var CollaboratorName = arrayData[1];

    var body = document.querySelector('body');

    var successAlertDiv = document.createElement('div');
    successAlertDiv.innerHTML = '<div class="alert alert-success" role="alert"> added collaborator         </div>';

    var failedAlertDiv = document.createElement('div');
    failedAlertDiv.innerHTML = '<div class="alert alert-danger" role="alert"> Error: collaborator is not added  </div>';

    const issueUri = 'https://api.github.com/repos/vinita26/' + RepoName + '/collaborators/'+CollaboratorName;
    
    fetch(issueUri, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': gitHubAuthentication
    }
}).then(response => {
    if(response.status=='201' || response.status=='200'){
        body.appendChild(successAlertDiv);
    }
    else{
        body.appendChild(failedAlertDiv);
    }
})
.catch(error => window.confirm('ERROR::', error));
}