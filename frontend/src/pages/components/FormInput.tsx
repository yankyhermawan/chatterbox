import React, { ChangeEvent } from 'react';
import { IconType } from 'react-icons';

interface FormInputProps {
  placeholder: string;
  type: string;
  name: string;
  value: string;
  icon: IconType;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({ placeholder, type, name, value, icon: Icon, onChange }) => {
  return (
    <div className='relative py-2 text-center'>
      <Icon className='absolute'/>
      <input className='border rounded-md w-full' type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export default FormInput;