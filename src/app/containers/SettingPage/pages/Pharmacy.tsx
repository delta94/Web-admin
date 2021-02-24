/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import * as _ from 'lodash';
import {
  useInjectReducer,
  useInjectSaga,
} from 'store/core/@reduxjs/redux-injectors';
import { useSelector, useDispatch } from 'react-redux';
import { sliceKey, reducer, actions } from 'store/pharmacy/shared/slice';
import { AppHelper, Order } from 'utils/app.helper';
import { PharmacySaga } from 'store/pharmacy/shared/saga';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  selectLoading,
  selectPharmacies,
  selectError,
  selectSuccess,
} from 'store/pharmacy/shared/selectors';
import { NotifyService } from 'services/notify.service';
import { useSnackbar } from 'notistack';
import { Tooltip } from '@material-ui/core';
import { tablePharmacy } from 'store/pharmacy/constants/pharmarcy.constant';
import { ModalAddPharmacy } from '../components/Pharmacy/ModalAddPharmacy';
import { ModalUpdatePharmacy } from '../components/Pharmacy/ModalUpdatePharmacy';
import { ModalConfirm } from 'app/components/Modal/Confirm';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AppLoading from 'app/components/Loading';
import TableHeaderSort from 'app/components/TableHeaderSort';
import TablePagination from '@material-ui/core/TablePagination';
import Switch from '@material-ui/core/Switch';

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

