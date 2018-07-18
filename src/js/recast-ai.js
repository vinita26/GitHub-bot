
console.log("in recast ai");
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
                repoName = response['results']['entities']['git-repository'][0]['value'];
                console.log("repoName........."+repoName);
                this.createRepoWidget(repoName);
                console.log("widget closed");
                // createRepoFunction(repoName);
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
                    "Authorization": "Bearer 7a85737e1c3a3ed3b59285999623ef4b87e6cee1"
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

       

}






