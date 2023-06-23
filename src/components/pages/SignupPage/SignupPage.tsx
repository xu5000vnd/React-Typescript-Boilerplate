import React from "react";
import SignupForm from "../../molecules/SignupForm/SignupForm";

const SignupPage: React.FC = ({
  children,
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <div>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
