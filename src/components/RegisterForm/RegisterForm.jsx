import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import { useDispatch } from "react-redux";
import { userRegister } from "../../redux/auth/usersOps";
import * as Yup from "yup";
import toast from "react-hot-toast";
import css from "./RegisterForm.module.css";

const initialValues = {
  name: "",
  email: "",
  password: "",
};
const validationSchema = Yup.object({
  name: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function RegisterForm() {
  const usernameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(userRegister(values))
      .unwrap()
      .then((data) => toast.success(`Welcome, ${data.user.name}`))
      .catch((error) => toast.error(error.message));
    actions.resetForm();
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <div className={css.inputContainer}>
            <label htmlFor={usernameId}>Username</label>
            <Field name="name" id={usernameId} className={css.input} />
            <ErrorMessage
              name="name"
              component="span"
              className={css.ErrorMessage}
            />
          </div>
          <div className={css.inputContainer}>
            <label htmlFor={emailId}>Email</label>
            <Field name="email" id={emailId} className={css.input} />
            <ErrorMessage
              name="email"
              component="span"
              className={css.ErrorMessage}
            />
          </div>
          <div className={css.inputContainer}>
            <label htmlFor={passwordId}>Password</label>
            <Field name="password" id={passwordId} className={css.input} />
            <ErrorMessage
              name="password"
              component="span"
              className={css.ErrorMessage}
            />
          </div>
          <button type="submit" className={css.button}>
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
}
