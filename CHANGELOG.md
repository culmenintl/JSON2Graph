#### 0.0.10 (2022-11-03)

##### New Features

* **data:**  added datasets, updated ingestion to assign node id if none present (d33ae29f)

#### 0.0.9 (2022-11-03)

##### New Features

* **build:**  updated logic to point to correct URL for data fetching (838c090d)

#### 0.0.8 (2022-11-03)

#### 0.0.7 (2022-11-03)

##### Documentation Changes

* **license:**  added MIT license to package.json (9e1ad567)

##### New Features

* **ui:**
  *  Added yelp dataset with config description (2c866119)
  *  closed dev panel on crop click (745b9af8)
  *  tweaked css for small view (1c120713)
  *  added tailwind forms (5f10b3fa)
  *  polish for demo (b13994e5)
  *  added removal toggle for un connected nodes (298c4976)
  *  closed dev panel on canvas click (575bdfd1)
  *  styled dev panel (64411c22)
  *  moved dev panel and added animation (7945d0a5)
  *  styled loading icon (47474cf9)
  *  removed switch for dev panel button to save space (0b86aaa5)
  *  added package json version to screen for demo (f0759d5f)
  *  added handling and snack notif for losing webGL context (2fd0bb59)
  *  added centrifuge loading spinner, added error notif tray, added some polish on basic loading screens and animation (f3fd7962)
  *  added a lot of graph/data values to the dev panel and state management (1e7496a5)
  *  added dev panel, customized rendering, adding settings into state management (ab7df001)
  *  added state management and dev mode panel as well as styled zoom controls (fc4bfa20)
* **state:**
  *  further refined app to populate from config file on load (82cdeaf6)
  *  updated graph creation code to read from config file and populate graph (79b4b1ae)
  *  updated state management to fetch data via async function, added reload functionality, added the ability to change num rows read (4569177b)
  *  seperated app and data store (f795db9f)
* **build:**  added changelog roll script and tagging (34491da2)
* **data:**  added sample dataset to repo, fixed button onClick (5d651f83)

##### Bug Fixes

* **ui:**
  *  small fixes (68bc748a)
  *  small fixes (77e33169)
  *  fixed overflow on dev panel (087d2f26)
  *  added pulse to status text when simming (b5e040fb)
  *  updated naming scheme for graphRow (828eb56a)
  *  fixed clipping issue on devpanel (b568f8c0)
  *  fix for prod build ui loading spinner (aa008f0b)
  *  updated logo to be slightly off centered (b12acc3d)

##### Other Changes

* //github.com/Surge-Workshop/surge-web (6dc87a9c)

##### Refactors

* **settings:**  updated default settings on sigma init for min/max zoom (e566ab77)

#### 0.0.6 (2022-11-03)

#### 0.0.5 (2022-11-03)

##### New Features

* **ui:**
  *  Added yelp dataset with config description (e8ef67a1)
  *  closed dev panel on crop click (670e9593)
* **state:**
  *  further refined app to populate from config file on load (04416e06)
  *  updated graph creation code to read from config file and populate graph (c80ab5cd)

##### Bug Fixes

* **ui:**  small fixes (68bc748a)

#### 0.0.4 (2022-10-26)

##### Bug Fixes

* **ui:**  fixed overflow on dev panel (27eb7fd0)

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

