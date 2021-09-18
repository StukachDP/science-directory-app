import Admin from "./pages/admin";
import Auth from "./pages/auth";
import Directory from "./pages/directory";
import MagazinePage from "./pages/magazinePage";
import { ADMIN_ROUTE, MAGAZINE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, DIRECTORY_ROUTE } from "./utils/consts";

export const authRoutes = [{
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    }
]

export const publicRoutes = [{
        path: DIRECTORY_ROUTE,
        Component: Directory
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: MAGAZINE_ROUTE + '/:id',
        Component: MagazinePage
    }
]