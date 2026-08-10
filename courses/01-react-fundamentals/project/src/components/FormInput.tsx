import type { ChangeEvent } from "react";

export interface FormInputProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  error?: string;
  name: string;
}

export default function FormInput({ label, id, value, onChange, type = "text", placeholder, error, name }: FormInputProps) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
      />
      {error && <p>{error}</p>}
    </>
  );
}