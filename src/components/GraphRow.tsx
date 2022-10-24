import { FC } from 'react';

type Props = {
    label: string;
    value?: String | JSX.Element | React.ReactNode;
    pre?: React.ReactNode;
};
const GraphRow: FC<Props> = ({ label, value, pre }) => {
    return (
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
                <div className="items-center py-4 text-left sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                        {label}
                    </dt>
                    {value && (
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {value}
                        </dd>
                    )}
                    {pre && (
                        <dd className="mt-1 overflow-x-clip text-xs text-gray-900 sm:col-span-2 sm:mt-0">
                            {pre ? pre : null}
                        </dd>
                    )}
                </div>
            </dl>
        </div>
    );
};

export default GraphRow;
