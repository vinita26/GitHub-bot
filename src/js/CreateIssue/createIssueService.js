export function createIssueFunction(data){

    const arrayData = data.split(' ');
    const RepoName = arrayData[0];

    const IssueName = arrayData[1];
    const gitHubAuthentication = 'Bearer 8c02c2d99549cc41b7c58921fad6d86b174f4566';

    let body = document.querySelector('body'); 

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
        body.appendChild(successAlertDiv);
    }
    else{
        body.appendChild(failedAlertDiv);
    }
})
.catch(error => window.confirm("ERROR::", error));
}