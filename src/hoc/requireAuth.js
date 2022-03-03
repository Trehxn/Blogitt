import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const requireAuth = (Component) => {
  const ComposedComponent = ({ ...rest }) => {
    const user = useSelector((state) => {
      console.log(state);
      return state.auth.user;
    });
    const navigate = useNavigate();

    console.log(user);

    useEffect(() => {
      console.log(user);
      if (!user) navigate("/login");
    }, [user]);

    const checkStatus = () => {
      if (user) {
        return <Component {...rest} />;
      } else {
        return null;
      }
    };
    return checkStatus();
  };

  return ComposedComponent;
};

export default requireAuth;
