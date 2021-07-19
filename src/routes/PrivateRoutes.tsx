import React, { useContext } from "react";
import { Route, RouteProps } from "react-router-dom";
import AuthContext from "../contexts/auth";
import Layout from "../layout";
import CreateBook from "../pages/Book/Create";
import ListBook from "../pages/Book/List";
import Home from "../pages/Home";

const AuthRoute: React.FC<RouteProps> = ({ ...rest }) => {
  const { signed } = useContext(AuthContext);

  if (signed) return <Route {...rest} />;

  return null;
};

const PrivateRoutes: React.FC = () => {
  return (
    <>
      <Layout>
      <AuthRoute exact path="/app/books/new" component={CreateBook} />
      <AuthRoute exact path={`/app/books/update/:id`} component={CreateBook} />
      <AuthRoute exact path="/app/books" component={ListBook} />
      <AuthRoute exact path="/app" component={Home} />
      </Layout>
    </>
  );
};

export default PrivateRoutes;
