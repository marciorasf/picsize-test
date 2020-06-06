import React, { Fragment, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Container,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(6, 1, 2, 1),
    display: "flex",
  },
  form: {
    margin: theme.spacing(5, 2),
  },
  firstButton: {
    marginTop: theme.spacing(1),
  },
  gridTwoRows: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "0.75rem",
    fontWeight: 900,
  },
  value: {
    fontSize: "1.25rem",
    fontWeight: 500,
  },
}));

export default function Simulacao(props) {
  const classes = useStyles();

  const [infoSimulacao, setInfoSimulacao] = useState({});

  const parcelas = [
    { data: "20/07/1998", valor: "R$ 34 000,46" },
    { data: "21/07/1998", valor: "R$ 34 000,46" },
    { data: "22/07/1998", valor: "R$ 34 000,46" },
    { data: "23/07/1998", valor: "R$ 34 000,46" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(infoSimulacao);
  };

  return (
    <Fragment>
      <Container component='div' maxWidth='xs'>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={6} className={classes.gridTwoRows}>
              <span className={classes.label}>VALOR REQUERIDO:</span>
              <span className={classes.value}>R$ 100.000,00</span>
            </Grid>
            <Grid item xs={6} className={classes.gridTwoRows}>
              <span className={classes.label}>TAXA DE JUROS:</span>
              <span className={classes.value}>1%</span>
            </Grid>
            <Grid item xs={12} className={classes.gridTwoRows}>
              <span className={classes.label}>PAGAR EM:</span>
              <span className={classes.value}>3 meses</span>
            </Grid>
            <Grid item xs={12} className={classes.gridTwoRows}>
              <span className={classes.label}>PROJEÇÃO DAS PARCELAS:</span>
              <TableContainer>
                <Table className={classes.table} size='small'>
                  <TableBody>
                    {parcelas.map((row) => (
                      <TableRow key={row.data}>
                        <TableCell scope='row'>{row.data}</TableCell>
                        <TableCell align='right'>{row.valor}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow key='total'>
                      <TableCell scope='row'>Total</TableCell>
                      <TableCell align='right'>Total</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} className={classes.gridTwoRows}>
              <Button type='submit' variant='contained' fullWidth color='primary' className={classes.firstButton}>
                EFETIVAR O EMPRÉSTIMO
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Fragment>
  );
}
