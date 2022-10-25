import { useSigma } from '@react-sigma/core';
import { FC } from 'react';
import Button from './Button';
import DevPanelHeader from './DevPanelHeader';
import GraphRow from './GraphRow';
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
