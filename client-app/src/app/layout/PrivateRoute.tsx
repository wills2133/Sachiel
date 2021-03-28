import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";
import { useStore } from "../stores/store";

interface Props extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export default function PrivateRoute({component: Componet, ...rest}: Props) {
    const {userStore: {isLoggedIn}} = useStore();
    return (
        <Route
            {...rest}
            render={(props) => isLoggedIn ? <Componet {...props} /> : <Redirect to='/' />}
        />
    )
}