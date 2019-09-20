const uri= 'https://api.recast.ai/v2/request?text=';
//const token = 'Token 61ea44f55507a3cca8be9775f2bd8286';
const token = 'Token 63673448c4651955065aef718e6099c6';
let h = new Headers();
h.append('Content-Type','application/json');
h.append('Authorization',token);

import {store} from './state';
import { createRepoWidget } from "./CreateRepo/createRepoView";
import { createIssueWidget } from "./CreateIssue/createIssueView";
import { editIssueWidget } from './EditIssue/editIssueView';
import { displayAllIssuesWidget} from './displayIssues';
import { addCollaboratorWidget } from './AddCollaborator/addCollaboratorView';

//export const gitHubAuthentication = 'Bearer 6f05928440d56fb8b1c15e23440c28a211562e59';
export const gitHubAuthentication = 'Bearer b3744974efee62ba812bfefb042aabffcfb1ab36';

let localvalue = '';

export default class RecastApi{

    getBotValue() {
        const queryCommand = document.getElementById('searchbox').value;  
          
        
       return fetch(uri+queryCommand, { method: 'post',  headers: h,}).then((response) => {
                response.json().then(response => {
                
                const slug = response['results']['intents'][0]['slug'];
                const repoName = response['results']['entities']['git-repository'][0]['value'];

                if(slug=='create-repo'){
                    const createRepoObj = {
                        id: '',
                        queryText: queryCommand,
                        createRepo: {
                          Reponame: repoName,
                          description: '',
                        },
                        response: ''
                      }
                      console.log("createRepoObj query", createRepoObj.queryText);
                      let storeState = store.getState();
                      let objectItems = storeState.items;
                      if(objectItems.length>0){
                        let previousObjectId = storeState.items[objectItems.length-1].id;
                        createRepoObj.id = Number(previousObjectId) +1;
                      }
                      else{
                          createRepoObj.id = 1;
                      }

                   
                      store.dispatch({type: 'CREATE_REPO', item: createRepoObj});
                    // localvalue = JSON.parse(window.localStorage.getItem('States'));
                    
                    
                createRepoWidget(repoName);
                }
                else if(slug=='create-issue'){
                    var issueName = response['results']['entities']['git-issue'][0]['value'];
                    const createIssueObj = {
                        id: '',
                        queryText: queryCommand,
                        createIssue: {
                          repoName: repoName,
                          issueName: issueName,
                          issueBody: '',
                          assigneeName: '',
                          issueType: ''
                        },
                        response: ''
                      }

                      let storeState = store.getState();
                      let objectItems = storeState.items;
                      if(objectItems.length>0){
                        let previousObjectId = storeState.items[objectItems.length-1].id;
                        createIssueObj.id = Number(previousObjectId) +1;
                      }
                      else{
                        createIssueObj.id = 1;
                    }
                    store.dispatch({type: 'CREATE_ISSUE', item: createIssueObj});
                    var data = repoName + ' ' + issueName;
                    createIssueWidget(data);
                }
                else if(slug=='edit-issues'){
                    var issueId = response['results']['entities']['git-issue-id'][0]['value'];
                    const editIssueObj = {
                        id: '',
                        queryText: queryCommand,
                        editIssue: {
                          repoName: queryCommand,
                          issueId: issueId
                        },
                        response: ''
                      }
                      let storeState = store.getState();
                      let objectItems = storeState.items;
                      if(objectItems.length>0){
                        let previousObjectId = storeState.items[objectItems.length-1].id;
                        editIssueObj.id = Number(previousObjectId) +1;
                      }
                      else{
                        editIssueObj.id = 1;
                    }
                    store.dispatch({type: 'EDIT_ISSUE', item: editIssueObj});
                    var data = repoName + ' ' + issueId;
                    editIssueWidget(data);
                }
                else if(slug=='display-issues'){
                    displayAllIssuesWidget(repoName);
                }
                else if(slug=='add-collaborators'){
                    var collaboratorName = response['results']['entities']['user_id'][0]['value'];
                    const addcollaboratorObj = {
                        id: '',
                        queryText: queryCommand,
                        createIssue: {
                          repoName: queryCommand,
                          collaboratorName: collaboratorName
                        },
                        response: ''
                      }
                      let storeState = store.getState();
                      let objectItems = storeState.items;
                      if(objectItems.length>0){
                        let previousObjectId = storeState.items[objectItems.length-1].id;
                        addcollaboratorObj.id = Number(previousObjectId) +1;
                      }
                      else{
                        addcollaboratorObj.id = 1;
                    }
                    store.dispatch({type: 'ADD_COLLABORATOR', item: addcollaboratorObj});
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