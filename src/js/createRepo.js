export default class CreateRepo{

    createRepoWidget(data){
        console.log("inside createRepoWidget, data value:"+data);
        var myArr = [];
        var body = document.querySelector('body');    
        let div1 = document.createElement('div');
        div1.id= "createRepo";
        div1.className = "createNewrepo";
        body.append(div1);

        var createRepoHTML = '<div class="container my-3 mx-auto border border-info rounded" id="repoWidget"><h3>Create Repository: </h3>    <div class="row p-3"> <form method="post" action="#" class="w-75 text-center"> <div class="form-group row">    <label for="repoName" class="col-sm-3 col-form-label">Repo Name:*</label>  <div class="col-sm-9"> <input type="text" class="form-control" id="repoName" value='+data+'>  </div>  </div> <div class="form-group row">   <label for="repoDesc" class="col-sm-3 col-form-label">Repo Description:(optional)</label>   <div class="col-sm-9">    <input type="text" class="form-control" id="repoDesc" placeholder="Give Repo Description">   </div>   </div>   <div>    <button type="button" class="btn btn-primary" id="createRepobutton">Create Repo</button>  <button type="button" class="btn btn-danger cancelWidget" id="cancelCreateRepoWidget">Cancel</button>    </div>  </form>   </div>  </div>';
        div1.innerHTML = createRepoHTML;
        document.getElementById("createRepobutton").addEventListener("click",createRepoFunction.bind(null,data));

        let successAlertDiv = document.createElement('div');
        successAlertDiv.innerHTML = '<div class="alert alert-success" role="alert"> Created repo '+data+' successfully  </div>';

        let failedAlertDiv = document.createElement('div');
        failedAlertDiv.innerHTML = '<div class="alert alert-danger" role="alert"> Error, Repo not created</div>';

        function createRepoFunction(data){           
            fetch('https://api.github.com/user/repos', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 243e8ea575e546923c0024d16ee28630cd0f8d4d"
            },
            body: JSON.stringify({'name': data})
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
        

        document.getElementById("cancelCreateRepoWidget").addEventListener("click",closeCreateRepoWidget);
        function closeCreateRepoWidget(){
            div1.innerHTML = null;
            successAlertDiv.innerHTML = null;
            failedAlertDiv.innerHTML = null;
        }

    }  
}