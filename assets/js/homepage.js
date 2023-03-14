var getUserRepos = function(user) {
  var apiUrl = `https://api.github.com/users/${user}/repos`;

  // make a request ot the url
  fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
      console.log(data)
    });
  });
};

// form functionality
var userFormEl = document.querySelector("#user-form");
var nameInpulEl = document.querySelector("#username");


//function for Submission browser event
var formSubmitHandler = function(event) {
  event.preventDefault();

  //get value form input element
  var username = nameInpulEl.value.trim();

  if(username) {
    getUserRepos(username);
    nameInpulEl.value = "";
  } else {
    alert("Please enter a GitHub Username");
  }
}


// submit event listener
userFormEl.addEventListener("submit", formSubmitHandler);

// getUserRepos("isaiasqb")