import css from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { deleteContactData } from "../../redux/contacts/contactsOps";

export default function Contact({ data: { name, number, id } }) {
  const dispatch = useDispatch();

  const onDelete = (evt) => {
    dispatch(deleteContactData(id));
    evt.target.disabled = true;
  };
  return (
    <div className={css.listItem}>
      <div className={css.dataContainer}>
        <p className={css.name}>{name}</p>
        <p className={css.number}>{number}</p>
      </div>
      <button className={css.button} onClick={onDelete}>
        Delete
      </button>
    </div>
  );
}
