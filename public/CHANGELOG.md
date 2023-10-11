#### 0.1.13 (2023-10-11)

##### Bug Fixes

* **graph:**  fixed bugs with clustering / filtering / sampling using debounce (4afe46fe)

#### 0.1.12 (2023-10-10)

#### 0.1.11 (2023-10-10)

##### New Features

* **ui:**  Seperated data / graph / settings panels, cleaned up UI. Now showing Config Settings & Mapping Preview (fbaa6978)

#### 0.1.10 (2023-10-09)

##### New Features

* **search:**
  *  Polished search functionality (9c8b1894)
  *  Updated search results to hightlight matching values, now click to focus on node from results, also animation polish. (28f33dbf)

#### 0.1.9 (2023-10-08)

##### Build System / Dependencies

* **fix:**  removed unused component (1bbdf976)

##### Chores

* **app:**  Cleaned up unused, old files (71572da6)

##### New Features

* **UI:**  Added navigation to Settings modal, added some polish to loading, moved layout outside of graph store file (8b41b8c7)
* **ui:**
  *  added layout selection (102c9673)
  *  updated loading logo and state display (6d0609fa)

##### Bug Fixes

* **ui:**
  *  made loading screen overlay background (a92e61d6)
  *  made dev panel modal closeable by click (b542ba5f)
  *  cleaned up theming (de74ba5a)
  *  created preferences store, persists theme and hover options (d863374b)
* **api:**  Added client error handling for API call. (4907ad3f)

#### 0.1.8 (2023-09-27)

##### Bug Fixes

* **build:**  updated roll scrips (04c19d3d)

##### Other Changes

* //github.com/lgn-lvx3/surge-v2 into ai-config (3ad5f299)
*  @Azure opensource@microsoft.com (1c355baa)

#### 0.1.7 (2023-09-27)

##### Bug Fixes

* **build:**  updated request urls (f6b0b08f)

#### 0.1.6 (2023-09-27)

#### 0.1.5 (2023-09-27)

#### 0.1.4 (2023-09-26)

##### Bug Fixes

* **build:**  removed unused deps (d8ecd740)

#### 0.1.3 (2023-09-26)

##### Bug Fixes

* **build:**  removed large yelp dataset (d0cbba45)

#### 0.1.2 (2023-09-26)

##### New Features

* **ai:**  Added az func static web app endpoint, calling AI for configuration (d99c23c5)
* **api:**  Added serverless api endpoint (194fd0d9)
* **ui:**  updated mapping / UI to map node/icon colors to theme (eab85afb)

##### Bug Fixes

* **build:**  updated gh actions script to use new branch and az func swa (e5da42d6)
* **ui:**  search results handles large values (4671689f)

#### 0.1.2 (2023-09-26)

##### New Features

* **ai:**  Added az func static web app endpoint, calling AI for configuration (d99c23c5)
* **api:**  Added serverless api endpoint (194fd0d9)
* **ui:**  updated mapping / UI to map node/icon colors to theme (eab85afb)

##### Bug Fixes

* **build:**  updated gh actions script to use new branch and az func swa (e5da42d6)
* **ui:**  search results handles large values (4671689f)

#### 0.1.1 (2023-09-22)

##### Build System / Dependencies

* **env:**  prod url update (fa4eaca8)

##### New Features

* **ui:**
  *  Search results box implementation (73e69103)
  *  added changelog modal (c670fdc5)
* **search:**  search implemented stateside (84a80f62)

#### 0.0.11 (2023-09-22)

##### Build System / Dependencies

* **env:**  prod url update (fa4eaca8)

##### New Features

* **ui:**
  *  Search results box implementation (73e69103)
  *  added changelog modal (c670fdc5)
* **search:**  search implemented stateside (84a80f62)

#### 0.0.9 (2023-09-22)

##### Build System / Dependencies

* **env:**  prod url update (fa4eaca8)

##### New Features

* **ui:**
  *  Search results box implementation (73e69103)
  *  added changelog modal (c670fdc5)
* **search:**  search implemented stateside (84a80f62)

#### 0.0.7 (2023-09-22)

##### Build System / Dependencies

* **env:**  prod url update (fa4eaca8)

##### New Features

* **ui:**
  *  Search results box implementation (73e69103)
  *  added changelog modal (c670fdc5)
* **search:**  search implemented stateside (84a80f62)

#### 0.0.6 (2023-09-21)

##### New Features

* **graph:**  added ability to filter by node degree (e6dea693)

##### Bug Fixes

* **build:**
  *  daisyUI added back to dev deps (e8a7755a)
  *  updates for package and smaller sample sizes (cd40c84f)
* **data:**  updated sampled rows and created smaller sample sets (15f616c6)

##### Other Changes

*  moved graph ref to own store for devtools (be34dd52)

#### 0.0.5 (2023-08-30)

##### Build System / Dependencies

* **cd/cd:**  update for GH build command (666e166c)

##### Chores

* **lint:**
  *  ran rome linter over files, sorted imports (a4e7b936)
  *  ran rome linter over files (de7c81ac)

##### New Features

* **ui:**
  *  added config for hover node functionality (96d27c8d)
  *  update for allowing light and dark mode (906847e1)
* **clustering:**  impl of clustering via max degrees, made configurable (338d22bc)
* **tooltip:**  impl of the tooltip feature (c7492015)
* **state:**
  *  updated to zustood, working through clustering (df1cb2aa)
  *  further refined app to populate from config file on load (04416e06)
  *  updated graph creation code to read from config file and populate graph (c80ab5cd)
* **data:**  added local storage cache (6c8e9032)

##### Bug Fixes

* **build:**
  *  updates for fixing data fetch on prd (82bbbda4)
  *  updates for fixing deployment build (49e453ce)
* **data:**  updated access control headers for data request (bdc804fa)
* **ui:**  small fixes (68bc748a)

##### Other Changes

*  @Azure opensource@microsoft.com (9d969102)
* **ui:**  added testing library, removed sigma references, added layout switching (7c130cf4)

##### Refactors

* **state:**
  *  removed mobx ref, using zustand (0b61c2a8)
  *  updated app/data to use Zustand (6f94f296)
  *  removed eslint, prettier, using rome (d4fe6ebf)

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

