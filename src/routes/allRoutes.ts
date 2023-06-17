import AuthLayout from "../components/AuthLayouth";
import NoPage from "../components/NoPage";
import CreateToken from "../components/CreateToken";
import Profile from "../components/Profile";
import CreatePoll from "../components/CreatePoll";
import FillingQuestion from "../components/FillingQuestion";
import Index from "../components/takingsurvey";
import UpdateProfileData from "../components/UpdateProfileData";
import Repeat from "../components/Repeat";
import Rezult from "../components/Rezult";
import ResultEmail from "../components/ResultEmail";

interface RouteProps {
  path: string;
  component: any;
}

const publicRoutes: Array<RouteProps> = [
  { path: "/", component: AuthLayout },
  { path: "/polls", component: AuthLayout },
  { path: "/profile", component: Profile },
  { path: "/createtoken", component: CreateToken },
  { path: "/createpoll", component: CreatePoll },
  { path: "/fillingquestion", component: FillingQuestion },
  { path: "/answers", component: Index },
  { path: "/updatedata", component: UpdateProfileData },
  { path: "/repeat", component: Repeat },
  { path: "/rezult", component: Rezult },
  { path: "/resultemail", component: ResultEmail },
  { path: "*", component: NoPage },
];

export { publicRoutes };
