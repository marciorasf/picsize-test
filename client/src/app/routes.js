import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import { Formulario, Simulacao } from "../pages";

export default function Routes() {
  return (
    <Fragment>
      <Switch>
        <Route exact path='/' component={Formulario} />
        <Route exact path='/resultado' component={Simulacao} />
      </Switch>
    </Fragment>
  );
}
