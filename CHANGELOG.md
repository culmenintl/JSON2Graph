#### 0.0.3 (2022-10-26)

##### New Features

* **state:**  updated state management to fetch data via async function, added reload functionality, added the ability to change num rows read (d5def18b)
* **ui:**  tweaked css for small view (e1cb981f)

##### Bug Fixes

* **ui:**
  *  added pulse to status text when simming (0a5d8000)
  *  updated naming scheme for graphRow (90823aa0)
  *  fixed clipping issue on devpanel (4e5e7fc4)

#### 0.0.2 (2022-10-26)

##### Documentation Changes

* **license:**  added MIT license to package.json (d10d82f9)

##### New Features

* **build:**  added changelog roll script and tagging (f014a4f7)
* **ui:**
  *  added tailwind forms (65452bcd)
  *  polish for demo (bae8e565)
  *  added removal toggle for un connected nodes (aa09805b)
  *  closed dev panel on canvas click (80dd88ce)
  *  styled dev panel (68064307)
  *  moved dev panel and added animation (43165775)
  *  styled loading icon (114d1c2f)
  *  removed switch for dev panel button to save space (2237143e)
  *  added package json version to screen for demo (0365da64)
  *  added handling and snack notif for losing webGL context (dc874994)
  *  added centrifuge loading spinner, added error notif tray, added some polish on basic loading screens and animation (1a4bc026)
  *  added a lot of graph/data values to the dev panel and state management (05c2e05c)
  *  added dev panel, customized rendering, adding settings into state management (8574a396)
  *  added state management and dev mode panel as well as styled zoom controls (c6b42db3)
* **data:**  added sample dataset to repo, fixed button onClick (97a50dda)
* **state:**  seperated app and data store (ea291011)
* **demo:**  impl of sigmajs demo code (3c4268e8)

##### Bug Fixes

* **ui:**
  *  fix for prod build ui loading spinner (91a3835e)
  *  updated logo to be slightly off centered (3720de00)
  *  updated zoom min,max linted code and updated click functionality (385168ef)
* **build:**  fixed env values for local/prod (a4b37ac8)

##### Other Changes

* //github.com/Surge-Workshop/surge-web (3f632119)
* //github.com/Surge-Workshop/surge-web (4719e8d9)
*  @Azure opensource@microsoft.com (12222d7e)

##### Refactors

* **settings:**  updated default settings on sigma init for min/max zoom (021557a6)

