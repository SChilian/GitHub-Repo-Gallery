// Where profile information will appear.//
const profile = document.querySelector(".overview");
const username = "SChilian";
const repoList = document.querySelector(".repo-list");
const allRepos = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");

const gitInfo = async function () {
    const response = await fetch (`https://api.github.com/users/${username}`);

    const data = await response.json();
    console.log(data);
    userInfo(data);

};
gitInfo();

const userInfo = function(data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = 
        `<figure>
          <img alt="user avatar" src=${"https://avatars.githubusercontent.com/u/147121000?v=4"} />
        </figure>
        <div>
          <p><strong>Name:</strong> ${"SChilian"}</p>
          <p><strong>Bio:</strong> ${"Book worm and avid learner turned coder."}</p>
          <p><strong>Location:</strong> ${"Mid-Hudson, New York"}</p>
          <p><strong>Number of public repos:</strong> ${24}</p>
        </div>`;

        profile.append(div);
        reposData();
}

const reposData = async function () {
    const repoInfo = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);

    const results = await repoInfo.json();
    oneRepoInfo(results);
    
}

const oneRepoInfo = function(repos){
    for (const repo of repos) {
        const li = document.createElement("li")
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    
    }
}

repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        specificRepoInfo(repoName);
    }
} )
const specificRepoInfo = async function(repoName) {
    const repoOnly = await fetch (`https://api.github.com/repos/${username}/${repoName}`);

    const repoInfo = await repoOnly.json();
    console.log(repoInfo);

    const fetchLanguage = await fetch (`https://api.github.com/repos/${username}/${repoName}/languages`);
    const languageData = await fetchLanguage.json();
    console.log(languageData);
    
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
        console.log(languages);
        displayRepoInfo(repoInfo, languages);

    };
}

const displayRepoInfo = function(repoInfo, languages) {
    repoData.innerHTML = "";
    const newDiv = document.createElement("div")
    newDiv.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
        
        repoData.append(newDiv);
        repoData.classList.remove("hide");
        allRepos.classList.add("hide");
}
