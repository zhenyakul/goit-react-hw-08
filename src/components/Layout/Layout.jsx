import { Toaster } from "react-hot-toast";
import { AppBar } from "../AppBar/AppBar";
import css from "./Layout.module.css";
import { Suspense } from "react";

export default function Layout({ children }) {
  return (
    <div className={css.container}>
      <AppBar />
      <Suspense fallback={null}>{children}</Suspense>
      <Toaster
        position="top-center"
        containerClassName=""
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </div>
  );
}
