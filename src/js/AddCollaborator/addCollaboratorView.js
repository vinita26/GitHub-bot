import { addCollaboratorController} from './addCollaboratorController';

export function addCollaboratorWidget(data){
    
    let arrayData = data.split(' ');
    let RepoName = arrayData[0];
    var CollaboratorName = arrayData[1];

    var body = document.querySelector('body');    
    let div1 = document.createElement('div');
    div1.id= 'editIssue';
    body.append(div1);

    var editIssueHTML = `
    <div class="container my-3 mx-auto border border-info rounded" id="repoWidget">
    <h3>Add Collaborator:</h3>
    <div class="row p-3">
        <form method="post" action="#" class="w-75 text-center">
            <div class="form-group row">
                <label for="repoName" class="col-sm-3 col-form-label">Repo Name:*</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="repoName" value='${RepoName}'>
                </div>
            </div>
            <div class="form-group row">
                <label for="collaboratorName" class="col-sm-3 col-form-label">CollaboratorId:*</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="repoDesc" value='${CollaboratorName}'>
                </div>
            </div>
            <div>
                <button type="button" class="btn btn-primary" id="addCollaborator-${CollaboratorName}">Add Collaborator</button>
                <button type="button" class="btn btn-danger cancelWidget" id="cancelAddCollWidget-${CollaboratorName}">Cancel</button>
            </div>
        </form>
    </div>
</div>`;

    div1.innerHTML = editIssueHTML;

    let addCollaboratorButtonName = 'addCollaborator-' + CollaboratorName;
    document.getElementById(addCollaboratorButtonName).addEventListener('click',addCollaboratorController.bind(null,data));

    function addCollaboratorFunction(){
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


    let cancelAddCollButtonName = 'cancelAddCollWidget-' + CollaboratorName;

    document.getElementById(cancelAddCollButtonName).addEventListener('click',closeRepoWidget);
    function closeRepoWidget(){
        div1.innerHTML = null;
    }
}