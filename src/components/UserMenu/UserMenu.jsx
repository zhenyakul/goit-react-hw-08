import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { userLogOut } from "../../redux/auth/usersOps";
import css from "./UserMenu.module.css";

export default function UserMenu() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  return (
    <div className={css.container}>
      <p className={css.message}>Welcome, {user.name}</p>
      <button
        type="button"
        className={css.button}
        onClick={() => dispatch(userLogOut())}
      >
        Log out
      </button>
    </div>
  );
}
