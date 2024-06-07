import { lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import css from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { userRefresh } from "../../redux/auth/usersOps";
import { selectIsRefreshing } from "../../redux/auth/selectors";
import RestrictedRoute from "../RestrictedRoute/RestrictedRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

function App() {
  const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
  const ContactsPage = lazy(() =>
    import("../../pages/ContactsPage/ContactsPage")
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userRefresh());
  }, [dispatch]);

  const isRefreshing = useSelector(selectIsRefreshing);
  return (
    <div className={css.container}>
      {isRefreshing ? (
        <b>Please wait...</b>
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/contacts"
              element={
                <PrivateRoute
                  component={<ContactsPage />}
                  redirectTo="/login"
                />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute
                  component={<LoginPage />}
                  redirectTo="/contacts"
                />
              }
            />
            <Route
              path="/Registration"
              element={
                <RestrictedRoute component={<RegisterPage />} redirectTo="/" />
              }
            />
          </Routes>
        </Layout>
      )}
    </div>
  );
}

export default App;
