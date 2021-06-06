import { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router";
import userContext from "../../hooks/userContext";

const UnauthRoute : React.FC<RouteProps>= ({ children, ...props}) => {
    const { connected } = useContext(userContext);
    return !connected ? <Route  {...props}>{children}</Route> : <Redirect to="/chat" />;
}

export default UnauthRoute;