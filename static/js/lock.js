function showProfile(data, content){
    //const profile_data = JSON.stringify(data);
    if (data.login === undefined) {
        const collection = document.getElementsByClassName("lecture");
        for (let i = 0; i < collection.length; i++) {
            collection[i].innerHTML = "";
        }
        const locked = document.getElementsByClassName("lecture-locked");
        for (let i = 0; i < locked.length; i++) {
            //locked[i].innerHTML = "You need to <a href='https://github.com/login/oauth/authorize?client_id=Iv1.79320ea83712d6fc'>login with Github</a> to view this content.";
            locked[i].innerHTML = "<div class='card-bar'></div><div class='card-body'><h3 class='h4 card-title'>👋 You need to login</h3><p class='card-text'>Login with your Github account to view this content.</p><form class='row gx-2 gy-3 email-form' method='post' name='newsletter' onsubmit='subscribeButton.disabled=!0'><input type='hidden' name='form-name' value='newsletter'><div class='col-md-4'><a id='loginButton' href='https://github.com/login/oauth/authorize?client_id=Iv1.79320ea83712d6fc' class='btn btn-primary w-100'>Login</a></div></form></div>"
            locked[i].classList.add("card");
            locked[i].style.display = 'inherit';
        }
    }
}

function getProfile(data, content) {
    
    const access_token = data;

    localStorage.setItem('access_token',access_token);

    fetch(`https://api.github.com/user`, {
        headers: {
            'Authorization' : `token ${access_token}`
        }
    })
    .then(data => data.json())
    .then(data => showProfile(data, content))
    .catch(err => console.error(err));
}

function getAccessToken() {

    if(access_token = localStorage.getItem('access_token'))
        getProfile(access_token);

    const clientId = `Iv1.79320ea83712d6fc`;
    let code = window.location.search;
    code = code.replace("?code=", '');

    fetch(`https://openfoam-parallelization-workshop-logger.onrender.com/${clientId}/${code}`)
    .then(data => data.json())
    .then(data => getProfile(data.access_token, content));
}

function doWeHaveAccessToken(){
    const locked = document.getElementsByClassName("lecture-locked");
    for (let i = 0; i < locked.length; i++) {
        locked[i].innerHTML = "You have to login to view this content.";
        locked[i].class = "lecture-locked form-control is-search";
        locked[i].style.display = 'none';
    }
    if(access_token = localStorage.getItem('access_token')){
        getProfile(access_token, {});
    }
}
getAccessToken();
doWeHaveAccessToken();

//document.addEventListener("DOMContentLoaded", function () {
//  doWeHaveAccessToken();
//});
