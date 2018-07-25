export default class DisplayIssues{
    displayAllIssuesWidget(data){  
            const gitHubAuthentication = 'Bearer 45eb8ee4eb30172cd306fa3b92872b642198d2ce';
            var myArray =[];
            const issueUri = 'https://api.github.com/repos/vinita26/' + data + '/issues';

            fetch(issueUri, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': gitHubAuthentication
            }
        }) .then((response) => {
            if (response.ok) {
                return response.json();
            } else {                    
                  throw new Error('No response found');
            }
        })
        .then((jsonData) => {
            myArray = jsonData;
            var arrayLength = myArray.length;

            var body = document.querySelector('body');    
            var h3 = document.createElement('h3');
            h3.innerHTML = 'This repo has '+arrayLength+' issues, below is the detailed statement:';
            body.append(h3);              
            

            for (var i = 0; i < arrayLength; i++) {

            var issueTitle = myArray[i]['title'];
            var assigneeName = myArray[i]['assignee']['login'];
            var issueId = myArray[i]['number'];
            var issueState = myArray[i]['state'];
            
            
            let div1 = document.createElement('div');
            div1.id= 'displayIssue';

            var displayDataIssuesHTML = '<div class="container my-3 mx-auto border border-info rounded" id="repoWidget"><h3>Display Issues: </h3><div class="row p-3"> <form method="post" action="#" class="w-75 text-center"> <div class="form-group row"> <label for="repoName" class="col-sm-3 col-form-label">Issue Title:</label> <div class="col-sm-9"> <input type="text" class="form-control" id="issueTitle" value='+issueTitle+'></div> </div> <div class="form-group row"><label for="repoDesc" class="col-sm-3 col-form-label">Assignee name:</label>            <div class="col-sm-9"> <input type="text" class="form-control" id="assigneeName" value='+assigneeName+'>  </div>  </div><div class="form-group row"><label for="repoDesc" class="col-sm-3 col-form-label">Issue id:</label> <div class="col-sm-9"> <input type="text" class="form-control" id="issueId" value='+issueId+'>            </div> </div><div class="form-group row"> <label for="repoDesc" class="col-sm-3 col-form-label">Issue state:</label>  <div class="col-sm-9"><input type="text" class="form-control" id="issueState" value='+issueState+'> </div><div><button type="button" class="btn btn-primary" id="closeIssue">Close Issue</button> <button type="button" class="btn btn-danger cancelWidget" id="cancelDisplayIssueWidget">Cancel</button> </div> </form> </div> </div>';
            
            div1.innerHTML = displayDataIssuesHTML;
            body.append(div1);
            }
            
        })
        .catch((err) => {
            window.confirm('Error:', err.message);
        });
           
    }
}