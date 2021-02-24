/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable react-hooks/exhaustive-deps
import React, { useState, useEffect, Fragment } from 'react';
import {
  useInjectReducer,
  useInjectSaga,
} from 'store/core/@reduxjs/redux-injectors';
import * as _ from 'lodash';
import * as PatientSlice from 'store/patient/shared/slice';
import * as LocationSlice from 'store/location/shared/slice';
import * as fromPatientSelector from 'store/patient/shared/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { PatientSaga } from 'store/patient/shared/saga';
import { LocationSaga } from 'store/location/shared/saga';
import { columnsListPatient } from 'store/patient/constants/patient.constant';
import { DEFAULT_FORMAT_DATE } from 'store/common/constants/common.constant';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { AppHelper, Order } from 'utils/app.helper';
import {
  DialogKey,
  DilogTitle,
  PatientStatus,
  ButtonToolTip,
} from 'store/patient/constants/http.constant';
import { ModalConfirm } from '../../../components/Modal/Confirm';
import { ModalPatient } from '../components/ModalPatient';
import { ModalUpdatePatient } from '../components/ModaUpdatePatient';
import { Tooltip } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { NotifyService } from 'services/notify.service';
import { RESPONSE_CONSTANT } from 'store/patient/constants/patient.constant';
import AppLoading from 'app/components/Loading';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DateFnsUtils from '@date-io/date-fns';
import TableHeaderSort from 'app/components/TableHeaderSort';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    root: {
      width: '100%',
    },
    container: {
      minHeight: 400,
      maxHeight: '90vh',
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
  }),
);

