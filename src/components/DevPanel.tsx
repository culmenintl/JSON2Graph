import { FC } from 'react';
import GraphSelector from './GraphSelector';

export const DevPanel: FC<{}> = ({}) => {
    return (
        <div className="my-5 flex flex-col">
            <GraphSelector />
        </div>
    );
};
