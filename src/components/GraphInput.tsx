/*
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

import { FC } from 'react';

type Props = {
    label: string;
    value?: String | JSX.Element | React.ReactNode;
    pre?: React.ReactNode;
};
export const GraphInput: FC<Props> = ({ label, value, pre }) => {
    return (
        <div>
            <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
            >
                Email
            </label>
            <div className="mt-1">
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="you@example.com"
                    aria-describedby="email-description"
                />
            </div>
            <p className="mt-2 text-sm text-gray-500" id="email-description">
                We'll only use this for spam.
            </p>
        </div>
    );
};
