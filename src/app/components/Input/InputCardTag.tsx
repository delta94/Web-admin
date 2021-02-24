/* eslint-disable react-hooks/exhaustive-deps */
/* Still Bugs in this commponent, please take care bro, pls use pure input instead of */
import React, { useState, useRef } from 'react';

type Props = {
  disabled?: boolean;
  name?: string;
  id?: string;
  title?: string;
  placeholder?: string;
  error?: boolean;
  type?: string;
  value?: any;
  style?: any;
  onBlur: (val: any) => void;
  onValueChange: (val: any) => void;
};

type InputElement = HTMLInputElement | HTMLTextAreaElement;
type InputChangeEvent = React.ChangeEvent<InputElement>;

const InputCardTag = ({
  disabled,
  name,
  id,
  title,
  type,
  value,
  placeholder,
  error,
  onValueChange,
  onBlur,
  style,
}: Props) => {
  const [inputVal, setInputVal] = useState(value);
  let inputDelayRef: any = useRef(null);

  const handleOnChange = (e: InputChangeEvent) => {
    const newInputVal = e.target.value;
    setInputVal(newInputVal);

    if (inputDelayRef.current) {
      clearTimeout(inputDelayRef.current);
    }
    inputDelayRef.current = setTimeout(() => onValueChange(newInputVal), 300);
  };

  return (
    <div
      className={
        error
          ? 'form-group d-flex align-items-center has-error'
          : 'form-group d-flex align-items-center'
      }
    >
      <label className="col-sm-3 control-label text-edit mb-0">{title}</label>
      <input
        style={style ? style : null}
        value={value !== '' ? inputVal : ''}
        disabled={disabled}
        name={name}
        type={type !== '' ? type : 'text'}
        className="form-control"
        id={id}
        placeholder={placeholder}
        autoComplete="off"
        onChange={handleOnChange}
        onBlur={onBlur}
      />
      {error && <div className="validation-rule">{error}</div>}
    </div>
  );
};

export default InputCardTag;
