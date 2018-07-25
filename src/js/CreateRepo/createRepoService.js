const successAlertDiv = document.createElement('div');
successAlertDiv.innerHTML = '<div class="alert alert-success" role="alert"> Created repo '+data+' successfully  </div>';

const failedAlertDiv = document.createElement('div');
failedAlertDiv.innerHTML = '<div class="alert alert-danger" role="alert"> Error, Repo not created</div>';

const gitHubAuthentication = 'Bearer 45eb8ee4eb30172cd306fa3b92872b642198d2ce';

function createRepoFunction(data){           
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
    }
    else{
        body.appendChild(failedAlertDiv);
    }
})
.catch(error => console.error('ERROR::', error));
}