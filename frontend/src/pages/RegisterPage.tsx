import React, { useState, ChangeEvent, FormEvent } from 'react';
import FormInput from './components/FormInput';
import { RiUserFill, RiLockPasswordFill, RiMailFill } from 'react-icons/ri'

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission here (e.g., sending data to a server)
    console.log(formData);
  };

  return (
    <div className='bg-medium-grey flex flex-col items-center mx-auto justify-center w-screen h-screen'>
      <div className='rounded-xl border-white border shadow-xl p-10 max-w-50'>
        <h1 className='text-white font-bold'>Register</h1>
        <form onSubmit={handleSubmit}>
        <FormInput
          icon={RiUserFill}
          placeholder="    Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <FormInput
          icon={RiMailFill}
          placeholder="    Email"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <FormInput
          icon={RiLockPasswordFill}
          placeholder="    Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button className='text-white bg-blue rounded-md border w-full' type="submit">Register</button>
        <div className='py-4 text-center'>
          <p className='text-white font-thin'>Already a member? Login</p>
        </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;