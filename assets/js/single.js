// function that takes in a repo name as a parameter. 
var getRepoIssues = function(repo) {
  var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc"; 
  fetch(apiUrl).then(function(response) {
    if(response.ok) {
      response.json().then(function(data) {
        console.log(data);
      })
    } else {
      alert("There was a problem with the request")
    }
  });
};



getRepoIssues("facebook/react")