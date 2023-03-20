//DOM elements variables
var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");

//function to capture the query string and get the repo name
var getRepoName = function() {
  var queryString = document.location.search;
  var repoNameFromQueryString = queryString.split("=")[1];
  //dipslay repo name on the page
  if(repoNameFromQueryString){
    repoNameEl.textContent = repoNameFromQueryString
    getRepoIssues(repoNameFromQueryString)
  } else {
    window.alert("The repo name was not found or valid, you are being redirected to the homepage")
    document.location.replace("./index.html")
  }
 };


// function to get all the issues in a repo. Takes in a repo name as a parameter. 
var getRepoIssues = function(repo) {
  var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc"; 
  fetch(apiUrl).then(function(response) {

    if(response.ok) {
      response.json().then(function(data) {
        //call funtion that generates DOM elements
       displayIssues(data) 

       //chek if there are more than 30n results and generate link to those other issues
       if(response.headers.get("Link")) {
        displayWarning(repo)
       }
      });
    } else {
      alert("There was a problem with the request you are being redirected to the homepage");
      document.location.replace("./index.html");
    }
  });
};


//function for turning issue data into DOM elements
var displayIssues = function(issues) {
  if (issues.length === 0){
    issueContainerEl.textContent = "This repo has no open issues";
    return;
  }

  for (var i = 0; i < issues.length; i++) {
    // create <a> link element to take users to the issue on github
    var issueEl = document.createElement("a");
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issues[i].html_url);
    issueEl.setAttribute("target", "_blank");

    //create a <span> to hold the issue title
    var titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;

    //append to container
    issueEl.appendChild(titleEl);

    //create a type element
    var typeEl = document.createElement("span");

    // check if issue is an actual issue or a pull request
    if(issues[i].pull_request) {
      typeEl.textContent = "(Pull request)";
    } else {
      typeEl.textContent = "(Issue)"
    }

    //append to container
    issueEl.appendChild(typeEl)
    issueContainerEl.appendChild(issueEl)
  }
}

var displayWarning = function(repo) {
  //add text to warning container
  var linkEl = document.createElement("a");
  linkEl.textContent = "See More Issues on GitHub.com";
  linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
  linkEl.setAttribute("target", "_blank");

  // append to warning container
  limitWarningEl.appendChild(linkEl);
};

getRepoName()