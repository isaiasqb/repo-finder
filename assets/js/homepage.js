var getUserRepos = function(user) {
  var apiUrl = `https://api.github.com/users/${user}/repos`;

  // make a request ot the url
  fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
      console.log(data)
    });
  });
};

getUserRepos("isaiasqb")