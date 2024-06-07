import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { userLogIn } from "../../redux/auth/usersOps";
import toast from "react-hot-toast";
import css from "./LoginForm.module.css";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LoginForm() {
  const emailId = useId();
  const passwordId = useId();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(userLogIn(values))
      .unwrap()
      .then((data) => {
        toast.success(`Welcome back, ${data.user.name}`);
      })
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
            <label htmlFor={emailId}>Email</label>
            <Field name="email" id={emailId} className={css.input} />
            <ErrorMessage name="email" className={css.ErrorMessage} />
          </div>
          <div className={css.inputContainer}>
            <label htmlFor={passwordId}>Password</label>
            <Field name="password" id={passwordId} className={css.input} />
            <ErrorMessage name="password" className={css.ErrorMessage} />
          </div>
          <button type="submit" className={css.button}>
            Log in
          </button>
        </Form>
      </Formik>
    </div>
  );
}
