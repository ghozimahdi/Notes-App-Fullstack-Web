import style from "./LoginPage.module.css";
import {useState} from "react";
import Spacer from "../components/Spacer.tsx";
import PasswordInput from "./components/PasswordInput.tsx";
import {useNavigate} from "react-router-dom";
import {routesConfig} from "../../routes.tsx";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={style.page}>
      <main className={style.main}>
        <h2>Login Page</h2>
        <Spacer height={1}/>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <Spacer height={1}/>
        <PasswordInput
          setPassword={setPassword}
          password={password}
        />
        <Spacer height={1}/>
        <button onClick={() => {
          navigate(routesConfig.home);
        }}>Login
        </button>
      </main>
    </div>
  )
}

export default LoginPage