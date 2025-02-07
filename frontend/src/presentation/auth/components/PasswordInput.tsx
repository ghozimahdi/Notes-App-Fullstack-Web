import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";

interface PasswordInputProps {
  password: string;
  setPassword: (password: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({password, setPassword}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div style={{position: "relative", width: "100%"}}>
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <span
        onClick={() => setShowPassword((prev) => !prev)}
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer",
          color: "#555",
        }}
        role="button"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}/>
      </span>
    </div>
  );
};

export default PasswordInput;