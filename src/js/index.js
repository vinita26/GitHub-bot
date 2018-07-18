
document.getElementById("submitQuery").addEventListener("click",checkQuery);
console.log("hello there!!");
function checkQuery(){
    var query = document.getElementById("searchbox").value;
    // format of query should be "create repo with name <repoName>"
        if(query.startsWith("create repo")){
        const repoName = query.split(" ")[4];
        createRepo(repoName);
    }
    // format of query should be "create issue with name <issueName>"
        else if(query.startsWith("create issue")){
        const issueName = query.split(" ")[4];
        createIssue(issueName);
    }
    else{
        console.log(document.getElementById("searchbox").value + "is not proper query");
    }
}


function createRepo(data){
    fetch('https://api.github.com/user/repos', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 5c04075232ed6d490755b3fd7137c3f08f69bd95"
    },
    body: JSON.stringify({'name': data})
}).then(response => response.json())
  .catch(error => console.error("ERROR::", error));

}

function createIssue(data){
    fetch('https://api.github.com/repos/vinita26/new-repo2/issues', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 5c04075232ed6d490755b3fd7137c3f08f69bd95"
    },
    body: JSON.stringify({
        "title": data,
        "assignees": [
          "vinita26"
        ]
      })
}).then(response => response.json())
  .catch(error => console.error("ERROR::", error));
}
