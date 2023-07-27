import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import axios from 'axios';
import { useState } from 'react';

interface RegisterProps {
  name: string;
  email: string;
  password: string;
}

const schema = yup
  .object({
    name: yup.string().required(),
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
      await axios.post('', {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });

      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className='bg-medium-grey'>
      <div className='flex flex-col items-center justify-center h-screen w-screen px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-2/4 bg-medium-grey overflow-hidden rounded-lg shadow border mt-0 max-w-md p-0 '>
          <div className='p-6 space-y-4'>
            <h1 className=' text-white text-center text-body-bold'>
              Register
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 md:space-y-6' action='#'>
              <div>
                <Controller
                  name='name'
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        type='text'
                        name='name'
                        id='name'
                        value={field.value}
                        onChange={field.onChange}
                        className='bg-white border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 '
                        placeholder='Name'
                      />
                      {errors?.name && (
                        <p className='mt-2 text-sm text-red'>
                          {errors.name.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>

              <div>
                <Controller
                  name='email'
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        type='text'
                        name='email'
                        id='email'
                        value={field.value}
                        onChange={field.onChange}
                        className='bg-white border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                        placeholder='Email'
                      />
                      {errors?.email && (
                        <p className='mt-2 text-sm text-red'>
                          {errors.email.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>

              <div>
                <Controller
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        type='password'
                        name='password'
                        id='password'
                        value={field.value}
                        onChange={field.onChange}
                        placeholder='Password'
                        className='bg-white border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                      />
                      {errors?.password && (
                        <p className='mt-2 text-sm text-red'>
                          {errors.password.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
              <button
                type='submit'
                disabled={submitRegister}
                className='w-full text-white bg-blue rounded-lg text-sm my-3 px-5 py-3 text-center'
                >Register</button>
              <p className='text-sm font-light text-center text-white'>
                Already a member ? {" "}
                <Link
                  to='/login'
                  className='font-medium mx-1 text-white hover:underline '>
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;