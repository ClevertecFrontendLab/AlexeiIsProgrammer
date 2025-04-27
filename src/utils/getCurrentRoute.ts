import { flattenRoutes } from '~/routes';

const getCurrentRoute = (searchRoute: string) =>
    flattenRoutes.find((route) => route.path === searchRoute);

export default getCurrentRoute;
