import React from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { Formik, Form, Field } from "formik";
import "./style.css";
import * as yup from "yup";
import { login } from "../../../store/reducers/actionCreator";
import { useAppSelector } from "../../../hooks/useAppSelector";
import Loader from "../../../components/Loader/Loader";

const initialValues = {
  email: "",
  password: "",
};

type FormValues = typeof initialValues;

const validationSchema = yup.object().shape({
  email: yup.string().required("Required").email("Invalid email address"),
  password: yup.string().min(5).required("Required"),
});

const LoginFormComponent = () => {
  const dispatch = useAppDispatch();
  const { loading, errorLogin } = useAppSelector((state) => state.userReducer);

  const signIn = (email: string, password: string) => {
    dispatch(login({ email, password }));
  };

  const onSubmit = async (values: FormValues) => {
    signIn(values.email, values.password);
  };

  return (
    <>
      {loading && <Loader></Loader>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form className="signIn__form">
            <label htmlFor="signIn__email">Email</label>
            <Field name="email" placeholder="Email" className="signIn__input" id="signIn__email"/>
            {touched.email && errors.email && (
              <div className="signIn__required">{errors.email}</div>
            )}
            <label htmlFor="signIn__password">Password</label>
            <Field
              name="password"
              placeholder="Password"
              className="signIn__input"
              type="password"
              id="signIn__password"
            />
            {touched.password && errors.password && (
              <div className="signIn__required">{errors.password}</div>
            )}
            <button type="submit" className="signIn__btn">
              Login
            </button>
            {errorLogin && <div className="signIn__error">{errorLogin}</div>}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginFormComponent;
