import { createRepoController, createRepoCancelController } from "./createRepoController"; 

export function createRepoWidget(data){
        // const body = document.querySelector('body');   
        const widgets = document.getElementById('widgets');  
        let div1 = document.createElement('div');
        div1.id= 'createRepo'; 
        div1.className = 'createNewrepo';
        widgets.prepend(div1);

        const createRepoHTML = `
        <div class="container my-3 mx-auto border border-info rounded" id="repoWidget">
        <h3>Create repository:</h3>
        <div class="row p-3">
            <form method="post" action="#" class="w-75 text-center">
                <div class="form-group row">
                    <label for="repoName" class="col-sm-3 col-form-label">Repo Name:*</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" id="repoName" placeholder="Enter your repo name" value='${data}'>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="repoDesc" class="col-sm-3 col-form-label">Repo Description:</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" id="repoDesc" placeholder="Description">
                    </div>
                </div>
                <div>
                    <button type="button" class="btn btn-primary" id="createRepobutton">Create Repo</button>
                    <button type="button" class="btn btn-danger cancelWidget" id="cancelCreateRepoWidget-${data}">Cancel</button>
                </div>
            </form>
        </div>
    </div>`;
       
        div1.innerHTML = createRepoHTML;
        document.getElementById("createRepobutton").addEventListener("click",createRepoController.bind(null,data));

        let cancelButtonName = 'cancelCreateRepoWidget-' + data;
        document.getElementById(cancelButtonName).addEventListener('click', function(){
            div1.innerHTML=null;
        })

   
}


