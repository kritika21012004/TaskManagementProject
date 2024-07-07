import React from "react";
import '../styles/Textbox.css';

const Textbox = React.forwardRef(
  ({ type, placeholder, label, register, name, error, value,onChange }, ref) => {
    return (
      <div className='textbox'>
        {label && (
          <label htmlFor={name} className='label'>
            {label}
          </label>
        )}

        <div>
          <input
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            ref={ref}
            {...register}
            aria-invalid={error ? "true" : "false"}
            className='input'
            onChange={onChange}
          />
        </div>
        {error && (
          <span className='error'>{error}</span>
        )}
      </div>
    );
  }
);
export default Textbox;