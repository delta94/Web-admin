import { TableCell } from '@material-ui/core';
import React from 'react';
import { Manipulation } from 'store/common/constants/common.constant';
import { useStyles } from 'store/transaction/constants/transaction.constant';

export default function TableCellColor({ id, value }) {
  const classes = useStyles();
  const reducerColor = () => {
    switch (value) {
      case Manipulation.RECHARGE:
        return classes.Blue;
      case Manipulation.REGISTER:
        return classes.Green;
      case Manipulation.NEW_CARD_ISSUANCE:
        return classes.Yellow;
      case Manipulation.DEPOSIT_CANCELED:
        return classes.red;
      case Manipulation.LOST_NEW_CARD:
        return classes.GreenYellow;
      case Manipulation.WITHDRAWAL:
        return classes.SkyBlue;
      case Manipulation.RETURN_THE_CARD:
        return classes.Orchid;
      default:
        return classes.Purple4;
    }
  };
  return (
    <TableCell key={id} className={reducerColor()}>
      {value}
    </TableCell>
  );
}
