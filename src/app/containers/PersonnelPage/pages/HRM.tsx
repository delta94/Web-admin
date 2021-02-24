/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable react-hooks/exhaustive-deps
import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  useInjectReducer,
  useInjectSaga,
} from 'store/core/@reduxjs/redux-injectors';
import { useSelector, useDispatch } from 'react-redux';
import { ModalHRM } from '../components/ModalHRM';
import 'react-datepicker/dist/react-datepicker.css';
import * as AuthSelectors from 'store/auth/shared/selectors';
import * as AuthSlice from 'store/auth/shared/slice';
import { AuthSaga } from 'store/auth/shared/saga';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import {
  columnsListHRM,
  RESPONSE_CONSTANT,
  ButtonToolTipPersonnel,
  DialogKeyPersonnel,
  DialogTitlePersonnel,
  PersonnelStatus,
} from 'store/auth/constants/auth.constant';
import AppLoading from 'app/components/Loading';
import * as _ from 'lodash';
import DateFnsUtils from '@date-io/date-fns';
import { DEFAULT_FORMAT_DATE } from 'store/common/constants/common.constant';
import { ModalConfirm } from 'app/components/Modal/Confirm';
import { useSnackbar } from 'notistack';
import { NotifyService } from 'services/notify.service';
import ModalUpdateHRM from '../components/ModalUpdateHRM';
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
    },
    td: {
      fontSize: '1.1rem',
      fontFamily: 'Roboto, sans-serif',
    },
  }),
);
export interface AlertConfig {
  isOpen: boolean;
  autoHide: number;
}

