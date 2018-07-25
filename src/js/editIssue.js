export default class EditIssue{

    editIssueWidget(data){

        const gitHubAuthentication = 'Bearer 45eb8ee4eb30172cd306fa3b92872b642198d2ce';
        let arrayData = data.split(' ');

        let RepoName = arrayData[0];
        let IssueId = arrayData[1];

        let body = document.querySelector('body');    
        let div1 = document.createElement('div');
        div1.id= 'editIssue';
        body.append(div1);

        let editIssueHTML = '<div class="container my-3 mx-auto border border-info rounded" id="issueWidget"> <h3>Edit Issue: </h3><div class="row p-3"> <form method="post" action="#" class="w-75 text-center"> <div class="form-group row"><label for="repoName" class="col-sm-3 col-form-label">Repository Name:*</label><div class="col-sm-9"><input type="text" class="form-control" id="RepoName" value='+RepoName+'></div> </div><div class="form-group row"> <label for="issueTitle" class="col-sm-3 col-form-label">Issue Id:*</label><div class="col-sm-9"> <input type="text" class="form-control" id="issueTitle" value='+IssueId+'> </div> </div> <div><button type="button" class="btn btn-primary" id="editIssue">Close Issue</button> <button type="button" class="btn btn-danger cancelWidget" id="cancelEditIssueWidget">Cancel</button> </div> </form> </div> </div></div>';

        div1.innerHTML = editIssueHTML;

        document.getElementById('editIssue').addEventListener('click',editIssueFunction.bind(null,data));

        const successAlertDiv = document.createElement('div');
        successAlertDiv.innerHTML = '<div class="alert alert-success" role="alert"> Issue closed successfully          </div>';

        const failedAlertDiv = document.createElement('div');
        failedAlertDiv.innerHTML = '<div class="alert alert-danger" role="alert"> Error: Issue is not closed  </div>';


        function editIssueFunction(){
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

        document.getElementById('cancelEditIssueWidget').addEventListener('click',closeEditIssueWidget);
        function closeEditIssueWidget(){
            div1.innerHTML = null;
            successAlertDiv.innerHTML = null;
            failedAlertDiv.innerHTML = null;

        }
    }
}