export function Pharmacy() {
  const { enqueueSnackbar } = useSnackbar();
  const notifyController = new NotifyService(enqueueSnackbar);
  useInjectReducer({ key: sliceKey, reducer });
  useInjectSaga({ key: sliceKey, saga: PharmacySaga });
  const classes = useStyles();
  const dispatch = useDispatch();
  const pharmacyList: any[] = useSelector(selectPharmacies);
  const loading: any = useSelector<any>(selectLoading);
  const error: any = useSelector<any>(selectError);
  const success: any = useSelector<any>(selectSuccess);
  const [openAddPharmacy, setOpenAddPharmacy] = useState<boolean>(false);
  const [openUpdatePharmacy, setOpenUpdatePharmacy] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [idDelete, setIdDelete] = useState<string>('');
  const pagiOptions: number[] = [10, 15, 30, 50, 100];
  const [pagi, setPagi] = useState<any>(() => ({
    rowsPerPage: _.first(pagiOptions),
    page: 0,
  }));
  const [keySearch, setKeySearch] = useState<string>('');
  const [pharmacySlice, setPharmacySlice] = useState<any[]>([]);

  useEffect((): any => {
    if (!_.isEmpty(pharmacyList) && pharmacyList.length) {
      if (keySearch === '') {
        AppHelper.setPagiClient(pharmacyList, pagi, setPharmacySlice);
      } else {
        AppHelper.setSearchPagiClient(
          pharmacyList,
          pagi,
          keySearch,
          setPharmacySlice,
        );
      }
    }
  }, [pharmacyList, pagi, keySearch]);

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    dispatch(actions.getAllPharmacy());
  });

  useEffect(() => {
    return () => {
      dispatch(actions.resetAll());
    };
  }, []);

  useEffect(() => {
    if (!_.isEmpty(error)) {
      notifyController.setNotifyMessage(error.message).setFailNotify();
      dispatch(actions.clearError());
    }
  }, [error]);

  useEffect(() => {
    if (!_.isEmpty(success)) {
      notifyController.setNotifyMessage(success.message).setSuccessNotify();
      dispatch(actions.clearSuccess());
      syncTitleData();
      closeDialog();
    }
  }, [success]);

  const syncTitleData = () => {
    dispatch(actions.getAllPharmacy());
  };

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<any>('code');

  const handleRequestSort = (event, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const changeStatusPharmacy = (e, id) => {
    dispatch(
      actions.changePharmacyActive({
        id,
        isActive: e.target.checked,
      }),
    );
  };

  const deleteTitle = () => {
    if (idDelete === '') return;
    dispatch(
      actions.deletePharmacy({
        id: idDelete,
      }),
    );
  };

  const openDeleteTitle = id => {
    setIdDelete(id);
    setOpenDelete(true);
  };

  const setOpenUpdatePharmacyModal = pharmacy => {
    setOpenUpdatePharmacy(true);
    dispatch(actions.getPharmacyById(pharmacy.id));
  };

  const closeDialog = () => {
    setOpenAddPharmacy(false);
    setOpenUpdatePharmacy(false);
    setOpenDelete(false);
  };

  const renderTableControl = () => {
    return (
      <div className="row">
        <div className="col-md-6 col-sm-6 col-xs-6">
          <div className="btn-group">
            <button
              className="btn btn-info"
              onClick={() => setOpenAddPharmacy(true)}
            >
              Thêm mới <i className="fa fa-plus"></i>
            </button>
          </div>
          <div className="btn-group ml-3">
            <button className="btn btn-info" onClick={syncTitleData}>
              Đồng bộ <i className="fa fa-refresh"></i>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderColumns = () => {
    return (
      <TableHeaderSort
        classes={classes}
        onRequestSort={handleRequestSort}
        order={order}
        orderBy={orderBy}
        columns={tablePharmacy}
      />
    );
  };

  const renderTable = () => {
    if (!_.isEmpty(pharmacySlice) && pharmacySlice.length) {
      const tableData: any[] = AppHelper.stableSort(
        pharmacySlice,
        AppHelper.getComparator(order, orderBy),
      );
      return tableData.map((row, idx) => {
        const pharmacy = _.cloneDeep(row);
        return (
          <TableRow key={row.id}>
            {tablePharmacy.map(column => {
              const value = pharmacy[column.id];
              if (column.id === 'no') {
                const { page, rowsPerPage } = pagi;
                return (
                  <TableCell key={column.id}>
                    {page * rowsPerPage + idx + 1}
                  </TableCell>
                );
              } else if (column.id === 'is_active') {
                if (value) {
                  return (
                    <TableCell key={column.id}>
                      <i
                        style={{ color: '#4caf50', fontSize: '16px' }}
                        className="fa fa-check-circle"
                        aria-hidden="true"
                      ></i>
                    </TableCell>
                  );
                } else {
                  return (
                    <TableCell key={column.id}>
                      <i
                        style={{ color: '#ff0000', fontSize: '16px' }}
                        className="fa fa-times-circle"
                        aria-hidden="true"
                      ></i>
                    </TableCell>
                  );
                }
              } else if (column.id === 'actions') {
                return (
                  <TableCell key={column.id}>
                    <Tooltip
                      title={'Đổi Trạng thái'}
                      enterDelay={500}
                      leaveDelay={100}
                    >
                      <Switch
                        checked={pharmacy.is_active}
                        onChange={e => changeStatusPharmacy(e, pharmacy.id)}
                        color="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                    </Tooltip>
                    <Tooltip title={'Sửa'} enterDelay={500} leaveDelay={100}>
                      <button
                        className="btn btn-primary btn-xs"
                        onClick={() => setOpenUpdatePharmacyModal(pharmacy)}
                      >
                        <i className="fa fa-pencil"></i>
                      </button>
                    </Tooltip>
                    <Tooltip title={'Xoá'} enterDelay={500} leaveDelay={100}>
                      <button
                        className="btn btn-danger btn-xs mx-2"
                        onClick={() => openDeleteTitle(pharmacy.id)}
                      >
                        <i className="fa fa-trash-o"></i>
                      </button>
                    </Tooltip>
                  </TableCell>
                );
              }
              return (
                <TableCell key={column.id}>{value ? value : '-'}</TableCell>
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
            colSpan={tablePharmacy.length}
          >
            No matching records found
          </TableCell>
        </TableRow>
      );
    }
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

  const renderPagination = () => {
    if (!_.isEmpty(pharmacySlice)) {
      return (
        <TablePagination
          rowsPerPageOptions={pagiOptions}
          component="div"
          count={keySearch !== '' ? pharmacySlice.length : pharmacyList.length}
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
      {openAddPharmacy ? (
        <ModalAddPharmacy open={true} onClose={closeDialog} />
      ) : null}
      {openUpdatePharmacy ? (
        <ModalUpdatePharmacy open={true} onClose={closeDialog} />
      ) : null}
      <ModalConfirm
        title={'Bạn có chắc chắn muốn xoá nhà thuốc này?'}
        other={{
          bodyText: '',
        }}
        keyConfirm={''}
        open={openDelete}
        onClose={() => closeDialog()}
        confirmMethod={() => deleteTitle()}
      />
      {loading ? <AppLoading loading={true} /> : null}
      <div className="col-md-12">
        <div className="card card-topline-red">
          <div className="card-head"></div>
          <div className="card-body ">
            {renderTableControl()}
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
