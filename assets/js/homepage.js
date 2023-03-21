// form functionality
var userFormEl = document.querySelector("#user-form");
var nameInpulEl = document.querySelector("#username");
var languageButtonsEl = document.querySelector("#language-buttons");
// list of repos column functionality
var repoContainerEl = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector('#repo-search-term')

//function for Submission of the user form event
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

//function for clicking any of the language buttons
var languageButtonClick = function(event) {
  //event delegation, capture the language name of the button clicked
  var language = event.target.getAttribute("data-laguage");
  if(language) {
    getFeaturedRepos(language);
    //clear ol content
    //this line will always execute first, because getFeaturedRepos() is asynchronous 
    //and will take longer to get a response from GitHub's API.
    repoContainerEl.textContent = ""
  }
}


// fetch request for repos by user
var getUserRepos = function(user) {
  var apiUrl = `https://api.github.com/users/${user}/repos`;

  // make a request ot the url`
  fetch(apiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        displayRepos(data, user)
      });
    } else { // error handling for user not found
      alert("Error: GitHub User Not Found");
    }
  })
  //error handling  network connectivity issues 
  .catch(function(error) {
    alert("Unable to connect to GitHub");
  });
};


//looking up repos by their language
var getFeaturedRepos = function(language) {
  var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";
  fetch(apiUrl).then(function(response) {
    if(response.ok) {
      response.json().then(function(data) {
        //pass data.items and the language parameter's value into displayRepos()
        displayRepos(data.items, language)
      });
    } else {
      alert ("ERROR: User not found");
    }
  });
};


// function to diplay repos
var displayRepos = function(repos, searchTerm) {
  // be sure to clear out the old content before displaying new content.
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;

  // if the username has no repos to show
  if(repos.length === 0){ // error handling for user with no repos
    repoContainerEl.textContent = "NO REPOSITORIES FOUND";
    return
  }

  //loop over the repos(data)
  for(var i = 0; i < repos.length; i++) {
    // format repo name
    var repoName = `${repos[i].owner.login}/${repos[i].name}`;
    //create <a> container for each repo
    var repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    //make the link to the single repo page have a query string with the name of the repository
    repoEl.setAttribute("href", "./single-repo.html?repo="+repoName);
    
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

// "submit" event listener for "search by user form" 
userFormEl.addEventListener("submit", formSubmitHandler);

//event listener for language buttons (event delegation instead of creating a listener for each button)
languageButtonsEl.addEventListener("click", languageButtonClick);

