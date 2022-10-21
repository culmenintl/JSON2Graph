import Graph from 'graphology';
import { FC } from 'react';
import GraphSelector from './GraphSelector';
import GraphStats from './GraphStats';

export const DevPanel: FC<{}> = () => {
    return (
        <div className="my-5 flex flex-col">
            <GraphStats />
            {/* <GraphSelector /> */}
        </div>
    );
};
