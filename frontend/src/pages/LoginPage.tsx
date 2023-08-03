import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import IconMail from "../assets/icon-mail.svg";
import IconLock from "../assets/icon-lock.svg";

interface LoginProps {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
  })
  .required();

function LoginPage() {
  const [submitLogin, setSubmitLogin] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(formData: LoginProps) {
    setSubmitLogin(true);
    try {
      const response = await axios.post(
        "https://w24-group-final-group-3-production.up.railway.app/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );
      if (response.data.status === "success") {
        localStorage.setItem("userID", response.data.userID);
        localStorage.setItem("access_token", response.data.access_token);
        navigate("/");
      } else if (response.data.status === "error") {
        setErrorMessage("Incorrect email or password. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred during login. Please try again later.");
    } finally {
      setSubmitLogin(false);
    }
  }
  return (
    <section className="flex justify-center items-center bg-medium-grey w-screen h-screen fixed top-0 left-0">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center space-y-4 md:space-y-6 w-full p-8 md:border border-text-grey rounded-xl max-w-[425px]"
        action="#"
      >
        <h1 className="text-body-bold text-white text-center mb-4">Login</h1>
        <div className="relative w-full flex flex-col items-start">
          <img
            className="absolute w-[20px] top-3 left-3"
            src={IconMail}
            alt="icon-mail"
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
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
            defaultValue=""
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
         <div className="text-red text-sm text-center text-input-medium">
          {errorMessage}
        </div>
        <button
          type="submit"
          disabled={submitLogin}
          className="w-full text-white text-body-medium bg-blue rounded-lg text-sm px-5 py-2 text-center active:bg-blue-hover"
        >
          Login
        </button>
        <p className="text-sm font-light text-center text-text-grey">
          Don't have an account yet?{" "}
          <Link
            to="/register"
            className="font-medium mx-1 text-blue text-primary-500 hover:underline "
          >
            Register
          </Link>
        </p>
      </form>
    </section>
  );
}

export default LoginPage;
