import { flattenRoutes } from '~/main';

const getCurrentRoute = (searchRoute: string) =>
    flattenRoutes.find((route) => route.path === searchRoute);

export default getCurrentRoute;
