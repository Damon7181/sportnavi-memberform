import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./TermsAndCondition.css";

export default function TermsAndCondition({ checked, onChange, error }) {
  return (
    <div className="terms-condition">
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={onChange} />}
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

      {error && <p className="terms-error">{error}</p>}
    </div>
  );
}
