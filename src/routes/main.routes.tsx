import { PublicRoute } from "./public.routes"
import { PrivateRoute } from "./private.routes"
import HomePage from "../pages/home"
import LoginPage from "../pages/login"
import ProfilePage from "../pages/profile"

const Routes = [
    {
    path: '/',
    element: <PrivateRoute />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/profile', element: <ProfilePage /> },
    ],
    },
    {
        path: '/login',
        element: <PublicRoute />,
        children: [{ path: '', element: <LoginPage /> }],
    },
]

export default Routes