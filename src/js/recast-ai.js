const uri= 'https://api.recast.ai/v2/request?text=';
let token = 'Token 61ea44f55507a3cca8be9775f2bd8286';
let repoName = '';
let h = new Headers();
h.append('Content-Type','application/json');
h.append('Authorization',token);


export default class RecastApi{

    getBotValue() {
        var queryCommand = document.getElementById('searchbox').value;
        console.log("queryCommand: "+queryCommand);
        
       return fetch(uri+queryCommand, { method: "post",  headers: h,}).then((response) => {
                response.json().then(response => {
                console.log("response is:", response);
                console.log("Length is:", Object.keys(response['results']['entities']).length);
                
                if(response['results']['intents'][0]['slug']=="create-repo"){

                    repoName = response['results']['entities']['git-repository'][0]['value'];
                    console.log("repoName........."+repoName);
                    this.createRepoWidget(repoName);
                }
                else if(response['results']['intents'][0]['slug']=="create-issue"){
                    console.log("you are trying to create issue now");
                    repoName = response['results']['entities']['git-repository'][0]['value'];
                    console.log("repo name:", repoName);

                    var issueName = response['results']['entities']['git-issue'][0]['value'];
                    console.log("issueName:", issueName);
                    var data = repoName + ' ' + issueName;
                    this.createIssueWidget(data);
                }
                else if(response['results']['intents'][0]['slug']=="edit-issues"){
                    console.log("you are trying to edit issue now");
                    repoName = response['results']['entities']['git-repository'][0]['value'];
                    issueId = response['results']['entities']['git-issue-id'][0]['value'];
                    console.log("Issue Id:"+issueId);
                    var data = repoName + ' ' + issueId;
                    this.editIssueWidget(data);
                }
                else if(response['results']['intents'][0]['slug']=="display-issues"){
                    console.log("trying to dispaly issues");
                    repoName = response['results']['entities']['git-repository'][0]['value'];
                    this.displayAllIssues(repoName);
                }

             }).catch(function() {
                console.log("There is some error in resolving name of repository from sentence...");
             });
          }).catch(function() {
            console.log("There is some error in recast.ai api call...");
         });
     }

        createRepoWidget(data){
            console.log("inside createRepoWidget, data value:"+data);
            var body = document.querySelector('body');    
            let div1 = document.createElement('div');
            div1.id= "createRepo";
            div1.className = "createNewrepo";
            body.append(div1);

            var createRepoHTML = '<div class="container my-3 mx-auto border border-info rounded" id="repoWidget">    <div class="row p-3"> <form method="post" action="#" class="w-75 text-center"> <div class="form-group row">    <label for="repoName" class="col-sm-3 col-form-label">Repo Name</label>  <div class="col-sm-9"> <input type="text" class="form-control" id="repoName" value='+data+'>  </div>  </div> <div class="form-group row">   <label for="repoDesc" class="col-sm-3 col-form-label">Repo Description</label>   <div class="col-sm-9">    <input type="text" class="form-control" id="repoDesc" placeholder="Description">   </div>   </div>   <div>    <button type="button" class="btn btn-primary" id="createRepo">Create Repo</button>  <button type="button" class="btn btn-danger cancelWidget" id="canceRepolWidget">Cancel</button>    </div>  </form>   </div>  </div>';
            div1.innerHTML = createRepoHTML;
            document.getElementById("createRepo").addEventListener("click",createRepoFunction(data));

            function createRepoFunction(){           
                fetch('https://api.github.com/user/repos', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer 36b1694719bda3030b7b78ab300ffedbcb47c850"
                },
                body: JSON.stringify({'name': data})
            }).then(response => response.json())
            .catch(error => console.error("ERROR::", error));
        
            }

            document.getElementById("canceRepolWidget").addEventListener("click",closeRepoWidget);
            function closeRepoWidget(){
                div1.innerHTML = null;
            }
        }

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

            var createIssueHTML = '<div class="container my-3 mx-auto border border-info rounded" id="issueWidget"> <div class="row p-3"> <form method="post" action="#" class="w-75 text-center"> <div class="form-group row"><label for="repoName" class="col-sm-3 col-form-label">Repository Name:*</label><div class="col-sm-9"><input type="text" class="form-control" id="RepoName" value='+RepoName+'></div> </div><div class="form-group row"> <label for="issueTitle" class="col-sm-3 col-form-label">Issue Title:*</label><div class="col-sm-9"> <input type="text" class="form-control" id="issueTitle" value='+IssueName+'> </div> </div> <div><button type="button" class="btn btn-primary" id="createIssue">Create Issue</button> <button type="button" class="btn btn-danger cancelWidget" id="cancelIssueWidget">Cancel</button> </div> </form> </div> </div></div>';

            div1.innerHTML = createIssueHTML;
            document.getElementById("createIssue").addEventListener("click",createIssueFunction(data));

            function createIssueFunction(){
                const issueUri = 'https://api.github.com/repos/vinita26/' + RepoName + '/issues';
                console.log("issueUri", issueUri);
                fetch(issueUri, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer 36b1694719bda3030b7b78ab300ffedbcb47c850"
                },
                body: JSON.stringify({
                    "title": IssueName,
                    "assignees": [
                      "vinita26"
                    ]
                  })
            }).then(response => response.json())
              .catch(error => console.error("ERROR::", error));
            }
        }

        displayAllIssues(data){
            console.log("inside displayAllIssues, data value:"+data);
                        
            
                const issueUri = 'https://api.github.com/repos/vinita26/' + data + '/issues';
                console.log("issueUri", issueUri);
                fetch(issueUri, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer 36b1694719bda3030b7b78ab300ffedbcb47c850"
                }
            }).then(response => console.log("response:",response))
              .catch(error => console.error("ERROR::", error));
            
        }

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

            var createIssueHTML = '<div class="container my-3 mx-auto border border-info rounded" id="issueWidget"> <div class="row p-3"> <form method="post" action="#" class="w-75 text-center"> <div class="form-group row"><label for="repoName" class="col-sm-3 col-form-label">Repository Name:*</label><div class="col-sm-9"><input type="text" class="form-control" id="RepoName" value='+RepoName+'></div> </div><div class="form-group row"> <label for="issueTitle" class="col-sm-3 col-form-label">Issue Title:*</label><div class="col-sm-9"> <input type="text" class="form-control" id="issueTitle" value='+IssueName+'> </div> </div> <div><button type="button" class="btn btn-primary" id="createIssue">Create Issue</button> <button type="button" class="btn btn-danger cancelWidget" id="cancelIssueWidget">Cancel</button> </div> </form> </div> </div></div>';

            div1.innerHTML = createIssueHTML;
            document.getElementById("createIssue").addEventListener("click",createIssueFunction(data));

            function createIssueFunction(){
                const issueUri = 'https://api.github.com/repos/vinita26/' + RepoName + '/issues';
                console.log("issueUri", issueUri);
                fetch(issueUri, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer 36b1694719bda3030b7b78ab300ffedbcb47c850"
                },
                body: JSON.stringify({
                    "title": IssueName,
                    "assignees": [
                      "vinita26"
                    ]
                  })
            }).then(response => response.json())
              .catch(error => console.error("ERROR::", error));
            }
        }

}






