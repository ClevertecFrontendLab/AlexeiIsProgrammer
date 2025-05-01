import { AppRoute } from '~/query/services/categories';

const getCurrentRoute = (routes: AppRoute[], searchRoute: string) =>
    routes.find((route) => route.category === searchRoute);

export default getCurrentRoute;
