// form functionality
var userFormEl = document.querySelector("#user-form");
var nameInpulEl = document.querySelector("#username");
// list of repos column functionality
var repoContainerEl = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector('#repo-search-term')

//function for Submission browser event
var formSubmitHandler = function(event) {
  event.preventDefault();

  //get value form input element
  var username = nameInpulEl.value.trim();

  if(username) {
    //call the feth request
    getUserRepos(username);
    nameInpulEl.value = "";
  } else {
    alert("Please enter a GitHub Username");
  }
}

// fetch request
var getUserRepos = function(user) {
  var apiUrl = `https://api.github.com/users/${user}/repos`;

  // make a request ot the url
  fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
      displayRepos(data, user)
    });
  });
};


// function to diplay repos
var displayRepos = function(repos, searchTerm) {
  // be sure to clear out the old content before displaying new content.
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;

  //loop over the repos(data)
  for(var i = 0; i < repos.length; i++) {
    // format repo name
    var repoName = `${repos[i].owner.login}/${repos[i].name}`;
    //create a <div> container for each repo
    var repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    //create <span> element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;
    //append to container
    repoEl.appendChild(titleEl);

    //create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    //check if repo has issues or not, if TRUE display the issues count
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i> no issues";
    }

    //append status el to container
    repoEl.appendChild(statusEl);
    //append container to the DOM
    repoContainerEl.appendChild(repoEl);
  }
}

// submit event listener
userFormEl.addEventListener("submit", formSubmitHandler);

