/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import {
  useInjectReducer,
  useInjectSaga,
} from 'store/core/@reduxjs/redux-injectors';
import { useSelector, useDispatch } from 'react-redux';
import { SurveySaga } from 'store/survey/shared/saga';
import { AppHelper, Order } from 'utils/app.helper';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import * as SurveySlice from 'store/survey/shared/slice';
import * as SurveySelectors from 'store/survey/shared/selectors';
import * as _ from 'lodash';
import {
  tableSurvey,
  SurveyModel,
} from 'store/survey/constants/survey.constant';
import { Tooltip } from '@material-ui/core';
import { NotifyService } from 'services/notify.service';
import { useSnackbar } from 'notistack';
import AppLoading from 'app/components/Loading';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableHeaderSort from 'app/components/TableHeaderSort';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    minHeight: '200px',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
});

export function Survey() {
  useInjectReducer({ key: SurveySlice.sliceKey, reducer: SurveySlice.reducer });
  useInjectSaga({ key: SurveySlice.sliceKey, saga: SurveySaga });
  const surveys: any[] = useSelector(SurveySelectors.selectSurveys);
  const loading: boolean = useSelector(SurveySelectors.selectLoading);
  const error = useSelector(SurveySelectors.selectError);
  const { enqueueSnackbar } = useSnackbar();
  const notifyController = new NotifyService(enqueueSnackbar);
  const dispatch = useDispatch();
  const classes = useStyles();
  const pagiOptions: number[] = [10, 15, 30, 50, 100];
  const [pagi, setPagi] = useState<any>(() => ({
    rowsPerPage: _.first(pagiOptions),
    page: 0,
  }));
  const [keySearch, setKeySearch] = useState<string>('');
  const [tableSlice, setTableSlice] = useState<any[]>([]);

  useEffect(() => {
    dispatch(SurveySlice.actions.getAllSurvey());
    return () => {
      SurveySlice.actions.resetAll();
    };
  }, []);

  useEffect(() => {
    if (!_.isEmpty(error)) {
      notifyController.setNotifyMessage(error.message).setFailNotify();
      dispatch(SurveySlice.actions.clearError());
    }
  }, [error]);

  useEffect((): any => {
    if (!_.isEmpty(surveys) && surveys.length) {
      if (keySearch === '') {
        AppHelper.setPagiClient(surveys, pagi, setTableSlice);
      } else {
        AppHelper.setSearchPagiClient(surveys, pagi, keySearch, setTableSlice);
      }
    }
  }, [surveys, pagi, keySearch]);

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<any>('ansOne');

  const handleRequestSort = (event, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (e, page) => {
    let changePage = Object.assign({}, pagi, { page });
    setPagi(changePage);
  };

  const handleChangeRowsPerPage = e => {
    let changeRowPerPage = Object.assign({}, pagi, {
      rowsPerPage: +e.target.value,
      page: 0,
    });
    setPagi(changeRowPerPage);
  };

  const renderColumns = () => {
    return (
      <TableHeaderSort
        classes={classes}
        onRequestSort={handleRequestSort}
        order={order}
        orderBy={orderBy}
        columns={tableSurvey}
      />
    );
  };

  const renderTable = () => {
    if (!_.isEmpty(tableSlice) && tableSlice.length) {
      const tableData: any[] = AppHelper.stableSort(
        tableSlice,
        AppHelper.getComparator(order, orderBy),
      );
      return tableData.map((row, idx) => {
        const survey = new SurveyModel(_.cloneDeep(row));
        return (
          <TableRow key={row.id}>
            {tableSurvey.map(column => {
              const value = survey[column.id];
              const colId = column.id;
              if (colId === 'no') {
                return (
                  <TableCell key={colId} align={column.align}>
                    {idx + 1}
                  </TableCell>
                );
              } else if (colId === 'documents') {
                return (
                  <TableCell key={colId} align={column.align}>
                    <Tooltip title={'File'} enterDelay={500} leaveDelay={100}>
                      <button className="btn btn-success btn-xs mx-2">
                        <i className="fa fa-image"></i>
                      </button>
                    </Tooltip>
                  </TableCell>
                );
              } else if (colId === 'isActive') {
                if (value) {
                  return (
                    <TableCell key={colId} align={column.align}>
                      <i
                        style={{ color: '#4caf50', fontSize: '16px' }}
                        className="fa fa-check-circle"
                        aria-hidden="true"
                      ></i>
                    </TableCell>
                  );
                } else {
                  return (
                    <TableCell key={colId} align={column.align}>
                      <i
                        style={{ color: '#ff0000', fontSize: '16px' }}
                        className="fa fa-times-circle"
                        aria-hidden="true"
                      ></i>
                    </TableCell>
                  );
                }
              } else if (colId === 'ansOne' || colId === 'ansTwo') {
                return (
                  <TableCell
                    key={column.id}
                    style={value === 'Y' ? { background: '#46c314' } : {}}
                    align={column.align}
                  >
                    {value}
                  </TableCell>
                );
              }
              return (
                <TableCell key={column.id} align={column.align}>
                  {value ? value : '-'}
                </TableCell>
              );
            })}
          </TableRow>
        );
      });
    } else {
      return (
        <TableRow>
          <TableCell
            className="w-100"
            align="center"
            colSpan={tableSurvey.length}
          >
            No matching records found
          </TableCell>
        </TableRow>
      );
    }
  };

  const renderPagination = () => {
    if (!_.isEmpty(tableSlice)) {
      return (
        <TablePagination
          rowsPerPageOptions={pagiOptions}
          component="div"
          count={keySearch !== '' ? tableSlice.length : surveys.length}
          rowsPerPage={pagi.rowsPerPage}
          page={pagi.page}
          labelRowsPerPage={'Hiển Thị'}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      );
    }
  };

  return (
    <div className="row">
      {loading ? <AppLoading loading={true} /> : null}
      <div className="col-md-12">
        <div className="card card-topline-red">
          <div className="card-head"></div>
          <div className="card-body ">
            <div className="table-scrollable">
              <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                  <Table stickyHeader>
                    <TableHead>{renderColumns()}</TableHead>
                    <TableBody>{renderTable()}</TableBody>
                  </Table>
                </TableContainer>
                {renderPagination()}
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
