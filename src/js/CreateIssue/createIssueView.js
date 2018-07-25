import { createIssueController, createIssueCancelController} from "./createIssueController"; 

export function createIssueWidget(data){

    const gitHubAuthentication = 'Bearer 45eb8ee4eb30172cd306fa3b92872b642198d2ce';
    let arrayData = data.split(' ');
    let RepoName = arrayData[0];

    let IssueName = arrayData[1];

    let body = document.querySelector('body');    
    let div1 = document.createElement('div');
    div1.id= "createIssue";
    div1.className = "createNewIssue";
    body.append(div1);

    let createIssueHTML = `
    <div class="container my-3 mx-auto border border-info rounded" id="issueWidget">
    <div class="row p-3">
        <form method="post" action="#" class="w-75 text-center">
            <div class="form-group row">
                <label for="issueTitle" class="col-sm-3 col-form-label">RepoName:*</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="issueTitle" value="${RepoName}">
                </div>
            </div>
            <div class="form-group row">
                <label for="issueTitle" class="col-sm-3 col-form-label">Issue Title:*</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="issueTitle" placeholder="Enter title.." value="${IssueName}">
                </div>
            </div>
            <div class="form-group row">
                <label for="issueBody" class="col-sm-3 col-form-label">Body</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="issueBody" placeholder="Enter issue body..">
                </div>
            </div>
            <div class="form-group row">
                <label for="issueAssignees" class="col-sm-3 col-form-label">Assignee Name</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="issueAssignees" placeholder="Enter issue assignee name..">
                </div>
            </div>
            <div class="form-group row">
                <label for="issueLabel" class="col-sm-3 col-form-label">Issue Type</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="issueLabel" placeholder="Enter issue type..">
                </div>
            </div>
            <div>
                <button type="button" class="btn btn-primary" id="createIssueBtn">Create Isuue</button>
                <button type="button" class="btn btn-danger cancelWidget" id="cancelCreateIssueBtn">Cancel</button>
            </div>
        </form>
    </div>
</div>
</div>
    `;

    div1.innerHTML = createIssueHTML;
    document.getElementById("createIssueBtn").addEventListener('click',createIssueController.bind(null,data));
    document.getElementById("cancelCreateIssueBtn").addEventListener("click",closeCreateIssueWidget);

    function closeCreateIssueWidget(){
        div1.innerHTML = null;
    }

}
