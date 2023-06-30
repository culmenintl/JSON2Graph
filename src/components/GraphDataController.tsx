import { useLoadGraph, useSigma } from "@react-sigma/core"
import { keyBy, omit, uniqBy } from "lodash"
import { FC, useEffect } from "react"

import useInject from "../hooks/useInject"
import { Dataset, FiltersState, NodeData } from "../lib/types"
import { RootStoreModel } from "../stores/RootStore"
import { observer } from "mobx-react-lite"
import { useSnackbar } from "notistack"

import { calculateDegreesAndColor, populateGraph } from "../lib/Utils"
import { cropToLargestConnectedComponent } from "graphology-components"
import { circlepack, circular } from "graphology-layout"
// layout
import forceAtlas2 from "graphology-layout-forceatlas2"

import config from "../../configs/data.mapping.json"
import { STATUS } from "../stores/_AppSlice"
import useStore from "../stores/_Store"

const mapStore = ({ graphStore }: RootStoreModel) => ({
    graphStore,
})

const GraphDataController: FC<{ filters: FiltersState }> = observer(
    ({ filters, children }) => {
        const { graphStore } = useInject(mapStore)
        const sigma = useSigma()
        const sigmaGraph = sigma.getGraph()
        const loadGraph = useLoadGraph()
        const { enqueueSnackbar, closeSnackbar } = useSnackbar()

        const dataset = useStore((state) => state.dataSet)
        const fetchData = useStore((state) => state.fetchData)
        const setStatus = useStore((state) => state.setStatus)
        const setLoading = useStore((state) => state.setLoading)

        /**
         * Feed graphology with the new dataset:
         */
        useEffect(() => {
            if (!sigmaGraph || !dataset.data) return

            // const clusters = keyBy(dataset.clusters, 'key');
            // const tags = keyBy(dataset.tags, 'key');

            // console.log('dataset', dataset);
            setStatus(STATUS.SHAPING)

            try {
                populateGraph(sigmaGraph, dataset.data, config)
            } catch (e: any) {
                enqueueSnackbar(e.message, {
                    variant: "error",
                })
            }

            // Check to see if we only want to keep main component
            if (graphStore.settings.crop) {
                cropToLargestConnectedComponent(sigmaGraph)
            }

            // calc degrees and colorize
            calculateDegreesAndColor(sigmaGraph)

            // assign circular layout to give base positions
            // circular.assign(datasetGraph);
            circlepack.assign(sigmaGraph)

            graphStore.setLayoutSettings(sigmaGraph)
            graphStore.setGraph(sigmaGraph)

            // check if we want to use an asynchronus web worker layout (live simulation)
            // or if we want to do a blocking simulation
            if (graphStore.settings.webWorkerLayout) {
                setStatus(STATUS.SIMULATING)
                graphStore.toggleSimulation()

                setTimeout(() => {
                    setStatus(STATUS.GRAPH_SIMULATED)
                    setLoading(false)
                    graphStore.toggleSimulation()
                    // graphStore.setGraph(sigmaGraph)
                    // fa2Layout.kill()
                    console.log("layout done")
                }, graphStore.settings.runLayoutInMs)
            } else {
                // blocking synchronus simulation
                forceAtlas2.assign(sigmaGraph, {
                    iterations: graphStore.settings.iterations,
                })
            }

            return () => sigmaGraph.clear()
        }, [dataset.data])

        /**
         * This effect should run on if crop is selected, we need to either strip down the graph or create reload
         */
        useEffect(() => {
            if (!dataset.data || !graphStore.graph) {
                return
            }
            // appStore.setStatus(STATUS.SHAPING);
            // appStore.setLoading(true);
            // const datasetGraph = populateGraph(dataStore.data);

            // if graph already exists, then crop it else, clear it and reload
            if (graphStore.settings.crop && graphStore.graph) {
                cropToLargestConnectedComponent(graphStore.graph)
            } else {
                sigmaGraph.clear()
                fetchData()
                return
            }

            // calc degrees and colorize
            // calculateDegreesAndColor(datasetGraph);
            // circlepack.assign(datasetGraph);

            graphStore.toggleSimulation()
            setStatus(STATUS.SIMULATING)
            setTimeout(() => {
                setStatus(STATUS.GRAPH_SIMULATED)
                setLoading(false)
                graphStore.toggleSimulation()
                console.log("layout done")
            }, graphStore.settings.runLayoutInMs)
        }, [graphStore.settings.crop])

        return <>{children}</>
    },
)

export default GraphDataController
