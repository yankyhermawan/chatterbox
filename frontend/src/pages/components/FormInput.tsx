import React, { ChangeEvent } from 'react';

interface FormInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({ label, type, name, value, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} />
    </div>
  );
};

export default FormInput;