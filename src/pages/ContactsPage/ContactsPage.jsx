import { useDispatch } from "react-redux";
import ContactForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import SearchBox from "../../components/SearchBox/SearchBox";
import { useEffect } from "react";
import { fetchContactsData } from "../../redux/contacts/contactsOps";

export default function ContactsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsData());
  }, [dispatch]);
  return (
    <>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </>
  );
}
