---
title: "User"
description: ""
lead: ""
date: 2021-09-24T08:50:23+02:00
lastmod: 2021-09-24T08:50:23+02:00
draft: false
images: []
layout: docs
---

<p id="login-name"></p>

<script type="text/javascript">
document.getElementById("login-name").innerHTML = "Welcome! You first  need to <a href='https://github.com/login/oauth/authorize?client_id=Iv1.79320ea83712d6fc'>login</a> with your Github account.";

function showProfile(data){
    //const profile_data = JSON.stringify(data);
    if (data.login) {
        document.getElementById("login-name").innerHTML = `Welcome <a href='https://github.com/${data.login}'>${data.login}</a>!`;
    }
}

function getProfile(data) {

    const access_token = data;

    localStorage.setItem('access_token',access_token);

    fetch(`https://api.github.com/user`, {
        headers: {
            'Authorization' : `token ${access_token}`
        }
    })
    .then(data => data.json())
    .then(data => showProfile(data))
    .catch(err => console.error(err));
}

function getAccessToken() {

    if(access_token = localStorage.getItem('access_token'))
    {
        getProfile(access_token);
    }

    const clientId = `Iv1.79320ea83712d6fc`;
    let code = window.location.search;
    code = code.replace("?code=", '');

    fetch(`https://openfoam-parallelization-workshop-logger.onrender.com/${clientId}/${code}`)
    .then(data => data.json())
    .then(data => getProfile(data.access_token))
    .catch(err => console.error(err));
}

function doWeHaveAccessToken(){
    if(access_token = localStorage.getItem('access_token')){
        getProfile(access_token);
    }
}
document.addEventListener('DOMContentLoaded', getAccessToken());

</script>
