import 'jquery';
import 'popper.js';
import 'bootstrap';
// const recastVal = require('./recast-ai.js');
import RecastApi from "./recast-ai";
let recast = new RecastApi();


document.getElementById("submitQuery").addEventListener("click",callRecast);
var query = document.getElementById("searchbox").value;

function callRecast(){   

    recast.getBotValue()
            .then(function(data){
                console.log(data);
                
            }).catch(function(error) {
                console.log('There has been a problem with your create repository operation: ', error.message);
                window.confirm("Error While Creating Respository");
            });
}

// function checkQuery(){    

//     var body = document.querySelector('body');    
//     let div1 = document.createElement('div');
//     div1.id= "createRepo";
//     div1.className = "createNewrepo";
//     body.append(div1);

//     var createRepoHTML = '<div class="container my-3 mx-auto border border-info rounded" id="repoWidget">    <div class="row p-3"> <form method="post" action="#" class="w-75 text-center"> <div class="form-group row">    <label for="repoName" class="col-sm-3 col-form-label">Repo Name</label>  <div class="col-sm-9">            <input type="text" class="form-control" id="repoName" value=query>  </div>  </div> <div class="form-group row">   <label for="repoDesc" class="col-sm-3 col-form-label">Repo Description</label>   <div class="col-sm-9">    <input type="text" class="form-control" id="repoDesc" placeholder="Description">   </div>   </div>   <div>    <button type="button" class="btn btn-primary" id="createRepo" onclick="alert(\'clicked create button\')">Create Repo</button>  <button type="button" class="btn btn-danger cancelWidget" id="canceRepolWidget">Cancel</button>    </div>  </form>   </div>  </div>';
//     div1.innerHTML = createRepoHTML;

//     document.getElementById("canceRepolWidget").addEventListener("click",closeRepoWidget);
//     function closeRepoWidget(){
//         div1.innerHTML = null;
//     }

//     var createButton = document.getElementById('createRepo');
    
//     // format of query should be "create repo with name <repoName>"
//     //     if(query.startsWith("create repo")){
//     //     const repoName = query.split(" ")[4];
//     //     console.log(createButton.id);
//     //     //createButton.onclick = alert("clicked create button");
//     //     // createButton.onclick = createRepoFunction(repoName);
        
//     // }
//     // // format of query should be "create issue with name <issueName>"
//     //     else if(query.startsWith("create issue")){
//     //     const issueName = query.split(" ")[4];
//     //     (document.getElementById("createIssueWidget")).style.visibility = 'visible';
//     //     createIssue(issueName);
//     // }
//     // else{
//     //     console.log(document.getElementById("searchbox").value + " is not proper query");
//     // }
// }


// function createIssue(data){
//     fetch('https://api.github.com/repos/vinita26/new-repo2/issues', {
//     method: 'POST',
//     headers: {
//         "Content-Type": "application/json",
//         "Authorization": "Bearer 7a85737e1c3a3ed3b59285999623ef4b87e6cee1"
//     },
//     body: JSON.stringify({
//         "title": data,
//         "assignees": [
//           "vinita26"
//         ]
//       })
// }).then(response => response.json())
//   .catch(error => console.error("ERROR::", error));
// }
