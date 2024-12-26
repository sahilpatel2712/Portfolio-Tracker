import React from "react";

interface InputProps {
  label?: string;
  placeholder?: string;
  type: "text" | "number" | "password" | "email" | "url" | "tel" | "search";
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  name?: string;
  required?: boolean;
  error?: string | null;
  classes?: string;
  iconClass?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  autocomplete?: string;
}

const TextInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      placeholder,
      type = "text",
      value,
      onChange,
      name,
      required = false,
      error,
      classes,
      autocomplete,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label
            className="text-sm font-semibold text-white mb-1"
            htmlFor={name}
          >
            {label}
          </label>
        )}
        <div className="w-full relative">
          <input
            ref={ref}
            onChange={onChange}
            name={name}
            value={value}
            id={name}
            type={type}
            className={`w-full shadow rounded-md px-4 py-2 focus:outline-none focus:shadow-none focus:ring-0 text-black ${
              error ? "border-red-500" : ""
            } ${classes}`}
            required={required}
            {...props}
            placeholder={placeholder}
            autoComplete={autocomplete || ""}
          />
        </div>
        {error && (
          <p className="m-0 text-red-500 font-bold text-[13px] ms-2 mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

export default TextInput;
