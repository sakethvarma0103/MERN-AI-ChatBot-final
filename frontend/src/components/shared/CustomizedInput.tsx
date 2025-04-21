import React from "react";
import TextField from "@mui/material/TextField";

type Props = {
  name: string;
  type: string;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Optional onChange handler
};

const CustomizedInput = (props: Props) => {
  return (
    <TextField
      margin="normal"
      InputLabelProps={{ style: { color: "white" } }}
      name={props.name}
      label={props.label}
      type={props.type}
      onChange={props.onChange} // Added onChange prop
      InputProps={{
        style: {
          width: "400px",
          borderRadius: 10,
          fontSize: 20,
          color: "white",
        },
      }}
    />
  );
};

export default CustomizedInput;
