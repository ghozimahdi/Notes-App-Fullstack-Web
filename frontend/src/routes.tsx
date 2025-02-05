import {lazy} from "react";

const routesConfig = {
  home: "/",
  about: "/about",
  login: "/login",
  notFound: "*",
};

const HomePage = lazy(() => import("./presentation/home/HomePage"));
const AboutPage = lazy(() => import("./presentation/about/AboutPage"));
const LoginPage = lazy(() => import("./presentation/auth/LoginPage"));
const NotFoundPage = lazy(() => import("./presentation/NotFoundPage"));

const routes = [
  {path: routesConfig.home, element: <HomePage/>},
  {path: routesConfig.about, element: <AboutPage/>},
  {path: routesConfig.login, element: <LoginPage/>},
  {path: routesConfig.notFound, element: <NotFoundPage/>},
];

export {routes, routesConfig};