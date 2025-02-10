import {lazy} from "react";

const routesConfig = {
  login: "/",
  home: "/home",
  about: "/about",
  createNote: "/create_note",
  notFound: "*",
};

const HomePage = lazy(() => import("./presentation/home/HomePage"));
const AboutPage = lazy(() => import("./presentation/about/AboutPage"));
const LoginPage = lazy(() => import("./presentation/auth/LoginPage"));
const NotFoundPage = lazy(() => import("./presentation/NotFoundPage"));
const CreateNotePage = lazy(() => import("./presentation/create_note/CreateNotePage"));

const routes = [
  {path: routesConfig.home, element: <HomePage/>},
  {path: routesConfig.about, element: <AboutPage/>},
  {path: routesConfig.login, element: <LoginPage/>},
  {path: routesConfig.notFound, element: <NotFoundPage/>},
  {path: routesConfig.createNote, element: <CreateNotePage/>},
];

export {routes, routesConfig};