import { lazy } from "react";

export const routes = [
    {
        path: "/",
        isProtected: false,
    },
    {
        path: "/login",
        element: lazy(() => import('../../containers/login_screen')),
        isProtected: false,
    },
    {
        path: "/dashboard",
        element: lazy(() => import('../../containers/dashboard')),
        isProtected: true,
    },
];