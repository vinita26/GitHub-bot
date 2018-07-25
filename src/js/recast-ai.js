const uri= 'https://api.recast.ai/v2/request?text=';
const token = 'Token 61ea44f55507a3cca8be9775f2bd8286';
import CreateRepo from './createRepo';
import CreateIssue from './createIssue';
import EditIssue from './editIssue';
import DisplayIssues from './displayIssues';
import AddCollaborators from './addCollaborator';

let h = new Headers();
h.append('Content-Type','application/json');
h.append('Authorization',token);

const createRepo = new CreateRepo();
const createIssue = new CreateIssue();
const editIssue = new EditIssue();
const displayIssues = new DisplayIssues();
const addCollaborators = new AddCollaborators();
// const gitHubAuthentication = 'Bearer 45eb8ee4eb30172cd306fa3b92872b642198d2ce';

export default class RecastApi{

    getBotValue() {
        const queryCommand = document.getElementById('searchbox').value;        
        
       return fetch(uri+queryCommand, { method: 'post',  headers: h,}).then((response) => {
                response.json().then(response => {
                
                const slug = response['results']['intents'][0]['slug'];
                const repoName = response['results']['entities']['git-repository'][0]['value'];
                
                if(slug=='create-repo'){
                    createRepo.createRepoWidget(repoName);
                }
                else if(slug=='create-issue'){
                    var issueName = response['results']['entities']['git-issue'][0]['value'];
                    var data = repoName + ' ' + issueName;
                    createIssue.createIssueWidget(data);
                }
                else if(slug=='edit-issues'){
                    var issueId = response['results']['entities']['git-issue-id'][0]['value'];
                    var data = repoName + ' ' + issueId;
                    editIssue.editIssueWidget(data);
                }
                else if(slug=='display-issues'){
                    displayIssues.displayAllIssuesWidget(repoName);
                }
                else if(slug=='add-collaborators'){
                    var collaboratorName = response['results']['entities']['user_id'][0]['value'];
                    var data = repoName + ' ' + collaboratorName;
                    addCollaborators.addCollaboratorWidget(data);
                }
             }).catch(function(err) {
                console.log('There is some error in resolving name of repository from sentence...');
             });
          }).catch(function() {
            console.log('There is some error in recast.ai api call...');
         });
     }       
}






