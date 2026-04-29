import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import "./MemberForm.css";

export default function MemberForm() {
  const intialValues = { firstName: "", lastName: "", email: "", iban: "" };
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  //Onchange function
  const handleChange = (evt) => {
    // console.log(evt.target);
    const { name, value } = evt.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues);
  };
  //OnSubmit function
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  };

  //validations
  const validate = (values) => {
    const errors = {};
    const NameRegex = /^[A-Za-z]+$/i;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/i;
    const ibanRegex = /^[0-9]+$/;
    const spaceRemoval = values.iban.replace(/\s+/g,"");
    const invalidEntryCheck = /[^0-9\s]/;
    const ibanLength = 20; //Only for German Accounts
    
    // /^([A-Z]{2}[ '+'\\\\'+'-]?[0-9]{2})(?=(?:[ '+'\\\\'+'-]?[A-Z0-9]){9,30}\$)((?:[ '+'\\\\'+'-]?[A-Z0-9]{3,5}){2,7})([ '+'\\\\'+'-]?[A-Z0-9]{1,3})?\$/i;

    if (!values.firstName) {
      errors.firstName = "First Name is required!";
    } else if (!NameRegex.test(values.firstName)) {
      errors.firstName = "Must be all characters!";
    }
    if (!values.lastName) {
      errors.lastName = "Last Name is required!";
    } else if (!NameRegex.test(values.lastName)) {
      errors.lastName = "Must be all characters!";
    }
    if (!values.email) {
      errors.email = "Email is required !";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Enter a valid email address!";
    }
    if (!values.iban.trim()) {
      errors.iban = "IBAN is required!";
    } else if (invalidEntryCheck.test(values.iban)) {
      errors.iban = "IBAN must only have numbers or spaces ";
    }
    else if (!ibanRegex.test(spaceRemoval)) {
      errors.iban = "IBAN must be 20 Digits (German)";
    } else if (spaceRemoval.length !== ibanLength){
       errors.iban = `IBAN must be ${ibanLength} digits (German IBAN)`;
    }
    return errors;
  };
  return (
    <div className="container">
      {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
      <form onSubmit={handleSubmit}>
        <h1>Member Registration</h1>
        <p className="instruction">Complete a form below</p>

        <TextField
          className="fName"
          name="firstName"
          label="First Name*"
          variant="outlined"
          value={formValues.firstName}
          onChange={handleChange}
          error={!!formErrors.firstName}
          helperText={formErrors.firstName}
        />

        <TextField
          className="lName"
          name="lastName"
          label="Last Name*"
          variant="outlined"
          value={formValues.lastName}
          onChange={handleChange}
          error={!!formErrors.lastName}
          helperText={formErrors.lastName}
        />

        <TextField
          className="email"
          name="email"
          label="Email*"
          variant="outlined"
          value={formValues.email}
          onChange={handleChange}
          error={!!formErrors.email}
          helperText={formErrors.email}
        />

        <TextField
          className="iban"
          name="iban"
          label="IBAN*"
          variant="outlined"
          value={formValues.iban}
          onChange={handleChange}
          error={!!formErrors.iban}
          helperText={formErrors.iban}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">DE</InputAdornment>
              ),
            },
          }}
        />

        <FormControlLabel
          control={<Checkbox />}
          label={
            <span>
              I agree to the{" "}
              <a href="#Term-of-Services" style={{ color: "black" }}>
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#Privacy Policy" style={{ color: "blue" }}>
                Privacy Policy
              </a>
            </span>
          }
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
