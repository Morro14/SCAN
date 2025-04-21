import { Form } from "react-router";
import { FormProvider, useForm } from "react-hook-form";
import Input from "./Input";
import { loginValidator } from "../form/validators";
import { useNavigate } from "react-router";
import { useGlobalContext } from "../ContextProvider";
import loginReq from "~/requests/login";
import { useState } from "react";
import { useAppDispatch } from "~/redux/hooks";
import { authReducer } from "~/redux/authSlice";

export default function SignInForm() {
  // TODO empty fields check
  let buttonOpacity = " opacity-50 hover:opacity-100";

  const methods = useForm();
  const context = useGlobalContext();
  const nav = useNavigate();
  const [credsInvalid, setCredsInvalid] = useState(false);
  const dispatch = useAppDispatch();
  const onSubmit = methods.handleSubmit(async (formData) => {
    // TODO auth errors handle
    const response = await loginReq(formData.username, formData.password);
    if (response.status === 200) {
      sessionStorage.setItem("token", response.data.accessToken);
      // sessionStorage.setItem("expire", response.data.expire);
      sessionStorage.setItem("username", formData.username);
      // authContext?.setAuth(true);
      dispatch(
        authReducer({
          token: response.data.accessToken,
        })
      );
      nav("/main/auth");
    } else {
      setCredsInvalid(true);
    }
  });

  let buttonFunc: (
    e?: React.BaseSyntheticEvent<object, object, any>
  ) => Promise<void> | void = onSubmit;
  try {
    if (context?.authData.username && context?.authData.password) {
      buttonOpacity = "";
      buttonFunc = onSubmit;
    } else {
      buttonOpacity = " opacity-50 hover:opacity-50!";
      buttonFunc = () => {};
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <FormProvider {...methods}>
        <Form onSubmit={(e) => e.preventDefault()} noValidate>
          <div className="mt-[40px]">
            <Input
              name="username"
              label="Логин или номер телефона:"
              placeholder=""
              validation={loginValidator}
              credsInvalid={credsInvalid}
            ></Input>
          </div>
          <div>
            <Input
              name="password"
              label="Пароль:"
              placeholder=""
              validation={loginValidator}
              credsInvalid={credsInvalid}
            ></Input>
          </div>
          <button
            className={
              "btn mt-[7px] w-[379px] h-[59px] bg-blue-501 text-white font-medium text-[22px] rounded-[5px]" +
              buttonOpacity
            }
            onClick={buttonFunc}
          >
            Войти
          </button>
        </Form>
      </FormProvider>
    </div>
  );
}
