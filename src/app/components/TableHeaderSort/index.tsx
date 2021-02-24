/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import * as _ from 'lodash';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

export default function TableHeaderSor(props: any) {
  const { classes, order, orderBy, onRequestSort, columns } = props;
  const createSortHandler = property => {
    return event => {
      onRequestSort(event, property);
    };
  };

  return (
    <TableRow>
      {columns.map(col => {
        return (
          <TableCell
            key={col.id}
            sortDirection={orderBy === col.id ? order : false}
            style={{
              minWidth: col.minWidth,
              backgroundColor: '#1a8ae2',
              color: '#fff',
              padding: '16px',
            }}
          >
            {isNaN(col.id) ? (
              <TableSortLabel
                active={orderBy === col.id}
                direction={orderBy === col.id ? order : 'asc'}
                onClick={createSortHandler(col.id)}
              >
                {col.label}
                {orderBy === col.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            ) : (
              <>{col.headerName}</>
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
}
