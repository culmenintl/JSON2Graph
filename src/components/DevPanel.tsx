import { useSigma } from '@react-sigma/core';
import { FC } from 'react';
import Button from './Button';
import DevPanelHeader from './DevPanelHeader';
import { GraphRow } from './GraphRow';
import GraphStats from './GraphStats';

const LoseContext: FC<{}> = () => {
    const sigma = useSigma();
    return (
        <Button
            text="LoseContext"
            onClick={() => {
                const canvases = sigma.getCanvases();

                canvases.edges
                    .getContext('webgl2')
                    ?.getExtension('WEBGL_lose_context')
                    ?.loseContext();
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

                canvases.edges
                    .getContext('webgl2')
                    ?.getExtension('WEBGL_lose_context')
                    ?.restoreContext();
            }}
        />
    );
};

export const DevPanel: FC<{}> = () => {
    return (
        <div className="border-1 pb-18 absolute bottom-20 left-0 right-0 mx-auto flex max-h-[75vh] max-w-xl rounded-lg border border-gray-300 bg-white/50 backdrop-blur-md">
            <div className="flex flex-col !overflow-y-auto !scroll-smooth">
                <GraphStats />
                <DevPanelHeader
                    title="WebGL"
                    subtitle={'Testing losing and regaining context'}
                />
                <GraphRow label="Lose Context" value={<LoseContext />} />
                <GraphRow label="Restore Context" value={<RestoreContext />} />
            </div>
        </div>
    );
};
