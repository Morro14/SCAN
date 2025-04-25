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
  const innCheck =
    7 * 7 + 7 * 2 + 1 * 10 + 0 * 3 + 1 * 5 + 3 * 9 + 7 * 4 + 0 * 6 + 6 * 8;
  const remainder = innCheck / 11;
  return (
    <div className="flex flex-col">
      <div>{innCheck}</div>
      <div>{remainder}</div>
      <Loading></Loading>
    </div>
  );
}