export function PatientPage() {
  useInjectReducer({
    key: PatientSlice.sliceKey,
    reducer: PatientSlice.reducer,
  });
  useInjectReducer({
    key: LocationSlice.sliceKey,
    reducer: LocationSlice.reducer,
  });
  useInjectSaga({
    key: PatientSlice.sliceKey,
    saga: PatientSaga,
  });
  useInjectSaga({
    key: LocationSlice.sliceKey,
    saga: LocationSaga,
  });
  const { enqueueSnackbar } = useSnackbar();
  const notifyController = new NotifyService(enqueueSnackbar);
  const dateUtil = new DateFnsUtils();
  const listPatient: any = useSelector(
    fromPatientSelector.selectDataListPatient,
  );
  const loading: boolean = useSelector(fromPatientSelector.selectLoading);
  const error: any = useSelector(fromPatientSelector.selectError);
  const success: any = useSelector(fromPatientSelector.selectSuccess);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openConfirmChangeStatus, setOpenConfirmChangeStatus] = useState(false);
  const [openCreatePatient, setOpenCreatePatient] = useState(false);
  const [openUpdatePatient, setOpenUpdatePatient] = useState(false);
  const [selectPatient, setSelectPatient] = useState({});
  const [filterPatient, setFilterPatient] = useState({
    length: 10,
    start: 0,
    search: { value: '', regex: false },
  });
  const [searchKey, setSearchKey] = useState('');

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, [filterPatient]);
  };

  useEffectOnMount(() => {
    dispatch(PatientSlice.actions.getListPatient(filterPatient));
  });

  useEffect(() => {
    dispatch(LocationSlice.actions.getLocationsAll());
    return () => {
      dispatch(PatientSlice.actions.resetAll());
    };
  }, []);
  useEffect(() => {
    if (!_.isEmpty(success)) {
      notifyController.setNotifyMessage(success.message).setSuccessNotify();
      if (success.key === RESPONSE_CONSTANT.CREATE_PATIENT_SUCCESS) {
        setOpenCreatePatient(false);
      } else if (success.key === RESPONSE_CONSTANT.UPDATE_PATIENT_SUCCESS) {
        setOpenUpdatePatient(false);
      } else if (success.key === RESPONSE_CONSTANT.EXPORT_PATIENT_SUCCESS) {
        AppHelper.createDownloadFile({
          file_path: success.data.file_path,
          file_name: success.data.file_name,
        });
      }
      dispatch(PatientSlice.actions.clearSuccess());
      dispatch(PatientSlice.actions.getListPatient(filterPatient));
    }
  }, [success]);

  useEffect(() => {
    if (!_.isEmpty(error)) {
      notifyController.setNotifyMessage(error.message).setFailNotify();
      dispatch(PatientSlice.actions.clearError());
    }
  }, [error]);

  const handleSearchPatient = e => {
    setSearchKey(e.target.value);
  };

  const submitSearch = e => {
    e.preventDefault();
    const newFilter = Object.assign({}, filterPatient, {
      start: 0,
      length: 10,
      search: {
        regex: false,
        value: searchKey,
      },
    });
    setNewFilterPatient(newFilter);
  };

  const handleChangePage = (event: unknown, start: number) => {
    let changePage = Object.assign({}, filterPatient, { start });
    setNewFilterPatient(changePage);
  };

  const handleChangeRowsPerPage = event => {
    let changeRowPerPage = Object.assign({}, filterPatient, {
      length: +event.target.value,
      start: 0,
    });
    setNewFilterPatient(changeRowPerPage);
  };

  const setNewFilterPatient = newFilter => {
    setFilterPatient(newFilter);
  };

  const openDialogControl = (key, patient?) => {
    setSelectPatient(patient);
    switch (key) {
      case DialogKey.DELETE_PATIENT:
        setOpenConfirmDelete(true);
        break;
      case DialogKey.CHANGE_STATUS_PATIENT:
        setOpenConfirmChangeStatus(true);
        break;
      case DialogKey.UPDATE_PATIENT:
        dispatch(PatientSlice.actions.findPatientWithId(patient.id));
        setOpenUpdatePatient(true);
        break;
      case DialogKey.CREATE_PATIENT:
        setOpenCreatePatient(true);
        break;
    }
  };

  const closeDialogControl = key => {
    switch (key) {
      case DialogKey.DELETE_PATIENT:
        setOpenConfirmDelete(false);
        break;
      case DialogKey.CHANGE_STATUS_PATIENT:
        setOpenConfirmChangeStatus(false);
        break;
      case DialogKey.UPDATE_PATIENT:
        setOpenUpdatePatient(false);
        break;
      case DialogKey.CREATE_PATIENT:
        setOpenCreatePatient(false);
        break;
    }
  };

  const deletePatient = () => {
    dispatch(PatientSlice.actions.deletePatient(_.get(selectPatient, 'id')));
  };

  const changePatientStatus = () => {
    const newPatientStatus = {
      id: _.get(selectPatient, 'id'),
      is_active: !_.get(selectPatient, 'is_active'),
    };
    dispatch(PatientSlice.actions.changePatientStatus(newPatientStatus));
  };

  const downloadPatient = () => {
    dispatch(
      PatientSlice.actions.exportListPatient({
        start: new Date(),
        end: new Date(),
      }),
    );
  };

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<any>('tekmedi_card_number');

  const handleRequestSort = (event, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const renderTableControl = () => {
    return (
      <div className="row pb-3">
        <div className="col-md-12 d-flex align-items-center">
          <div className="btn-group col-md-3 pl-0">
            <form
              className="d-flex justify-content-start"
              onSubmit={submitSearch}
            >
              <input
                className="form-control mr-4"
                style={{ maxWidth: '300px' }}
                title={''}
                placeholder="Tìm bệnh nhân"
                type="text"
                value={searchKey}
                onChange={handleSearchPatient}
              />
              <button className="btn btn-primary mr-3" type="submit">
                Tìm <i className="fa fa-search"></i>
              </button>
            </form>
          </div>
          <div className="btn-group ml-2">
            <button
              className="btn btn-primary mr-3"
              onClick={() => openDialogControl(DialogKey.CREATE_PATIENT)}
            >
              Thêm mới <i className="fa fa-plus"></i>
            </button>
          </div>
          <div className="btn-group ml-2">
            <a
              id="btnExport"
              className="btn btn-info"
              onClick={downloadPatient}
            >
              Xuất file <i className="fa fa-upload"></i>
            </a>
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
        columns={columnsListPatient}
      />
    );
  };

  const renderTable = () => {
    if (!_.isEmpty(listPatient) && listPatient.data.length) {
      let listPatientFormat = listPatient.data.map(pat => {
        return {
          ...pat,
          payment_amount: AppHelper.formatCurrency(pat.payment_amount),
          top_up_amount: AppHelper.formatCurrency(pat.top_up_amount),
          balance: AppHelper.formatCurrency(pat.balance),
        };
      });
      const tableData: any[] = AppHelper.stableSort(
        listPatientFormat,
        AppHelper.getComparator(order, orderBy),
      );
      return tableData.map((patient, _id) => {
        return (
          <TableRow key={patient.id}>
            {columnsListPatient.map(column => {
              const { start, length } = filterPatient;
              const value = patient[column.id];
              if (column.id === 'no') {
                return (
                  <TableCell key={column.id}>
                    {start * length + _id + 1}
                  </TableCell>
                );
              } else if (
                column.id === 'birthday' ||
                column.id === 'health_insurance_issued_date' ||
                column.id === 'health_insurance_expired_date' ||
                column.id === 'identity_card_number_issued_date'
              ) {
                return (
                  <TableCell key={column.id}>
                    {value
                      ? dateUtil.format(new Date(value), DEFAULT_FORMAT_DATE)
                      : ''}
                  </TableCell>
                );
              } else if (column.id === 'is_active') {
                if (value) {
                  return (
                    <TableCell key={column.id}>
                      <Tooltip
                        title={PatientStatus.ACTIVE}
                        enterDelay={500}
                        leaveDelay={200}
                      >
                        <i
                          style={{ color: '#4caf50', fontSize: '16px' }}
                          className="fa fa-check-circle"
                          aria-hidden="true"
                        ></i>
                      </Tooltip>
                    </TableCell>
                  );
                } else {
                  return (
                    <TableCell key={column.id}>
                      <Tooltip
                        title={PatientStatus.IN_ACTIVE}
                        enterDelay={500}
                        leaveDelay={200}
                      >
                        <i
                          style={{ color: '#ff0000', fontSize: '16px' }}
                          className="fa fa-times-circle"
                          aria-hidden="true"
                        ></i>
                      </Tooltip>
                    </TableCell>
                  );
                }
              } else if (column.id === 'actions') {
                return (
                  <TableCell key={column.id}>
                    <Tooltip
                      title={ButtonToolTip.EDIT}
                      enterDelay={500}
                      leaveDelay={100}
                    >
                      <button
                        className="btn btn-primary btn-xs"
                        onClick={() =>
                          openDialogControl(DialogKey.UPDATE_PATIENT, patient)
                        }
                      >
                        <i className="fa fa-pencil"></i>
                      </button>
                    </Tooltip>
                    <Tooltip
                      title={ButtonToolTip.DELETE}
                      enterDelay={500}
                      leaveDelay={100}
                    >
                      <button
                        className="btn btn-danger btn-xs mx-2"
                        onClick={() =>
                          openDialogControl(DialogKey.DELETE_PATIENT, patient)
                        }
                      >
                        <i className="fa fa-trash-o"></i>
                      </button>
                    </Tooltip>
                    <Tooltip
                      title={ButtonToolTip.CHANGE_STATUS}
                      enterDelay={500}
                      leaveDelay={100}
                    >
                      <button
                        className="btn btn-success btn-xs"
                        onClick={() =>
                          openDialogControl(
                            DialogKey.CHANGE_STATUS_PATIENT,
                            patient,
                          )
                        }
                      >
                        <i className="fa fa-refresh"></i>
                      </button>
                    </Tooltip>
                  </TableCell>
                );
              } else {
                return (
                  <TableCell key={column.id}>{value ? value : '-'}</TableCell>
                );
              }
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
            colSpan={columnsListPatient.length}
          >
            No matching records found
          </TableCell>
        </TableRow>
      );
    }
  };

  const renderPagination = () => {
    if (!_.isEmpty(listPatient) && listPatient.data.length) {
      return (
        <TablePagination
          rowsPerPageOptions={[10, 20, 30, 50, 100, 1000]}
          component="div"
          labelRowsPerPage="Hiển Thị"
          count={listPatient.recordsTotal}
          rowsPerPage={filterPatient.length}
          page={filterPatient.start}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      );
    }
  };

  return (
    <Fragment>
      {renderTableControl()}
      <Paper className={classes.root}>
        {loading ? <AppLoading loading={true} /> : null}
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>{renderColumns()}</TableHead>
            <TableBody>{renderTable()}</TableBody>
          </Table>
        </TableContainer>
        {renderPagination()}
      </Paper>
      <ModalConfirm
        title={DilogTitle.DELETE_PATIENT}
        keyConfirm={DialogKey.DELETE_PATIENT}
        open={openConfirmDelete}
        onClose={() => closeDialogControl(DialogKey.DELETE_PATIENT)}
        confirmMethod={deletePatient}
      />
      <ModalConfirm
        title={DilogTitle.CHANGE_STATUS_PATIENT}
        keyConfirm={DialogKey.CHANGE_STATUS_PATIENT}
        open={openConfirmChangeStatus}
        onClose={() => closeDialogControl(DialogKey.CHANGE_STATUS_PATIENT)}
        confirmMethod={changePatientStatus}
      />
      <ModalPatient
        open={openCreatePatient}
        onClose={() => closeDialogControl(DialogKey.CREATE_PATIENT)}
      />
      {openUpdatePatient ? (
        <ModalUpdatePatient
          open={true}
          onClose={() => closeDialogControl(DialogKey.UPDATE_PATIENT)}
        />
      ) : null}
    </Fragment>
  );
}
