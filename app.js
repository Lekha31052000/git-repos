const myform = document.getElementById("myform");

myform.addEventListener("submit", (e) => {
  e.preventDefault();

  let username = document.getElementById("username");
  let password = document.getElementById("password");

  let user = username.value;
  let pass = password.value;
  console.log(user);
  console.log(pass);
  validateUserLogin(user, pass);
});

const gitHubForm = document.getElementById("gitHubForm");

gitHubForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let usernameInput = document.getElementById("usernameInput");

  let gitHubUsername = usernameInput.value;

  requestUserRepos(gitHubUsername);
});
function validateUserLogin(user, pass) {
  console.log("function loaded");

  const url = "/data/users.json";
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url, true);
  xmlhttp.onload = function () {
    const data = JSON.parse(this.response);

    let flag = 0;

    if (user == data.username && pass == data.password) {
      flag = 1;
    }

    if (flag === 1) {
      alert("success");
      document.getElementById("first").style.display = "none";
      document.getElementById("second").style.display = "block";
    }
  };

  xmlhttp.send();
}

function requestUserRepos(username) {
  const xhr = new XMLHttpRequest();

  const url = `https://api.github.com/users/${username}/repos`;

  xhr.open("GET", url, true);

  xhr.onload = function () {
    const data = JSON.parse(this.response);
    let root = document.getElementById("userRepos");
    while (root.firstChild) {
      root.removeChild(root.firstChild);
    }
    if (data.message === "Not Found") {
      let ul = document.getElementById("userRepos");

      let li = document.createElement("li");

      li.classList.add("list-group-item");

      li.innerHTML = `
                <p><strong>No account exists with username:</strong> ${username}</p>`;

      ul.appendChild(li);
    } else {
      let ul = document.getElementById("userRepos");
      let p = document.createElement("p");
      p.innerHTML = `<p><strong>Number of Public Repos:${data.length}</p>`;
      ul.appendChild(p);

      for (let i in data) {
        let li = document.createElement("li");

        li.classList.add("list-group-item");

        li.innerHTML = `
                <p><strong>Repo:</strong> ${data[i].name}</p>
                <p><strong>Description:</strong> ${data[i].description}</p>
                <p><strong>URL:</strong> <a href="${data[i].html_url}">${data[i].html_url}</a></p>
            `;

        ul.appendChild(li);
      }
    }
  };

  xhr.send();
}
