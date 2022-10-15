import { FC } from 'react';

interface Props {
    icon: JSX.Element;
    onPress?: () => void;
}
const ZoomButton: FC<Props> = ({ icon, onPress }) => {
    return (
        <div
            className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={onPress}
        >
            {icon}
        </div>
    );
};

export default ZoomButton;
