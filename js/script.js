// Where profile information will appear.//
const profile = document.querySelector(".overview");
const username = "SChilian";

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
}