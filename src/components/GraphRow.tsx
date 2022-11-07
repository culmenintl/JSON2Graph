import { FC } from 'react';

type Props = {
    label: string;
    value?: String | JSX.Element | React.ReactNode;
    preRendered?: React.ReactNode;
};

export const GraphRow: FC<Props> = ({ label, value, preRendered }) => {
    return (
        <div className="border-t border-gray-300 px-4 py-1 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-300">
                <div className="items-center py-3 text-left sm:grid sm:grid-cols-3 sm:gap-4 sm:py-3 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                        {label}
                    </dt>
                    {value && (
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {value}
                        </dd>
                    )}
                    {preRendered && (
                        <dd className="mt-1 overflow-x-hidden text-xs text-gray-900 sm:col-span-2 sm:mt-0">
                            {preRendered ? preRendered : null}
                        </dd>
                    )}
                </div>
            </dl>
        </div>
    );
};
