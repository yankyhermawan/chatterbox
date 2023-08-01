import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import IconMail from "../assets/icon-mail.svg";
import IconLock from "../assets/icon-lock.svg";
import IconUser from "../assets/icon-user-login.svg";
import IconFirst from "../assets/icon-first.svg";
import IconSecond from "../assets/icon-second.svg";

interface RegisterProps {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
  })
  .required();

function RegisterPage() {
  const [submitRegister, setSubmitRegister] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(userData: RegisterProps) {
    setSubmitRegister(true);
    try {
      await axios.post(
        "https://w24-group-final-group-3-production.up.railway.app/register",
        {
          firstName: userData.firstName,
          lastName: userData.lastName,
          username: userData.username,
          email: userData.email,
          password: userData.password,
          imageURL: "",
        }
      );

      navigate("/registersuccessful");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="flex justify-center items-center bg-medium-grey w-screen h-screen fixed top-0 left-0">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center space-y-4 md:space-y-6 w-full p-8 md:border border-text-grey rounded-xl max-w-[425px]"
        action="#"
      >
        <h1 className="text-body-bold text-white text-center mb-4">Register</h1>
        <div className="relative w-full flex flex-col items-start">
          <img
            className="absolute w-[20px] top-3 left-3"
            src={IconFirst}
            alt="icon-mail"
          />
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={field.value}
                  onChange={field.onChange}
                  className={`bg-medium-grey border-gray-300 pl-12 text-white sm:text-sm border outline-none border-text-grey ${
                    errors?.firstName && "border-red"
                  } rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                  placeholder="First Name"
                />
                {errors?.firstName && (
                  <p className="text-sm text-red text-input-medium">
                    {errors.firstName.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <div className="relative w-full flex flex-col items-start">
          <img
            className="absolute w-[20px] top-3 left-3"
            src={IconSecond}
            alt="icon-user"
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={field.value}
                  onChange={field.onChange}
                  className={`bg-medium-grey border-gray-300 pl-12 text-white sm:text-sm border outline-none border-text-grey ${
                    errors?.lastName && "border-red"
                  } rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                  placeholder="Last Name"
                />
                {errors?.lastName && (
                  <p className="text-sm text-red text-input-medium">
                    {errors.lastName.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <div className="relative w-full flex flex-col items-start">
          <img
            className="absolute w-[20px] top-3 left-3"
            src={IconUser}
            alt="icon-user"
          />
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={field.value}
                  onChange={field.onChange}
                  className={`bg-medium-grey border-gray-300 pl-12 text-white sm:text-sm border outline-none border-text-grey ${
                    errors?.username && "border-red"
                  } rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                  placeholder="Username"
                />
                {errors?.username && (
                  <p className="text-sm text-red text-input-medium">
                    {errors.username.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <div className="relative w-full flex flex-col items-start">
          <img
            className="absolute w-[20px] top-3 left-3"
            src={IconMail}
            alt="icon-mail"
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={field.value}
                  onChange={field.onChange}
                  className={`bg-medium-grey border-gray-300 pl-12 text-white sm:text-sm border outline-none border-text-grey ${
                    errors?.email && "border-red"
                  } rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                  placeholder="Email"
                />
                {errors?.email && (
                  <p className="text-sm text-red text-input-medium">
                    {errors.email.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <div className="relative w-full flex flex-col items-start">
          <img
            className="absolute w-[20px] top-3 left-3"
            src={IconLock}
            alt="icon-lock"
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Password"
                  className={`bg-medium-grey border-gray-300 pl-12 text-white sm:text-sm border outline-none border-text-grey ${
                    errors?.password && "border-red"
                  } rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                />
                {errors?.password && (
                  <p className="text-sm text-red text-input-medium">
                    {errors.password.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
        <button
          type="submit"
          disabled={submitRegister}
          className="w-full text-white text-body-medium bg-blue rounded-lg text-sm px-5 py-2 text-center active:bg-blue-hover"
        >
          Register
        </button>
        <p className="text-sm font-light text-center text-text-grey">
          Already a member ?{" "}
          <Link
            to="/login"
            className="font-medium mx-1 text-blue text-primary-500 hover:underline "
          >
            Login
          </Link>
        </p>
      </form>
    </section>
  );
}

export default RegisterPage;
