import { useSigma } from '@react-sigma/core';
import Graph from 'graphology';
import { FC } from 'react';
import Button from './Button';
import DevPanelHeader from './DevPanelHeader';
import GraphRow from './GraphRow';
import GraphSelector from './GraphSelector';
import GraphStats from './GraphStats';

const LoseContext: FC<{}> = () => {
    const sigma = useSigma();
    return (
        <Button
            text="LoseContext"
            onClick={() => {
                const canvases = sigma.getCanvases();

                canvases.edges.addEventListener(
                    'webglcontextlost',
                    (e) => {
                        console.log('logan test');
                        console.log(e);
                    },
                    false
                );
                canvases.edges.addEventListener(
                    'webglcontextrestored',
                    (e) => {
                        console.log('logan test');
                        console.log(e);
                    },
                    false
                );

                canvases.edges
                    .getContext('webgl2')
                    ?.getExtension('WEBGL_lose_context')
                    ?.loseContext();
                canvases.edges
                    .getContext('webgl2')
                    ?.getExtension('WEBGL_lose_context');
                // canvases.edges
                //     .getContext('webgl')
                //     ?.getExtension('WEBGL_lose_context')
                //     ?.loseContext();
            }}
        />
    );
};

const RestoreContext: FC<{}> = () => {
    const sigma = useSigma();
    return (
        <Button
            text="RestoreContext"
            onClick={() => {
                const canvases = sigma.getCanvases();

                // canvases.edges.addEventListener(
                //     'webglcontextlost',
                //     (e) => {
                //         console.log('logan test');
                //         console.log(e);
                //     },
                //     false
                // );

                canvases.edges
                    .getContext('webgl2')
                    ?.getExtension('WEBGL_lose_context')
                    ?.restoreContext();
                // canvases.edges
                //     .getContext('webgl2')
                //     ?.getExtension('WEBGL_lose_context')
                //     ?.restoreContext();
                // canvases.edges
                //     .getContext('webgl')
                //     ?.getExtension('WEBGL_lose_context')
                //     ?.loseContext();
            }}
        />
    );
};

export const DevPanel: FC<{}> = () => {
    const sigma = useSigma();
    return (
        <div className="flex flex-col !overflow-y-auto !scroll-smooth">
            <GraphStats />
            <DevPanelHeader
                title="WebGL"
                subtitle={'Testing losing and regaining context'}
            />
            <GraphRow label="Lose Context" value={<LoseContext />} />
            <GraphRow label="Restore Context" value={<RestoreContext />} />
        </div>
    );
};
