import { GoogleLogin } from "@react-oauth/google";

import { useAuth } from "../contexts/AuthContext"; // Import your auth context
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const { loginWithGoogle } = useAuth(); // Assuming you have this method in your context

  const handleSuccess = async (credentialResponse) => {
    try {
      if (loginWithGoogle) {
        const success = await loginWithGoogle(credentialResponse.credential);
        if (success) {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Google login failed:", error);
      // You might want to add error state handling here
    }
  };

  return (
    <div className="google-login-wrapper">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.error("Google Login Failed")}
        useOneTap
        shape="rectangular"
        size="large"
        text="signin_with"
      />
    </div>
  );
};

export default GoogleLoginButton;
