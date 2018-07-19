export default class EditIssue{

    editIssueWidget(data){
        console.log("inside editIssueWidget, data value:"+data);

        var arrayData = data.split(' ');
        var RepoName = arrayData[0];
        console.log("reponame: ",RepoName);

        var IssueId = arrayData[1];
        console.log("issueid: ",IssueId);

        var body = document.querySelector('body');    
        let div1 = document.createElement('div');
        div1.id= "editIssue";
        body.append(div1);

        var editIssueHTML = '<div class="container my-3 mx-auto border border-info rounded" id="issueWidget"> <div class="row p-3"> <form method="post" action="#" class="w-75 text-center"> <div class="form-group row"><label for="repoName" class="col-sm-3 col-form-label">Repository Name:*</label><div class="col-sm-9"><input type="text" class="form-control" id="RepoName" value='+RepoName+'></div> </div><div class="form-group row"> <label for="issueTitle" class="col-sm-3 col-form-label">Issue Id:*</label><div class="col-sm-9"> <input type="text" class="form-control" id="issueTitle" value='+IssueId+'> </div> </div> <div><button type="button" class="btn btn-primary" id="editIssue">Close Issue</button> <button type="button" class="btn btn-danger cancelWidget" id="cancelEditIssueWidget">Cancel</button> </div> </form> </div> </div></div>';

        div1.innerHTML = editIssueHTML;

        document.getElementById("editIssue").addEventListener("click",editIssueFunction(data));

        var successAlertDiv = document.createElement('div');
        successAlertDiv.innerHTML = '<div class="alert alert-success" role="alert"> Issue closed successfully          </div>';

        var failedAlertDiv = document.createElement('div');
        failedAlertDiv.innerHTML = '<div class="alert alert-danger" role="alert"> Error: '+response.status+ ' Issue is not closed  </div>';


        function editIssueFunction(){
            const issueUri = 'https://api.github.com/repos/vinita26/' + RepoName + '/issues/'+IssueId;
            console.log("issueUri", issueUri);
            fetch(issueUri, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer e8f3892ef69841c8248540b9d2959592193275b7"
            },
            body: JSON.stringify({
                "number": IssueId,
                "state": "closed"
              })
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