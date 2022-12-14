import { useRegisterEvents, useSigma } from '@react-sigma/core';
import { FC, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { RootStoreModel } from '../stores/RootStore';
import useInject from '../hooks/useInject';
import { graph } from 'graphology-metrics';

function getMouseLayer() {
    return document.querySelector('.sigma-mouse');
}

// These are the webGL canvases used by Sigma.js
// edges;
// nodes;
// edgeLabels;
// labels;
// hovers;
// hoverNodes;
// mouse;
const canvasProps = [
    'edges',
    'nodes',
    'edgeLabels',
    'labels',
    'hovers',
    'hoverNodes',
    'mouse',
];

// webgl context string
const WEBGL_CONTEXT_LOST = 'webglcontextlost';
// message to display when lost
const WEBGL_CONTEXT_LOST_MESSAGE = 'Lost WebGL Context for';

const mapStore = ({ appStore, dataStore }: RootStoreModel) => ({
    appStore,
    dataStore,
});

const GraphEventsController: FC<{
    setHoveredNode: (node: string | null) => void;
}> = ({ setHoveredNode, children }) => {
    const sigma = useSigma();
    const registerEvents = useRegisterEvents();
    const canvases = sigma.getCanvases();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { dataStore, appStore } = useInject(mapStore);

    /**
     * Initialize here settings that require to know the graph and/or the sigma
     * instance:
     */
    useEffect(() => {
        canvasProps.forEach((val) => {
            console.log('adding WebGL event listener for', val);
            canvases[val].addEventListener(
                WEBGL_CONTEXT_LOST,
                (e) => {
                    enqueueSnackbar(`${WEBGL_CONTEXT_LOST_MESSAGE} - ${val}`, {
                        variant: 'error',
                    });
                },
                false
            );
        });
        registerEvents({
            clickNode({ node }) {
                setHoveredNode(node);
                const graph = sigma.getGraph();
                const attributes = graph.getNodeAttributes(node);
                appStore.setTargetNode(attributes);
            },
            // @logan added to reset 'hover' like state, will rename
            clickStage() {
                setHoveredNode(null);
                appStore.clearNode();
                if (appStore.devMode) {
                    appStore.toggleDevMode();
                }
            },
            enterNode({ node }) {
                // TODO: Find a better way to get the DOM mouse layer:
                const mouseLayer = getMouseLayer();
                if (mouseLayer) mouseLayer.classList.add('mouse-pointer');
            },
            leaveNode({ node }) {
                // setHoveredNode(null);
                // TODO: Find a better way to get the DOM mouse layer:
                const mouseLayer = getMouseLayer();
                if (mouseLayer) mouseLayer.classList.remove('mouse-pointer');
            },
        });
    }, []);

    return <>{children}</>;
};

export default GraphEventsController;
