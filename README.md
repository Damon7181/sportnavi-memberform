# Member Registration Form

## Overview

This project is a simple Member Registration Form built using React.
The goal of this assignment is to demonstrate handling of:

- Form inputs
- Validation logic
- User experience
- Real-time feedback

---

## Features

- Input fields for:
  - First Name
  - Last Name
  - Email
  - IBAN
- Full form validation
- Real-time error feedback using Material UI
- IBAN validation with support for spaces
- Clean and user-friendly UI

---

## Technologies Used

- React
- JavaScript (ES6+)
- Material UI (MUI)
- CSS

---

## Validation Rules

### First Name & Last Name
- Must not be empty
- Must contain only letters
- Minimum 2 characters required

---

### Email
- Must not be empty
- Must follow a valid email format

---

### IBAN (German IBAN)
- Must not be empty
- Must contain only numbers (spaces allowed)
- Spaces are removed before validation
- Must be exactly 20 digits
- Rejects:
  - Letters
  - Special characters

---

### Terms & Conditions
- User must accept Terms of Service and Privacy Policy before submitting

---

## UX Considerations

- Instant validation feedback using helper text and error states
- Clear and descriptive error messages
- Input normalization (e.g., removing spaces in IBAN)
- Clean and responsive layout

---

## How to Run

1. Clone the repository
git clone https://github.com/Damon7181/sportnavi-memberform.git
2. Navigate to the project folder
cd Adding-Members
3. Install dependencies
npm install
4. Run the development server
npm run dev


---

## Notes

- Validation is implemented manually using useState
- No external form libraries (like React Hook Form or Zod) were used to demonstrate understanding of core concepts

---

## Conclusion

This project demonstrates understanding of:

- Controlled components in React
- Form validation strategies
- Regex-based validation
- UX-focused form design

---

## Author

Ubaid ur Rehman