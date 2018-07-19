const uri= 'https://api.recast.ai/v2/request?text=';
let token = 'Token 61ea44f55507a3cca8be9775f2bd8286';
import CreateRepo from "./createRepo";
import CreateIssue from "./createIssue";
import EditIssue from "./editIssue";
import DisplayIssues from "./displayIssues";
import AddCollaborators from "./addCollaborator";

let repoName = '';
let h = new Headers();
h.append('Content-Type','application/json');
h.append('Authorization',token);

let createRepo = new CreateRepo();
let createIssue = new CreateIssue();
let editIssue = new EditIssue();
let displayIssues = new DisplayIssues();
let addCollaborators = new AddCollaborators();

export default class RecastApi{

    getBotValue() {
        var queryCommand = document.getElementById('searchbox').value;
        console.log("queryCommand: "+queryCommand);
        
        var gitHubAuthentication = "Bearer 96ac92fd1d1deef423d9912f4bdca93acfb1ecbb";

       return fetch(uri+queryCommand, { method: "post",  headers: h,}).then((response) => {
                response.json().then(response => {
                console.log("response is:", response);
                
                if(response['results']['intents'][0]['slug']=="create-repo"){

                    repoName = response['results']['entities']['git-repository'][0]['value'];
                    console.log("repoName........."+repoName);
                    createRepo.createRepoWidget(repoName);
                }
                else if(response['results']['intents'][0]['slug']=="create-issue"){
                    console.log("you are trying to create issue now");
                    repoName = response['results']['entities']['git-repository'][0]['value'];
                    console.log("repo name:", repoName);

                    var issueName = response['results']['entities']['git-issue'][0]['value'];
                    console.log("issueName:", issueName);
                    var data = repoName + ' ' + issueName;
                    createIssue.createIssueWidget(data);
                }
                else if(response['results']['intents'][0]['slug']=="edit-issues"){
                    console.log("you are trying to edit issue now");
                    repoName = response['results']['entities']['git-repository'][0]['value'];
                    console.log("repo: "+repoName)
                    var issueId = response['results']['entities']['git-issue-id'][0]['value'];
                    console.log("Issue Id:"+issueId);
                    var data = repoName + ' ' + issueId;
                    editIssue.editIssueWidget(data);
                }
                else if(response['results']['intents'][0]['slug']=="display-issues"){
                    console.log("trying to dispaly issues");
                    repoName = response['results']['entities']['git-repository'][0]['value'];
                    displayIssues.displayAllIssuesWidget(repoName);
                }
                else if(response['results']['intents'][0]['slug']=="add-collaborators"){
                    console.log("trying to add collaborators");
                    repoName = response['results']['entities']['git-repository'][0]['value'];
                    var collaboratorName = response['results']['entities']['user_id'][0]['value'];
                    console.log("collname:"+collaboratorName);
                    var data = repoName + ' ' + collaboratorName;
                    addCollaborators.addCollaboratorWidget(data);
                }
             }).catch(function(err) {
                console.log("There is some error in resolving name of repository from sentence...");
             });
          }).catch(function() {
            console.log("There is some error in recast.ai api call...");
         });
     }       
}






