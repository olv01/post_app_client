import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSingIn } from "../../hooks/auth-hooks";
import AuthContext from "../../store/auth-context";
import classes from "./SignInForm.module.css";

const SignInForm = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useSingIn();

  const idInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    const data = JSON.stringify({
      username: idInputRef.current.value,
      password: passwordInputRef.current.value,
    });
    try {
      setIsLoading(true);
      const responseData = await signIn(data);
      authCtx.login(
        responseData.token,
        responseData.username,
        responseData.expiredAt
      );
      navigate(-1);
    } catch (err) {
      alert("아이디와 비밀번호를 다시 입력해주세요.");
      passwordInputRef.current.value = "";
      setIsLoading(false);
    }
  };

  return (
    <section>
      <form className={classes["signIn-form"]} onSubmit={submitHandler}>
        <h3>Login</h3>
        <div className={classes.id}>
          <label>아이디</label>
          <input id="id" required ref={idInputRef} />
        </div>
        <div className={classes.password}>
          <label>비밀번호</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <button
          type="submit"
          className={isLoading ? classes["is-loading"] : ""}
        >
          로그인
        </button>
      </form>
    </section>
  );
};

export default SignInForm;
