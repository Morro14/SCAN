import SignInForm from "~/components/auth/SignInForm";
import authYandex from "../../media/auth-yandex.svg";
import authGoogle from "../../media/auth-google.svg";
import authFacebook from "../../media/auth-facebook.svg";
import { useGlobalContext } from "~/components/ContextProvider";
import { Navigate } from "react-router";

export default function SignIn() {
  const context = useGlobalContext();
  console.log(context?.auth);
  return !context?.auth ? (
    <div>
      <SignInForm></SignInForm>
      <div className="text-blue-501 underline mt-[10px] text-center">
        Восстановить пароль
      </div>
      <div className="flex flex-col justify-between w-[308px] h-[65px] mt-[30px]">
        <div className="text-base text-[#949494]">Войти через:</div>
        <div className="flex flex-row mt-[15px]">
          <div className="flex justify-center items-center border-1 border-[#5970FF82] w-[96px] h-[31px] rounded-[3px] mr-[10px]">
            <img src={authGoogle} alt="auth-google" />
          </div>
          <div className="flex justify-center items-center border-1 border-[#5970FF82] w-[96px] h-[31px] rounded-[3px] mr-[10px]">
            <img src={authFacebook} alt="auth-facebook" />
          </div>
          <div className="flex justify-center items-center border-1 border-[#5970FF82] w-[96px] h-[31px] rounded-[3px] mr-[10px]">
            <img src={authYandex} alt="auth-yandex" />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={"/search"}></Navigate>
  );
}
