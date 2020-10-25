import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import {
  Grid,
  Box,
  Typography,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";

import useStyles from "./BalanceCard.style";
import pigbank from "../../assets/pigbank.svg";

import useFetch from "../../helpers/Hooks/useFetch";
import { actions } from "../../actions/globalActions";

const Balance = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { loading, error, request } = useFetch();
  const { userReducers }: any = useSelector((state) => state);
  const { localStorageReducers }: any = useSelector((state) => state);

  const { yoToken, yoUuid } = localStorageReducers;
  const { saldo } = userReducers;

  const date = new Date().toLocaleDateString();

  const handleSaldo = async () => {
    return actions.getSaldo(yoUuid, yoToken);
  };

  useEffect(() => {
    handleSaldo().then((saldoAction) => dispatch(saldoAction));
  }, [saldo]);

  return (
      <Grid
      md={5}
      sm={5}
      xs={12}
        elevation={6}
        component={Paper}
        square
        className={clsx([classes.pigBank, classes.balanceGrid])}
      >
        <img alt="trasnfer" src={pigbank} />
        <Box>
          <Typography component="h3" variant="h5" className={classes.saldo}>
            Meu Saldo
          </Typography>

          <Typography
            component="h2"
            variant="h5"
            className={clsx([classes.saldo, classes.saldoInfo])}
          >
            {loading || error ? (
              <CircularProgress size={24} color="secondary" />
            ) : (
              saldo.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })
            )}
          </Typography>
          <Typography variant="subtitle1" className={classes.date}>
            {date}
          </Typography>
        </Box>
        {openModal && (
          <TransitionsModal title={getMessage(statusCode)}>
            <img
              className={classes.cheers}
              src={statusCode === messageCode.SUCCESS ? cheers : sad}
            />
          </TransitionsModal>
        )}
      </Grid>
  );
};

export default Balance;