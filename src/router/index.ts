import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import StartPage from "../pages/StartPage";
import TasksPage from "../pages/TasksPage";


export const privateRoutes = [
    {patch: "/tasks", component: TasksPage, exact: true},
]

export const publicRoutes = [
    {patch: "/start", component: StartPage, exact: true},
    {patch: "/login", component: LoginPage, exact: true},
    {patch: "/registration", component: RegistrationPage, exact: true},
]