---
title: "Versions"
description: ""
lead: "An appendix of hosted documentation for nearly every release of Doks, from v0 through v3."
date: 2021-09-24T08:50:23+02:00
lastmod: 2021-09-24T08:50:23+02:00
draft: false
images: []
layout: versions
url: "/workshop/versions/"
---

<div id='user'> </div>

<script type="text/javascript">
  async function onLoad() {
    const res = await authorizerRef.authorize({
      response_type: 'code',
      use_refresh_token: false,
    })
    if (res && res.access_token) {
      // you can use user information here, eg:
      const user = await authorizerRef.getProfile({
        Authorization: `Bearer ${res.access_token}`,
      })
      const userSection = document.getElementById('user')
      const logoutSection = document.getElementById('logout-section')
      logoutSection.classList.toggle('hide')
      userSection.innerHTML = `Welcome, ${user.email}`
    }
  }
  onLoad()
</script>

