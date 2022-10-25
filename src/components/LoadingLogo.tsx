import { FC } from 'react';

type Props = {
    size?: number;
    iconOnly?: boolean;
};

const defaultSize = '20';

import CentrifugeLogo from '/images/centrifuge-systems-spinner.svg';
import CentrifugeText from '/images/centrifuge-text.svg';
import CentrifugeLogoCentered from '/images/cent-logo-centered.svg';

const LoadingLogo: FC<Props> = ({ size }) => {
    return (
        <>
            <div
                role="status"
                className={`flex-column absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 items-center justify-center`}
            >
                <img
                    src={CentrifugeLogoCentered}
                    className={`mx-auto h-20 w-20 animate-spin-logo`}
                />
                <img src={CentrifugeText} className="mt-3 w-40" />
                <span className="sr-only">Loading...</span>
            </div>
        </>
    );
};

export default LoadingLogo;
