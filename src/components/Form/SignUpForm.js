import { useContext, useState } from "react";
import { useCheckUsername, useSingUp } from "../../hooks/auth-hooks";
import { useInput } from "../../hooks/use-input";
import AuthContext from "../../store/auth-context";
import classes from "./SignUpForm.module.css";

const suspendIdValidity = () => false;
const isEmail = (value) => value.includes("@");
const validatePassword = (stringToValidate) => {
  var pattern = /[a-zA-Z0-9!@#$%^&*]{4,16}$/;
  // /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{4,16}$/;

  if (
    stringToValidate &&
    stringToValidate.length >= 4 &&
    pattern.test(stringToValidate)
  ) {
    return true;
  }
  return false;
};

const SignUpForm = () => {
  const authCtx = useContext(AuthContext);
  const { signUp } = useSingUp();
  const { checkUsername } = useCheckUsername();
  const [formIsLoading, setFormIsLoading] = useState(false);
  const [idCheckIsLoading, setIdCheckIsLoading] = useState(false);

  const {
    value: idValue,
    isValid: idIsValid,
    valueChangeHandler: idChangeHandler,
    inputBlurHandler: idBlurHandler,
    validate: validateId,
    reset: resetId,
  } = useInput(suspendIdValidity);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(validatePassword);

  const validatePasswordCheck = (s) => (passwordValue === s ? true : false);

  const {
    value: passwordCheckValue,
    isValid: passwordCheckIsValid,
    hasError: passwordCheckHasError,
    valueChangeHandler: passwordCheckChangeHandler,
    inputBlurHandler: passwordCheckBlurHandler,
    reset: resetPasswordCheck,
  } = useInput(validatePasswordCheck);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const checkUsernameHandler = async (event) => {
    event.preventDefault();

    if (idValue.length < 4) {
      alert("4글자 이상부터 사용가능합니다");
      return
    }

    const data = JSON.stringify({
      username: idValue,
    });

    setIdCheckIsLoading(true);
    try {
      const responseData = await checkUsername(data);
      if (!responseData.exist) {
        alert("사용 가능 합니다");
        validateId();
      } else {
        alert("사용자가 이미 존재합니다");
        resetId();
      }
    } catch (err) {
    }
    setIdCheckIsLoading(false);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const data = JSON.stringify({
      username: idValue,
      password: passwordValue,
      email: emailValue,
    });

    try {
      setFormIsLoading(true);
      const responseData = await signUp(data);
      authCtx.login(
        responseData.token,
        responseData.username,
        responseData.expiredAt
      );
      setFormIsLoading(false);
    } catch (err) {
      alert("다시 시도해주세요");
      resetId();
      resetPassword();
      resetPasswordCheck();
      resetEmail();
      setFormIsLoading(false);
    }
  };

  let formIsValid =
    idIsValid && passwordIsValid && passwordCheckIsValid && emailIsValid;

  return (
    <section>
      <form className={classes["signUp-form"]} onSubmit={submitHandler}>
        <h3>SignUp</h3>
        <div className={classes.id}>
          <label>아이디</label>
          <div className={classes["id-container"]}>
            <input
              className={classes["input-id"]}
              required
              value={idValue}
              onChange={idChangeHandler}
              onBlur={idBlurHandler}
            />
            <button
              className={idCheckIsLoading ? classes["is-Loading"] : ""}
              onClick={checkUsernameHandler}
            >
              중복체크
            </button>
          </div>
          {idIsValid && (
            <div className={classes["valid-text"]}>*사용가능합니다</div>
          )}
        </div>
        <div className={classes.password}>
          <label>비밀번호</label>
          <input
            required
            value={passwordValue}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            type="password"
          />
          {passwordHasError && (
            <div className={classes["error-text"]}>
              * 비밀번호는 숫자, 영문자, 특수문자 포함한 4자리 이상이어야
              합니다.
            </div>
          )}
        </div>
        <div className={classes.passwordCheck}>
          <label>비밀번호 확인</label>
          <input
            required
            value={passwordCheckValue}
            onChange={passwordCheckChangeHandler}
            onBlur={passwordCheckBlurHandler}
            type="password"
          />
          {passwordCheckHasError && (
            <div className={classes["error-text"]}>
              * 비밀번호가 일치하지 않습니다.
            </div>
          )}
        </div>
        <div className={classes.email}>
          <label>이메일</label>
          <input
            required
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            type="email"
          />
          {emailHasError && (
            <div className={classes["error-text"]}>
              * 이메일 형식이 맞지 않습니다.
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={!formIsValid}
          className={formIsLoading ? classes["is-Loading"] : ""}
        >
          가입
        </button>
      </form>
    </section>
  );
};

export default SignUpForm;
