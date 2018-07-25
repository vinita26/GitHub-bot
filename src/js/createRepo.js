export default class CreateRepo{

    createRepoWidget(data){
        const gitHubAuthentication = 'Bearer 45eb8ee4eb30172cd306fa3b92872b642198d2ce';
        const body = document.querySelector('body');    
        let div1 = document.createElement('div');
        div1.id= 'createRepo';
        div1.className = 'createNewrepo';
        body.append(div1);

        const createRepoHTML = `
        <div class="container my-3 mx-auto border border-info rounded" id="repoWidget">
        <div class="row p-3">
            <form method="post" action="#" class="w-75 text-center">
                <div class="form-group row">
                    <label for="repoName" class="col-sm-3 col-form-label">Repo Name</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" id="repoName" placeholder="Enter your repo name" value='${data}'>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="repoDesc" class="col-sm-3 col-form-label">Repo Description</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" id="repoDesc" placeholder="Description">
                    </div>
                </div>
                <div>
                    <button type="button" class="btn btn-primary" id="createRepobutton">Create Repo</button>
                    <button type="button" class="btn btn-danger cancelWidget" id="cancelCreateRepoWidget">Cancel</button>
                </div>
            </form>
        </div>
    </div>`;
       
        div1.innerHTML = createRepoHTML;
        document.getElementById("createRepobutton").addEventListener("click",createRepoFunction.bind(null,data));

        const successAlertDiv = document.createElement('div');
        successAlertDiv.innerHTML = '<div class="alert alert-success" role="alert"> Created repo '+data+' successfully  </div>';

        const failedAlertDiv = document.createElement('div');
        failedAlertDiv.innerHTML = '<div class="alert alert-danger" role="alert"> Error, Repo not created</div>';

        function createRepoFunction(data){           
            fetch('https://api.github.com/user/repos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': gitHubAuthentication
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
        .catch(error => console.error('ERROR::', error));
      }
        

        document.getElementById('cancelCreateRepoWidget').addEventListener('click',closeCreateRepoWidget);
        function closeCreateRepoWidget(){
            div1.innerHTML = null;
            successAlertDiv.innerHTML = null;
            failedAlertDiv.innerHTML = null;
        }

    }  
}