import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import { useDispatch } from "react-redux";
import { addContactData } from "../../redux/contacts/contactsOps";
import css from "./ContactForm.module.css";
import toast from "react-hot-toast";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, "Too short!!!")
    .max(30, "Name can contain only 30 char!!!")
    .required("Is required!!!"),
  number: Yup.string().min(9, "Number is invalid").required("Is required!!!"),
});

const initialValues = {
  name: "",
  number: "",
};

export default function ContactForm() {
  const nameId = useId();
  const numberId = useId();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(addContactData(values))
      .unwrap()
      .then((data) => {
        toast.success(`Contact ${data.name} added successfully`);
      })
      .catch((error) => {
        toast.error("Something went wrong. Try again");
      });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ContactSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.inputContainer}>
          <label htmlFor={nameId}>Name</label>
          <Field name="name" id={nameId} className={css.input} />
          <ErrorMessage
            name="name"
            component="span"
            className={css.ErrorMessage}
          />
        </div>
        <div className={css.inputContainer}>
          <label htmlFor={numberId}>Number</label>
          <Field name="number" id={numberId} className={css.input} />
          <ErrorMessage
            name="number"
            component="span"
            className={css.ErrorMessage}
          />
        </div>
        <button type="submit" className={css.button}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
