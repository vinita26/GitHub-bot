const uri= 'https://api.recast.ai/v2/request?text=';
const token = 'Token 61ea44f55507a3cca8be9775f2bd8286';
let h = new Headers();
h.append('Content-Type','application/json');
h.append('Authorization',token);

import { createRepoWidget } from "./CreateRepo/createRepoView";
import { createIssueWidget } from "./CreateIssue/createIssueView";
import { editIssueWidget } from './EditIssue/editIssueView';
import { displayAllIssuesWidget} from './displayIssues';
import { addCollaboratorWidget } from './AddCollaborator/addCollaboratorView';

export const gitHubAuthentication = 'Bearer cf6d95910b13164a19b2d29383eb706f0e581b05';


export default class RecastApi{

    getBotValue() {
        const queryCommand = document.getElementById('searchbox').value;  
          
        
       return fetch(uri+queryCommand, { method: 'post',  headers: h,}).then((response) => {
                response.json().then(response => {
                
                const slug = response['results']['intents'][0]['slug'];
                const repoName = response['results']['entities']['git-repository'][0]['value'];

                if(slug=='create-repo'){
                    // let localvalue = JSON.parse(window.localStorage.getItem('createRepoButtonKey'));
                    // if(localvalue!=null){
                    //     console.log("localvalue:", localvalue);
                    // }
                    createRepoWidget(repoName);
                }
                else if(slug=='create-issue'){
                    var issueName = response['results']['entities']['git-issue'][0]['value'];
                    var data = repoName + ' ' + issueName;
                    createIssueWidget(data);
                }
                else if(slug=='edit-issues'){
                    var issueId = response['results']['entities']['git-issue-id'][0]['value'];
                    var data = repoName + ' ' + issueId;
                    editIssueWidget(data);
                }
                else if(slug=='display-issues'){
                    displayAllIssuesWidget(repoName);
                }
                else if(slug=='add-collaborators'){
                    var collaboratorName = response['results']['entities']['user_id'][0]['value'];
                    var data = repoName + ' ' + collaboratorName;
                    addCollaboratorWidget(data);
                }
             }).catch(function(err) {
                console.log('There is some error in resolving name of repository from sentence...');
             });
          }).catch(function() {
            console.log('There is some error in recast.ai api call...');
         });
     }       
}






