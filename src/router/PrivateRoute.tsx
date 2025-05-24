import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';

import CustomSpinner from '~/components/CustomSpinner';

import { LOGIN } from './constants/routes';

type PrivateRouteProps = {
    children: React.ReactNode;
};

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const [hasToken, setHasToken] = useState<null | boolean>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setHasToken(Boolean(token));
    }, [setHasToken]);

    if (hasToken === null) {
        return <CustomSpinner spinnerOverflow />;
    }

    if (!hasToken) {
        return <Navigate to={`/${LOGIN}`} />;
    }

    return children;
};
