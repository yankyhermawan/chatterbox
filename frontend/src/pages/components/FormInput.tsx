import React, { ChangeEvent } from 'react';

interface FormInputProps {
  placeholder: string;
  type: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({ placeholder, type, name, value, onChange }) => {
  return (
    <div className='relative py-2 text-center'>
      <input className='border rounded-md w-full' type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export default FormInput;