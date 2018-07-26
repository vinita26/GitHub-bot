import {editIssueController } from './editIssueController';

export function editIssueWidget(data){
    let arrayData = data.split(' ');
    let RepoName = arrayData[0];
    let IssueId = arrayData[1];

    let body = document.querySelector('body');    
    let div1 = document.createElement('div');
    div1.id= 'editIssue';
    body.append(div1);

    let editIssueHTML = `<div class="container my-3 mx-auto border border-info rounded" id="editIssueWidget">
    <h3>Edit Issue:</h3>
    <div class="row p-3">
        <form method="post" action="#" class="w-75 text-center">
            <div class="form-group row">
                <label for="repoName" class="col-sm-3 col-form-label">Repository Name:*</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="repoName" placeholder="Enter your repo name" value='${RepoName}'>
                </div>
            </div>
            <div class="form-group row">
                    <label for="repoDesc" class="col-sm-3 col-form-label">Issue Id:</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" id="repoDesc" value='${IssueId}'>
                    </div>
                </div>
            <div>
                <button type="button" class="btn btn-primary" id="editIssueButton-${IssueId}">Close Issue</button>
                <button type="button" class="btn btn-danger cancelWidget" id="cancelEditIssueWidget-${IssueId}">Cancel</button>
            </div>
        </form>
    </div>
</div>`;
    div1.innerHTML = editIssueHTML;

    let editButtonName = 'editIssueButton-' + IssueId;
    document.getElementById(editButtonName).addEventListener('click',editIssueController.bind(null,data));
    
    let cancelButtonName = 'cancelEditIssueWidget-' + IssueId;
    document.getElementById(cancelButtonName).addEventListener('click',closeEditIssueWidget);
    function closeEditIssueWidget(){
        div1.innerHTML = null;
        // successAlertDiv.innerHTML = null;
        // failedAlertDiv.innerHTML = null;

    }
}