import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import Checkbox from "@mui/material/Checkbox";
// import FormControlLabel from "@mui/material/FormControlLabel";
import TermsAndCondition from "../TermsAndCondition/TermsAndCondition";
import InputAdornment from "@mui/material/InputAdornment";
import logo from "../../assets/Sportnavi-Logo-RGB.svg";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import "./MemberForm.css";

export default function MemberForm() {
  const initialValues = { firstName: "", lastName: "", email: "", iban: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  //For Checkbox
  const [isChecked, setIsChecked] = useState(false);
  //For Successfull submission
  const [success, setSuccess] = useState(false);

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
    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log(formValues);

      setSuccess(true);
      setFormValues(initialValues);
      setIsChecked(false);
    } else {
      setSuccess(false);
    }
  };

  // Alert Timeout
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);
  //validations
  const validate = (values) => {
    const errors = {};
    const NameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/;
    const maxLengthOfName = 50;
    const minLengthOfName = 2;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/i;
    const ibanRegex = /^[0-9]+$/;
    const spaceRemoval = values.iban.replace(/\s+/g, "");
    const invalidEntryCheck = /[^0-9\s]/;
    const ibanLength = 20; //Only for German Accounts

    // console.log(values.firstName .length);
    if (!values.firstName) {
      errors.firstName = "First Name is required!";
    } else if (!NameRegex.test(values.firstName)) {
      errors.firstName = "Must be all characters!";
    } else if (
      values.firstName.length < minLengthOfName ||
      values.firstName.length > maxLengthOfName
    ) {
      errors.firstName = "Must contain 2-50 Characters";
    }
    if (!values.lastName) {
      errors.lastName = "Last Name is required!";
    } else if (!NameRegex.test(values.lastName)) {
      errors.lastName = "Must be all characters!";
    } else if (
      values.lastName.length < minLengthOfName ||
      values.lastName.length > maxLengthOfName
    ) {
      errors.lastName = "Must contain 2-50 Characters";
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
    } else if (spaceRemoval.length !== ibanLength) {
      errors.iban = `IBAN must be ${ibanLength} digits (German IBAN)`;
    }
    if (!isChecked) {
      errors.terms = "You must accept Terms & Conditions";
      // console.log(errors.terms);
    }
    return errors;
  };

  return (
    <div className="member-registration">
      <div className="container">
        {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
        <form onSubmit={handleSubmit}>
          {/* {success && (
            <Alert severity="success">Member Added Successfully</Alert>
          )} */}
          <SuccessAlert show={success} />

          <div className="img-container">
            <a href="https://www.sportnavi.de/" target="_blank">
              {" "}
              <img src={logo} alt="Logo" />{" "}
            </a>
          </div>
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
          <div className="terms-condition">
            <TermsAndCondition
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              error={formErrors.terms}
            />
          </div>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
