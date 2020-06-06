import React, { Fragment, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Grid,
  Container,
  InputAdornment,
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
}));

export default function Formulario(props) {
  const classes = useStyles();

  const [infoFormulario, setInfoFormulario] = useState({});

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setInfoFormulario({
      ...infoFormulario,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(infoFormulario);
  };

  return (
    <Fragment>
      <Container component='div' maxWidth='xs'>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField required variant='outlined' fullWidth name='CPF' label='CPF' onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField required variant='outlined' fullWidth name='UF' label='UF' onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                variant='outlined'
                fullWidth
                name='dataNascimento'
                label='DATA DE NASCIMENTO'
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type='number'
                required
                variant='outlined'
                fullWidth
                name='valorRequerido'
                label='VALOR REQUERIDO'
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <InputAdornment position='start'>R$</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type='number'
                required
                variant='outlined'
                fullWidth
                name='mesesParaPagar'
                label='MESES PARA PAGAR'
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained' fullWidth color='primary' className={classes.firstButton}>
                Simular
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Fragment>
  );
}