export function HRM() {
  const { enqueueSnackbar } = useSnackbar();
  const notifyController = new NotifyService(enqueueSnackbar);
  const classes = useStyles();
  const dateUtil = new DateFnsUtils();
  useInjectReducer({ key: AuthSlice.sliceKey, reducer: AuthSlice.reducer });
  useInjectSaga({ key: AuthSlice.sliceKey, saga: AuthSaga });
  const dataObject = useSelector(AuthSelectors.selectUsers);
  const loading = useSelector(AuthSelectors.selectLoading);
  const error = useSelector(AuthSelectors.selectError);
  const success = useSelector(AuthSelectors.selectSuccess);
  const dispatch = useDispatch();
  const [isOpenDisplay, setIsOpenDisplay] = useState(false);
  const [isCloseTable, setIsCloseTable] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [isConfirmChangeStatus, setIsConfirmChangeStatus] = useState(false);
  const [isConfirmUpdate, setIsConfirmUpdate] = useState(false);
  const [isConfirmCreate, setIsConfirmCreate] = useState(false);
  const [filterPersonnel, setFilterPersonnel] = useState({
    length: 10,
    start: 0,
    search: { value: '', regex: false },
  });
  const [selectPersonnel, setSelectPersonnel] = useState({});
  const [selectIsActive, setSelectIsActive] = useState({});
  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, [filterPersonnel]);
  };
  useEffectOnMount(() => {
    dispatch(AuthSlice.actions.getListUser(filterPersonnel));
  });
  useEffect(() => {
    if (!_.isEmpty(error)) {
      notifyController.setNotifyMessage(error.message).setFailNotify();
      dispatch(AuthSlice.actions.clearError());
    }
  }, [error]);
  useEffect(() => {
    if (!_.isEmpty(success)) {
      if (success.key === RESPONSE_CONSTANT.DELETE_PERSONNEL_SUCCESS) {
        setFilterPersonnel({
          start: 0,
          length: 10,
          search: { value: '', regex: false },
        });
        setIsConfirmDelete(false);
      } else if (success.key === RESPONSE_CONSTANT.CHANGE_ACTIVE_SUCCESS) {
        setFilterPersonnel({
          start: 0,
          length: 10,
          search: { value: '', regex: false },
        });
        setIsConfirmChangeStatus(false);
      } else if (success.key === RESPONSE_CONSTANT.CREATE_PERSONNEL_SUCCESS) {
        setFilterPersonnel({
          start: 0,
          length: 10,
          search: { value: '', regex: false },
        });
        setIsConfirmCreate(false);
      }
      dispatch(AuthSlice.actions.clearSuccess());
    }
  }, [success]);
  const setNewFilterPersonnel = newFilter => {
    setFilterPersonnel(newFilter);
  };
  const handleDialogControl = (key, personnel?, isActive?) => {
    setSelectPersonnel(personnel);
    setSelectIsActive(isActive);
    switch (key) {
      case DialogKeyPersonnel.DELETE_PERSONNEL:
        setIsConfirmDelete(true);
        break;
      case DialogKeyPersonnel.CHANGE_STATUS_PERSONNEL:
        setIsConfirmChangeStatus(true);
        break;
      case DialogKeyPersonnel.UPDATE_PERSONNEL:
        dispatch(AuthSlice.actions.getUserById(personnel));
        setIsConfirmUpdate(true);
        break;
      case DialogKeyPersonnel.CREATE_PERSONNEL:
        setIsConfirmCreate(true);
        break;
      default:
        break;
    }
  };
  const closeDialogControl = key => {
    switch (key) {
      case DialogKeyPersonnel.DELETE_PERSONNEL:
        setIsConfirmDelete(false);
        break;
      case DialogKeyPersonnel.CHANGE_STATUS_PERSONNEL:
        setIsConfirmChangeStatus(false);
        break;
      case DialogKeyPersonnel.UPDATE_PERSONNEL:
        setIsConfirmUpdate(false);
        break;
      case DialogKeyPersonnel.CREATE_PERSONNEL:
        setIsConfirmCreate(false);
        break;
      default:
        break;
    }
  };
  const deletePersonnel = () => {
    dispatch(AuthSlice.actions.deletePersonnel(selectPersonnel));
  };
  const changeStatusPersonnel = () => {
    const requestParams = {
      id: selectPersonnel,
      isActive: selectIsActive,
    };
    dispatch(AuthSlice.actions.changeActivePersonnel(requestParams));
  };
  const handleChangePage = (event: unknown, start: number) => {
    let changePage = Object.assign({}, filterPersonnel, { start });
    setNewFilterPersonnel(changePage);
  };
  const handleChangeRowsPerPage = event => {
    let changeRowPersonnelPage = Object.assign({}, filterPersonnel, {
      length: +event.target.value,
      start: 0,
    });
    setNewFilterPersonnel(changeRowPersonnelPage);
  };
  const handleReLoad = () => {
    setFilterPersonnel({
      start: 0,
      length: 10,
      search: { value: '', regex: false },
    });
  };
  const handleIsOpenDisplay = () => {
    setIsOpenDisplay(!isOpenDisplay);
  };
  const handleCloseTable = () => {
    setIsCloseTable(!isCloseTable);
  };
  const renderColumns = () => (
    <TableRow>
      {columnsListHRM.map(column => (
        <TableCell
          key={column.id}
          style={{
            minWidth: column.minWidth,
            background: '#1a8ae2',
            color: '#fff',
          }}
        >
          {column.lable}
        </TableCell>
      ))}
    </TableRow>
  );
  const renderTable = () => {
    if (!_.isEmpty(dataObject) && Object.entries(dataObject).length) {
      return dataObject.data.map((personnel, _id) => (
        <TableRow key={personnel.id}>
          {columnsListHRM.map(column => {
            const value = personnel[column.id];
            if (column.id === '#') {
              const { start, length } = filterPersonnel;
              return (
                <TableCell key={column.id}>
                  {start * length + _id + 1}
                </TableCell>
              );
            } else if (column.id === 'birthdate') {
              return (
                <TableCell key={column.id} className={classes.td}>
                  {value
                    ? dateUtil.format(new Date(value), DEFAULT_FORMAT_DATE)
                    : ''}
                </TableCell>
              );
            } else if (column.id === 'image_url') {
              return (
                <TableCell key={column.id} className={classes.td}>
                  {value ? (
                    value
                  ) : (
                    <i className="fa fa-users" aria-hidden="true"></i>
                  )}
                </TableCell>
              );
            } else if (column.id === 'sex') {
              if (value === 1) {
                return (
                  <TableCell key={column.id} className={classes.td}>
                    Nam
                  </TableCell>
                );
              } else {
                return (
                  <TableCell key={column.id} className={classes.td}>
                    Nữ
                  </TableCell>
                );
              }
            } else if (column.id === 'is_active') {
              if (value) {
                return (
                  <TableCell key={column.id} className={classes.td}>
                    <Tooltip
                      title={PersonnelStatus.ACTIVE}
                      enterDelay={500}
                      leaveDelay={200}
                    >
                      <i
                        style={{ color: '#4caf50' }}
                        className="fa fa-check-circle"
                      ></i>
                    </Tooltip>
                  </TableCell>
                );
              } else {
                return (
                  <TableCell key={column.id} className={classes.td}>
                    <Tooltip
                      title={PersonnelStatus.IN_ACTIVE}
                      enterDelay={500}
                      leaveDelay={200}
                    >
                      <i
                        style={{ color: 'red' }}
                        className="fa fa-times-circle"
                      ></i>
                    </Tooltip>
                  </TableCell>
                );
              }
            } else if (column.id === 'actions') {
              return (
                <TableCell key={column.id} className={classes.td}>
                  <Tooltip
                    title={ButtonToolTipPersonnel.CHANGE_STATUS}
                    enterDelay={500}
                    leaveDelay={100}
                  >
                    <button
                      className="btn btn-success btn-xs mx-2"
                      onClick={() =>
                        handleDialogControl(
                          DialogKeyPersonnel.CHANGE_STATUS_PERSONNEL,
                          personnel.id,
                          personnel.is_active,
                        )
                      }
                    >
                      <i className="fa fa-refresh"></i>
                    </button>
                  </Tooltip>
                  <Tooltip
                    title={ButtonToolTipPersonnel.EDIT}
                    enterDelay={500}
                    leaveDelay={100}
                  >
                    <button
                      className="btn btn-primary btn-xs"
                      onClick={() =>
                        handleDialogControl(
                          DialogKeyPersonnel.UPDATE_PERSONNEL,
                          personnel.id,
                        )
                      }
                    >
                      <i className="fa fa-pencil"></i>
                    </button>
                  </Tooltip>
                  <Tooltip
                    title={ButtonToolTipPersonnel.DELETE}
                    enterDelay={500}
                    leaveDelay={100}
                  >
                    <button
                      className="btn btn-danger btn-xs mx-2"
                      onClick={() =>
                        handleDialogControl(
                          DialogKeyPersonnel.DELETE_PERSONNEL,
                          personnel.id,
                        )
                      }
                    >
                      <i className="fa fa-trash-o"></i>
                    </button>
                  </Tooltip>
                </TableCell>
              );
            } else {
              return (
                <TableCell key={column.id} className={classes.td}>
                  {value ? value : '-'}
                </TableCell>
              );
            }
          })}
        </TableRow>
      ));
    }
  };
  const renderTableControl = () => (
    <div className="row d-flex justify-content-start align-items-center mb-3">
      <div className="col-sm-12 col-md-4">
        <div className="btn-group">
          <a
            id="btnAdd"
            className="btn btn-info"
            onClick={() =>
              handleDialogControl(DialogKeyPersonnel.CREATE_PERSONNEL)
            }
          >
            Thêm mới <i className="fa fa-plus"></i>
          </a>
        </div>
        <div className="btn-group ml-2">
          <a id="addRow" className="btn btn-danger" onClick={handleReLoad}>
            Đồng bộ <i className="fa fa-refresh"></i>
          </a>
        </div>
      </div>
    </div>
  );
  const renderPagination = () => {
    if (!_.isEmpty(dataObject) && Object.entries(dataObject).length) {
      return (
        <TablePagination
          rowsPerPageOptions={[10, 20, 30, 50, 100, 1000]}
          component="div"
          labelRowsPerPage="Hiển thị"
          count={dataObject.recordsTotal}
          rowsPerPage={filterPersonnel.length}
          page={filterPersonnel.start}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      );
    }
  };
  return (
    <div className="row" style={{ display: isCloseTable ? 'none' : 'block' }}>
      <div className="col-md-12">
        <div className="tabbable-line">
          <ul className="nav customtab nav-tabs" role="tablist"></ul>
          <div className="tab-content">
            <div className="tab-pane active fontawesome-demo" id="tab1">
              <div className="row">
                <div className="col-md-12">
                  <div className="card card-topline-red">
                    <div className="card-head">
                      <header></header>
                      <div className="tools">
                        <a
                          className="fa fa-repeat btn-color box-refresh"
                          onClick={handleReLoad}
                        ></a>
                        <a
                          className={
                            isOpenDisplay
                              ? 't-collapse btn-color fa fa-chevron-down'
                              : 't-collapse btn-color fa fa-chevron-up'
                          }
                          onClick={handleIsOpenDisplay}
                        ></a>
                        <a
                          className="t-close btn-color fa fa-times"
                          onClick={handleCloseTable}
                        ></a>
                      </div>
                    </div>
                    <div
                      className="card-body "
                      style={{ display: isOpenDisplay ? 'none' : 'block' }}
                    >
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
                        title={DialogTitlePersonnel.DELETE_TITLE_PERSONNEL}
                        keyConfirm={DialogKeyPersonnel.DELETE_PERSONNEL}
                        open={isConfirmDelete}
                        onClose={() =>
                          closeDialogControl(
                            DialogKeyPersonnel.DELETE_PERSONNEL,
                          )
                        }
                        confirmMethod={deletePersonnel}
                      ></ModalConfirm>
                      <ModalConfirm
                        title={
                          DialogTitlePersonnel.CHANGE_STATUS_TITLE_PERSONNEL
                        }
                        keyConfirm={DialogKeyPersonnel.CHANGE_STATUS_PERSONNEL}
                        open={isConfirmChangeStatus}
                        onClose={() =>
                          closeDialogControl(
                            DialogKeyPersonnel.CHANGE_STATUS_PERSONNEL,
                          )
                        }
                        confirmMethod={changeStatusPersonnel}
                      />
                      {isConfirmCreate ? (
                        <ModalHRM
                          open={isConfirmCreate}
                          onClose={() =>
                            closeDialogControl(
                              DialogKeyPersonnel.CREATE_PERSONNEL,
                            )
                          }
                        />
                      ) : null}
                      {isConfirmUpdate ? (
                        <ModalUpdateHRM
                          open={isConfirmUpdate}
                          onClose={() =>
                            closeDialogControl(
                              DialogKeyPersonnel.UPDATE_PERSONNEL,
                            )
                          }
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
