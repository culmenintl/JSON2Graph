import { FC } from 'react';

type Props = {
    title: string;
    subtitle?: String;
};
const DevPanelHeader: FC<Props> = ({ title, subtitle }) => {
    return (
        <div className="self-start px-4 py-3 sm:px-6">
            <h3 className="text-left text-lg font-medium leading-6 text-gray-900">
                {title}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        </div>
    );
};

export default DevPanelHeader;
