import { useEffect } from "react";
import { useSelector, connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const requireAuth = (Component) => {
  const ComposedComponent = ({ user, ...rest }) => {
    // const user = useSelector((state) => {
    //   console.log(state);
    //   return state.auth.user;
    // });
    const navigate = useNavigate();

    console.log(user);

    useEffect(() => {
      console.log(user);
      if (!user) navigate("/signin");
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

  const mapStateToProps = (state) => {
    return { user: state.auth.user };
  };
  return connect(mapStateToProps)(ComposedComponent);
};

export default requireAuth;
