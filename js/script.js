// Where profile information will appear.//
const profile = document.querySelector(".overview");
const username = "SChilian";
const repoList = document.querySelector(".repo-list");

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
    const repoInfo = await fetch (`https://api.github.com/users/${username}/repos?sort=update&per_page=100`);

    const results = await repoInfo.json();
    console.log(results);
    oneRepoInfo(results);
    
}

const oneRepoInfo = function(repos){
    for (const repo of repos) {
        const li = document.createElement("li")
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
        reposData();
    }
}

