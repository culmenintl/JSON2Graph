import { FC } from 'react';

interface Props {
    text: string;
    onClick?: () => void;
    icon?: JSX.Element;
}

const Button: FC<Props> = ({ text, onClick: onClick, icon }) => {
    return (
        <button
            type="button"
            className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={onClick}
        >
            {text}
            {icon}
        </button>
    );
};

export default Button;
