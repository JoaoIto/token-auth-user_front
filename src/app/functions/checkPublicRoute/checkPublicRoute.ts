import { APP_ROUTES} from "@/app/routes/app-routes";

/**
 * @param asPath string
 * @returns boolean
 */

export const checkPublicRoute = (asPath: string) => {
    const appPublicRoutes = Object.values(APP_ROUTES.public);

    return appPublicRoutes.includes(asPath);
}