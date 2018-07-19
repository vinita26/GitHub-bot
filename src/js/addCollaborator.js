export default class AddCollaborators{

    addCollaboratorWidget(data){
        console.log("inside addCollaboratorWidget, data value:"+data);

        var arrayData = data.split(' ');
        var RepoName = arrayData[0];
        console.log("reponame: ",RepoName);

        var CollaboratorName = arrayData[1];
        console.log("CollaboratorName: ",CollaboratorName);

        var body = document.querySelector('body');    
        let div1 = document.createElement('div');
        div1.id= "editIssue";
        body.append(div1);

        var editIssueHTML = '<div class="container my-3 mx-auto border border-info rounded" id="issueWidget"><h3>Add Collaborator: </h3><div class="row p-3"> <form method="post" action="#" class="w-75 text-center"> <div class="form-group row"><label for="repoName" class="col-sm-3 col-form-label">Repository Name:*</label><div class="col-sm-9"><input type="text" class="form-control" id="RepoName" value='+RepoName+'></div> </div><div class="form-group row"> <label for="issueTitle" class="col-sm-3 col-form-label">CollaboratorId:*</label><div class="col-sm-9"> <input type="text" class="form-control" id="issueTitle" value='+CollaboratorName+'> </div> </div> <div><button type="button" class="btn btn-primary" id="addCollaborator">Add Collaborator</button> <button type="button" class="btn btn-danger cancelWidget" id="cancelEditIssueWidget">Cancel</button> </div> </form> </div> </div></div>';

        div1.innerHTML = editIssueHTML;

        document.getElementById("addCollaborator").addEventListener("click",addCollaboratorFunction.bind(null,data));

        var successAlertDiv = document.createElement('div');
        successAlertDiv.innerHTML = '<div class="alert alert-success" role="alert"> added collaborator         </div>';

        var failedAlertDiv = document.createElement('div');
        failedAlertDiv.innerHTML = '<div class="alert alert-danger" role="alert"> Error: '+response.status+ ' collaborator is not added  </div>';

        function addCollaboratorFunction(){
            const issueUri = 'https://api.github.com/repos/vinita26/' + RepoName + '/collaborators/'+CollaboratorName;
            console.log("issueUri", issueUri);
            fetch(issueUri, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 243e8ea575e546923c0024d16ee28630cd0f8d4d"
            }
        }).then(response => {
            if(response.status=='201' || response.status=='200'){
                body.appendChild(successAlertDiv);
            }
            else{
                body.appendChild(failedAlertDiv);
            }
        })
        .catch(error => console.error("ERROR::", error));
      }

        document.getElementById("cancelEditIssueWidget").addEventListener("click",closeRepoWidget);
        function closeRepoWidget(){
            div1.innerHTML = null;
        }
    }
}