import React, { useState, ChangeEvent, FormEvent } from 'react';
import FormInput from './components/FormInput';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
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
    <div className="w-screen h-screen bg-slate-300">
       <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <FormInput
          label="E-mail"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
         <FormInput
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
