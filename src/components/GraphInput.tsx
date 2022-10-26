import { FC } from 'react';

type Props = {
    label: string;
    pre?: React.ReactNode;
    type: React.HTMLInputTypeAttribute;
    disabled?: boolean;
    placehoder?: string;
    value?: string | number | readonly string[] | undefined;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
    max?: number;
};
export const GraphInput: FC<Props> = ({
    label,
    type,
    disabled,
    placehoder,
    value,
    onChange,
    max,
}) => {
    return (
        <div className="border-t border-gray-300 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-300">
                <div className="items-center py-4 text-left sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                        {label}
                    </dt>
                    <dd className="flex max-w-fit text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <input
                            min={0}
                            max={max}
                            value={value}
                            disabled={disabled}
                            type={type}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder={placehoder}
                            onChange={onChange}
                        />
                    </dd>
                </div>
            </dl>
        </div>
    );
};
