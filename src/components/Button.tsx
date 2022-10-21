import { FC } from 'react';

interface Props {
    text: string;
    onClick?: () => void;
}
const Button: FC<Props> = ({ text, onClick: onClick }) => {
    return (
        <button
            type="button"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;
