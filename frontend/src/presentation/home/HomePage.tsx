import {useNavigate} from "react-router-dom";
import {routesConfig} from "../../routes.tsx";
import style from "./HomePage.module.css";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button
        className={style.buttonGoToLoginPage}
        onClick={() => {
          navigate(routesConfig.login)
        }}
      >Got to Login Page
      </button>
    </div>
  )
}

export default HomePage