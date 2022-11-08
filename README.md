# Surge Graph Demo

![](images/table ./public/images/widget-demo.png?raw=true)

-   **React** 17
-   **tailwindcss:** v3.x
-   **typescript**
-   **SPA, client side rendering**
-   **SigmaJS webGL graph rendering library**
-   **Graphology graph library**
-   **mobx-state-tree state management**

## Get Started

```bash
yarn
# or `npm install`
```

---

## Develop

```bash
yarn dev
# or `npm run dev`
```

---

## Build

```bash
yarn build
# or `npm run build`
```

---

# Overview

Overall the project can be used as a tool to take in relatively unknown dataset rows as JSON data, and create a graph visualization with them.

With graphs the relationship between the data has to be set somewhere, its relatively impossible to look at a dataset and assign node/edge values, because it really depends on what you are looking to visualize. This was a problem that I ran into during my development and research of this project, therefore I thought it would be ideal to create a tool to easily visualize the relationships you were creating.

This web app allows you to define a configuration for a dataset and display the dataset in a graph with that configuration.

Included are a few example datasets, which have been stripped down to under 100k lines of rows as JSON objects. The datasets are reddit comments and yelp businesses, each of which have 2 configurations. Each configuration is showing the data in a different way by setting node/edge values differently.

# Configurations

The config file is located at
`/configs/data.mapping.json`

Configuration definition -

```{
            "id": "yelp_businesses", // required
            "url": "yelp.businesses.json", // required - where to fetch the URL from, along with .env
            "label": "yelp businesses - businesses/states", // optional - what the name of the dataset is in the web app
            "description": "This is an optional description", // optional - a description of the configuration
            // node array contains node object definitions for creating the nodes, you can have as many you would like to visualize
            "nodes": [
                {
                    "name": "business", // required - readable name of the node, doesn't need to be from row data
                    "idAttr": "name", // required - the attribute of the row to be used (what it will use as the ID)
                    "labelAttr": "name", // required - label attribute of the row to be used (what it will look like)
                    "clusterLabel": "Business" // optional - readable cluster or sub label of node, doesn't need to be from row data
                },
                {
                    "name": "State",
                    "idAttr": "state",
                    "labelAttr": "state",
                    "clusterLabel": "State"
                }
            ],
            // edge array contains which nodes you would like to create edges from.
            // These source/target id values need to match the ones set above.
            // The edge array will draw edges from source to target.
            "edges": [
                {
                    "sourceNodeId": "name", // required - the source attribute of the row value used above (name in this case)
                    "targetNodeId": "state", // required - the target attribute of the row value used above(state in this case)
                    "edgeLabel": "Is in", // optional - what to call the edge
                    "merge": true // optional, this will merge in edges that already exist.
                    // Useful for showing certain visualizations where edges don't need to be unique. (yelp dataset)
                }
            ]
        }
```

# Using the App

## Dev Panel

The wrench icon opens a dev panel, which shows you what you are looking at. This has some graph terminology and other stats such as nodes/edges, graph type, edge type and other metrics. It also have some toggles and tools to shape/view the graph.

## Cropping Non Connected Edges

This can be selected and acted on the currently showing dataset. This removes nodes/edges that aren't connected to the larger set.

## Target # of Rows

This will randomly select approximately X number of rows from very large datasets. The included datasets are all 100k rows, and depending on your nodes/edges, can be quite a few data points.

## Simulation

The simulation is configured to run for 5 secs, but you can press the 'play' button to continue the simulation. Ideally in future versions if the dataset was known or 'seen before' we could cache the x/y positions and not have to simulate.

# Responsive Design

This project what built to possibly be used in a dashboard, panel like environment, therefore all controls/visual components are designed with mobile-like space considerations but also useable on desktop.

# Technology Considerations

There was some extensive research into the landscape of current graph visualization libraries. If the shape and size of the dataset isn't generally known, then we should reach for the latest and greatest in displaying the largest sets of data in a browser, which is WebGL. SigmaJS was chosen for this purpose as it utilizes webGL to display graph data backed by graphology JS. The data is ingested, and graph is created with Graphology and then displayed with Sigma. This has proven to be able to show really as many nodes and edges as you would like, but the simulation is very slow. Sigma and this project also utilize web workers to offload simulation from the UI thread. Ideally 10-20k nodes/edges is a good target for speed considerations, but you can simulate the graph as long as you want.

# Caveats

Because WebGL / SigmaJS, showing many iframe instances at a time is a browser constraint and webGL context will be lost. In future versions this can be remedied by reloading the webGL handles programmatically if lost, ideally from the SigmaJS framework.
