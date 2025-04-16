import { Form } from "react-router";
import { FormProvider, useForm } from "react-hook-form";
import Input from "./Input";
import { loginValidator } from "./validators";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useGlobalContext } from "../ContextProvider";
import loginReq from "~/requests/login";

export default function SignInForm() {
  // TODO empty fields check
  let buttonOpacity = " opacity-50";

  const methods = useForm();
  const context = useGlobalContext();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const onSubmit = methods.handleSubmit(async (formData) => {
    // TODO auth errors handle
    const response = await loginReq(formData.username, formData.password);
    console.log(response);
    if (response.status === 200) {
      sessionStorage.setItem("token", response.data.accessToken);
      sessionStorage.setItem("expire", response.data.expire);
      sessionStorage.setItem("username", formData.username);
      context?.setAuth(response.data.accessToken);
      nav("/search");
    }
  });
  let buttonFunc = onSubmit;
  try {
    if (context?.authData.login && context?.authData.password) {
      buttonOpacity = "";
      buttonFunc = onSubmit;
    } else {
      buttonOpacity = " opacity-50";
      // buttonFunc = () => {};
    }
  } catch (error) {
    console.log("No Refs");
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
            ></Input>
          </div>
          <div>
            <Input
              name="password"
              label="Пароль:"
              placeholder=""
              validation={loginValidator}
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
