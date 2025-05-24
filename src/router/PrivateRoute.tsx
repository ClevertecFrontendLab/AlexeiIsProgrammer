import { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router';

import { useLazyCheckAuthQuery } from '~/query/services/auth';

import { LOGIN } from './constants/routes';

export const PrivateRoute = () => {
    const [firstRequest, setFirstRequest] = useState<boolean>(false);
    const [checkAuth] = useLazyCheckAuthQuery();
    const navigate = useNavigate();

    useEffect(() => {
        if (!firstRequest) {
            checkAuth()
                .unwrap()
                .then(() => {
                    navigate('/');
                })
                .catch((err) => {
                    if (err?.status === 403) {
                        navigate(`/${LOGIN}`);
                    }
                })
                .finally(() => {
                    setFirstRequest(true);
                });
        }
    }, [checkAuth, firstRequest, navigate]);

    if (!firstRequest) {
        return <Navigate to='/login' />;
    }

    return <Outlet />;
};
