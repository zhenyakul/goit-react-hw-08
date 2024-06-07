import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/filters/filterSlice";
import { selectFilter } from "../../redux/filters/selectors";
import css from "./SearchBox.module.css";

export default function SearchBox() {
  const inputId = useId();
  const dispatch = useDispatch();
  const filterValue = useSelector(selectFilter);
  return (
    <div className={css.container}>
      <label htmlFor={inputId}>Find contacts by name</label>
      <input
        className={css.searchBox}
        type="text"
        id={inputId}
        onChange={(event) => {
          dispatch(setFilter(event.target.value));
        }}
        value={filterValue}
      />
    </div>
  );
}
