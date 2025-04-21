import { selectUsername, authReducer } from "~/redux/authSlice";
import { useDispatch, useStore } from "react-redux";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";

export default function TestEl() {
  const store = useStore();
  const username = useAppSelector(selectUsername);
  const usernameFromStore = store.getState();
  console.log(usernameFromStore);
  console.log("username", username);
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(authReducer({ username: "new name 1" }));
    console.log(username);
  }

  return (
    <>
      <div className="flex justify-center p-5">
        <button onClick={handleClick} className="btn bg-blue-501 text-white">
          Click
        </button>
        <div className="bg-viridian-500 w-[200px] h-[24px] text-white ml-2">
          {username}
          {/* {usernameFromStore.auth.username} */}
        </div>
      </div>
    </>
  );
}
