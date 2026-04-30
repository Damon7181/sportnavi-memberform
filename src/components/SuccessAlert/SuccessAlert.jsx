import Alert from "@mui/material/Alert";
import "./SuccessAlert.css";

export default function SuccessAlert({ show }) {
  if (!show) return null;
  return (
    <Alert severity="success" className="success-alert">
      Member Added Successfully
    </Alert>
  );
}
