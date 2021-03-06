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
import { sliceKey, reducer, actions } from 'store/setting/shared/slice';
import { AppHelper, Order } from 'utils/app.helper';
import { SettingSaga } from 'store/setting/shared/saga';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { SettingManageType } from 'store/setting/constants/setting.constant';
import {
  selectLoading,
  selectSettingList,
  selectError,
  selectSuccess,
} from 'store/setting/shared/selectors';
import { NotifyService } from 'services/notify.service';
import { useSnackbar } from 'notistack';
import { Tooltip } from '@material-ui/core';
import { tableValue } from 'store/setting/constants/setting.constant';
import { ModalAddFaculty } from '../components/Faculty/ModalAddFaculty';
import { ModalUpdateFaculty } from '../components/Faculty/ModalUpdateFaculty';
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
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    minHeight: '80vh',
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

export function Faculty() {
  const { enqueueSnackbar } = useSnackbar();
  const notifyController = new NotifyService(enqueueSnackbar);
  useInjectReducer({ key: sliceKey, reducer });
  useInjectSaga({ key: sliceKey, saga: SettingSaga });
  const classes = useStyles();
  const dispatch = useDispatch();
  const facultyList = useSelector<any>(selectSettingList);
  const [faculty, setFaculties] = useState<any>();
  const loading: any = useSelector<any>(selectLoading);
  const error: any = useSelector<any>(selectError);
  const success: any = useSelector<any>(selectSuccess);
  const [openAddFaculty, setOpenAddFaculty] = useState<boolean>(false);
  const [openUpdateFaculty, setOpenUpdateFaculty] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [idDelete, setIdDelete] = useState<string>('');

  useEffect(() => {
    dispatch(actions.resetAll());
    dispatch(actions.getAllManageType(SettingManageType.Faculty));
    dispatch(actions.getManageType(SettingManageType.Faculty));
  }, []);

  useEffect(() => {
    if (!_.isEmpty(facultyList)) {
      setFaculties(facultyList);
    }
  }, [facultyList]);

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
      dispatch(actions.getAllManageType(SettingManageType.Faculty));
      closeDialog();
    }
  }, [success]);

  const syncPositionData = () => {
    dispatch(actions.getAllManageType(SettingManageType.Faculty));
  };

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<any>('code');

  const handleRequestSort = (event, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const changeStatusFaculty = (e, id) => {
    dispatch(
      actions.changeManageTypeActive({
        id,
        isActive: e.target.checked,
        manageType: SettingManageType.Faculty,
      }),
    );
  };

  const deleteFaculty = () => {
    if (idDelete === '') return;
    dispatch(
      actions.deleteManageType({
        id: idDelete,
        manageType: SettingManageType.Faculty,
      }),
    );
  };

  const openDeleteFaculty = id => {
    setIdDelete(id);
    setOpenDelete(true);
  };

  const setOpenUpdateFacultyModal = faculty => {
    setOpenUpdateFaculty(true);
    dispatch(actions.setTempManageType(faculty));
  };

  const closeDialog = () => {
    setOpenAddFaculty(false);
    setOpenUpdateFaculty(false);
    setOpenDelete(false);
  };

  const renderTableControl = () => {
    return (
      <div className="row">
        <div className="col-md-6 col-sm-6 col-xs-6">
          <div className="btn-group">
            <button
              className="btn btn-info"
              onClick={() => setOpenAddFaculty(true)}
            >
              Th??m m???i <i className="fa fa-plus"></i>
            </button>
          </div>
          <div className="btn-group ml-3">
            <button className="btn btn-info" onClick={syncPositionData}>
              ?????ng b??? <i className="fa fa-refresh"></i>
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
        columns={tableValue}
      />
    );
  };

  const renderTable = () => {
    if (!_.isEmpty(faculty) && faculty.length) {
      const tableData: any[] = AppHelper.stableSort(
        faculty,
        AppHelper.getComparator(order, orderBy),
      );
      return tableData.map((row, idx) => {
        const position = _.cloneDeep(row);
        return (
          <TableRow key={row.id}>
            {tableValue.map(column => {
              const value = position[column.id];
              if (column.id === 'no') {
                return <TableCell key={column.id}>{idx + 1}</TableCell>;
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
                      title={'?????i Tr???ng th??i'}
                      enterDelay={500}
                      leaveDelay={100}
                    >
                      <Switch
                        checked={position.is_active}
                        onChange={e => changeStatusFaculty(e, position.id)}
                        color="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                    </Tooltip>
                    <Tooltip title={'S???a'} enterDelay={500} leaveDelay={100}>
                      <button
                        className="btn btn-primary btn-xs"
                        onClick={() => setOpenUpdateFacultyModal(position)}
                      >
                        <i className="fa fa-pencil"></i>
                      </button>
                    </Tooltip>
                    <Tooltip title={'Xo??'} enterDelay={500} leaveDelay={100}>
                      <button
                        className="btn btn-danger btn-xs mx-2"
                        onClick={() => openDeleteFaculty(position.id)}
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
            colSpan={tableValue.length}
          >
            No matching records found
          </TableCell>
        </TableRow>
      );
    }
  };

  return (
    <div className="row">
      {openAddFaculty ? (
        <ModalAddFaculty open={true} onClose={closeDialog} />
      ) : null}
      {openUpdateFaculty ? (
        <ModalUpdateFaculty open={true} onClose={closeDialog} />
      ) : null}
      <ModalConfirm
        title={'B???n c?? ch???c ch???n mu???n xo?? khoa n??y?'}
        other={{
          bodyText: '',
        }}
        keyConfirm={''}
        open={openDelete}
        onClose={() => closeDialog()}
        confirmMethod={() => deleteFaculty()}
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
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
