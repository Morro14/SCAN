import { selectUsername, authReducer, selectAuth } from "~/redux/authSlice";
import { useDispatch, useStore } from "react-redux";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import Loading from "~/components/Loading";

export default function TestEl() {
  // const auth = useAppSelector(selectAuth);

  // console.log("auth", auth);
  // const dispatch = useAppDispatch();

  // function handleClick() {
  //   dispatch(authReducer({ auth: "true" }));
  //   console.log(auth);
  // }

  return (
    <div>
      {/* <div className="flex justify-center p-5">
        <button onClick={handleClick} className="btn bg-blue-501 text-white">
          Click
        </button>
        <div className="bg-viridian-500 w-[200px] h-[24px] text-white ml-2">
          {auth}

        </div>
      </div> */}
      <Loading></Loading>
    </div>
  );
}
