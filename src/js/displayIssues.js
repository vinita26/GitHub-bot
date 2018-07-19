export default class DisplayIssues{
    displayAllIssuesWidget(data){
        console.log("inside displayAllIssues, data value:"+data);  
            var myArray =[];
            const issueUri = 'https://api.github.com/repos/vinita26/' + data + '/issues';
            console.log("issueUri", issueUri);

            fetch(issueUri, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer e8f3892ef69841c8248540b9d2959592193275b7"
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
            console.log("response data:", myArray);
            var arrayLength = myArray.length;

            var body = document.querySelector('body');    
            var h3 = document.createElement('h3');
            h3.innerHTML = "This repo has "+arrayLength+" issues, below is the detailed statement:";
            body.append(h3);              
            

            for (var i = 0; i < arrayLength; i++) {
            console.log(myArray[i]);
            console.log("Issue Title name:", myArray[i]['title']);
            console.log("Assignee name:", myArray[i]['assignee']['login']);
            console.log("Issue id:", myArray[i]['number']);
            console.log("Issue state:", myArray[i]['state']);

            var issueTitle = myArray[i]['title'];
            var assigneeName = myArray[i]['assignee']['login'];
            var issueId = myArray[i]['number'];
            var issueState = myArray[i]['state'];
            
            
            let div1 = document.createElement('div');
            div1.id= "displayIssue";

            var displayDataIssuesHTML = '<div class="container my-3 mx-auto border border-info rounded" id="repoWidget"><div class="row p-3"> <form method="post" action="#" class="w-75 text-center"> <div class="form-group row"> <label for="repoName" class="col-sm-3 col-form-label">Issue Title:</label> <div class="col-sm-9"> <input type="text" class="form-control" id="issueTitle" value='+issueTitle+'></div> </div> <div class="form-group row"><label for="repoDesc" class="col-sm-3 col-form-label">Assignee name:</label>            <div class="col-sm-9"> <input type="text" class="form-control" id="assigneeName" value='+assigneeName+'>  </div>  </div><div class="form-group row"><label for="repoDesc" class="col-sm-3 col-form-label">Issue id:</label> <div class="col-sm-9">                     <input type="text" class="form-control" id="issueId" value='+issueId+'>                     </div> </div><div class="form-group row"> <label for="repoDesc" class="col-sm-3 col-form-label">Issue state:</label>  <div class="col-sm-9"><input type="text" class="form-control" id="issueState" value='+issueState+'> </div> </div> </form> </div>           </div>';
            
            div1.innerHTML = displayDataIssuesHTML;
            body.append(div1);
            }
            
        })
        .catch((err) => {
            console.log("Error:", err.message);
        })
           
    }
}