import { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router";
import userContext from "../../hooks/userContext";

const Authroute : React.FC<RouteProps> = ({ children, ...props}) => {
    const { connected } = useContext(userContext);
    return connected ? <Route  {...props}>{children}</Route> : <Redirect to="/login" />;
}

export default Authroute;