import React, { useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import "../../Styles/RecomendStyle.css";

const RadioButton = ({ options, clickPlace }) => {
  const [value, setValue] = useState("");

  const click = (value) => {
    //console.log("RadioButton Conponent : " + value);
    setValue(value);
  };

  return (
    <ButtonGroup toggle>
      {options.map((option) => (
        <ToggleButton
          key={option.value}
          type="radio"
          variant="outline-primary"
          checked={value === option.value}
          value={option.value}
          onClick={() => {
            clickPlace(option.value);
            click(option.value);
          }}
          className={`btnGroup ${value === option.value ? "active" : ""}`}
        >
          {option.label}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
};

export default RadioButton;
