import Contact from "../Contact/Contact";
import { useEffect } from "react";
import css from "./ContactList.module.css";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  selectItems,
  selectFilteredContacts,
} from "../../redux/contacts/selectors";

export default function ContactList() {
  const { isLoading, error } = useSelector(selectItems);
  const filteredContacts = useSelector(selectFilteredContacts);

  useEffect(() => {
    if (error != null) {
      toast.error(`Something went wrong: ${error}`);
    }
  }, [error]);

  return (
    <div className={css.container}>
      {isLoading && <span className={css.loadingMessage}>Loading...</span>}
      <ul className={css.list}>
        {filteredContacts.length > 0 &&
          filteredContacts.map((contact) => {
            return (
              <li key={contact.id}>
                <Contact data={contact} />
              </li>
            );
          })}
      </ul>
    </div>
  );
}
