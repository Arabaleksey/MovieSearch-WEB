import React from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { Formik, Form, Field } from "formik";
import "./style.css";
import * as yup from "yup";
import { registration } from "../../../store/reducers/actionCreator";
import { useAppSelector } from "../../../hooks/useAppSelector";
import Loader from "../../../components/Loader/Loader";

const initialValues = {
  name: "",
  surname: "",
  email: "",
  password: "",
};

type FormValues = typeof initialValues;

const validationSchema = yup.object().shape({
  name: yup.string().required("Required"),
  surname: yup.string().required("Required"),
  email: yup.string().required("Required").email("Invalid email address"),
  password: yup.string().min(5).required("Required"),
});

const RegistrationFormComponent = () => {
  const dispatch = useAppDispatch();
  const { loading, errorRegistration } = useAppSelector(
    (state) => state.userReducer
  );

  const signUp = (
    name: string,
    surname: string,
    email: string,
    password: string
  ) => {
    dispatch(registration({ name, surname, email, password }));
  };

  const onSubmit = async (values: FormValues) => {
    signUp(values.name, values.surname, values.email, values.password);
  };

  return (
    <div>
      {loading && <Loader></Loader>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form className="signIn__form">
            <label htmlFor="name">Name</label>
            <Field
              name="name"
              placeholder="Name"
              className="signIn__input"
              id="name"
            />
            {touched.name && errors.name && (
              <div className="signIn__required">{errors.name}</div>
            )}
            <label htmlFor="surname">Surname</label>
            <Field
              name="surname"
              placeholder="Surname"
              className="signIn__input"
              id="surname"
            />
            {touched.surname && errors.surname && (
              <div className="signIn__required">{errors.surname}</div>
            )}
            <label htmlFor="email">Email</label>
            <Field
              name="email"
              placeholder="Email"
              className="signIn__input"
              id="email"
            />
            {touched.email && errors.email && (
              <div className="signIn__required">{errors.email}</div>
            )}
            <label htmlFor="password">Password</label>
            <Field
              name="password"
              placeholder="Password"
              className="signIn__input"
              type="password"
              id="password"
            />
            {touched.password && errors.password && (
              <div className="signIn__required">{errors.password}</div>
            )}
            <button type="submit" className="signIn__btn">
              Registration
            </button>
          </Form>
        )}
      </Formik>
      {errorRegistration && (
        <div className="signIn__error">{errorRegistration}</div>
      )}
      <p className="message">
        After registration <span>activate</span> your account by mail to get
        access to saving the movie!
      </p>
    </div>
  );
};

export default RegistrationFormComponent;
