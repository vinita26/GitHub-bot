export default class CreateIssue{
    createIssueWidget(data){
        console.log("inside createIssueWidget, data value:"+data);

        var arrayData = data.split(' ');
        var RepoName = arrayData[0];
        console.log("reponame: ",RepoName);

        var IssueName = arrayData[1];
        console.log("issuename: ",IssueName);

        var body = document.querySelector('body');    
        let div1 = document.createElement('div');
        div1.id= "createIssue";
        div1.className = "createNewIssue";
        body.append(div1);

        var createIssueHTML = '<div class="container my-3 mx-auto border border-info rounded" id="issueWidget"> <div class="row p-3"> <form method="post" action="#" class="w-75 text-center"> <div class="form-group row"><label for="repoName" class="col-sm-3 col-form-label">Repository Name:*</label><div class="col-sm-9"><input type="text" class="form-control" id="RepoName" value='+RepoName+'></div> </div><div class="form-group row"> <label for="issueTitle" class="col-sm-3 col-form-label">Issue Title:*</label><div class="col-sm-9"> <input type="text" class="form-control" id="issueTitle" value='+IssueName+'> </div> </div> <div><button type="button" class="btn btn-primary" id="createIssue">Create Issue</button> <button type="button" class="btn btn-danger cancelWidget" id="cancelCreateIssueWidget">Cancel</button> </div> </form> </div> </div></div>';

        div1.innerHTML = createIssueHTML;
        document.getElementById("createIssue").addEventListener("click",createIssueFunction(data));
        
        function createIssueFunction(){
            const issueUri = 'https://api.github.com/repos/vinita26/' + RepoName + '/issues';
            console.log("issueUri", issueUri);
            fetch(issueUri, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer e8f3892ef69841c8248540b9d2959592193275b7"
            },
            body: JSON.stringify({
                "title": IssueName,
                "assignees": [
                  "vinita26"
                ]
              })
        }).then(response => {
            if(response.status=='201'){
                alert("Issue created successfully");
            }
            else{
                alert("Issue creation failed");
            }
        })
          .catch(error => console.error("ERROR::", error));
        }
        document.getElementById("cancelCreateIssueWidget").addEventListener("click",closeCreateIssueWidget);
        function closeCreateIssueWidget(){
            div1.innerHTML = null;
        }
    }

}