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
import { ModalAddGroupService } from '../components/GroupService/ModalAddGroupService';
import { ModalUpdateGroupService } from '../components/GroupService/ModalUpdateGroupService';
import { ModalConfirm } from 'app/components/Modal/Confirm';
import { SettingManageType } from 'store/setting/constants/setting.constant';
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

export function GroupService() {
  const { enqueueSnackbar } = useSnackbar();
  const notifyController = new NotifyService(enqueueSnackbar);
  useInjectReducer({ key: sliceKey, reducer });
  useInjectSaga({ key: sliceKey, saga: SettingSaga });
  const classes = useStyles();
  const dispatch = useDispatch();
  const groupServiceList: any[] = useSelector(selectSettingList);
  const loading: any = useSelector<any>(selectLoading);
  const error: any = useSelector<any>(selectError);
  const success: any = useSelector<any>(selectSuccess);
  const [openAddTitle, setOpenAddTitle] = useState<boolean>(false);
  const [openUpdateTitle, setOpenUpdateTitle] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [idDelete, setIdDelete] = useState<string>('');
  const pagiOptions: number[] = [10, 15, 30];
  const [pagi, setPagi] = useState<any>(() => ({
    rowsPerPage: _.first(pagiOptions),
    page: 0,
  }));
  const [groupServiceSlice, setGroupSevicesSlice] = useState<any[]>([]);

  useEffect((): any => {
    if (!_.isEmpty(groupServiceList) && groupServiceList.length) {
      AppHelper.setPagiClient(groupServiceList, pagi, setGroupSevicesSlice);
    }
  }, [groupServiceList, pagi]);

  useEffect(() => {
    dispatch(actions.resetAll());
    dispatch(actions.getAllManageType(SettingManageType.Group));
    dispatch(actions.getManageType(SettingManageType.Group));
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
      dispatch(actions.getAllManageType(SettingManageType.Group));
      closeDialog();
    }
  }, [success]);

  const syncTitleData = () => {
    dispatch(actions.getAllManageType(SettingManageType.Group));
  };

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<any>('code');

  const handleRequestSort = (event, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const changeStatusTitle = (e, id) => {
    dispatch(
      actions.changeManageTypeActive({
        id,
        isActive: e.target.checked,
        manageType: SettingManageType.Group,
      }),
    );
  };

  const deleteTitle = () => {
    if (idDelete === '') return;
    dispatch(
      actions.deleteManageType({
        id: idDelete,
        manageType: SettingManageType.Group,
      }),
    );
  };

  const openDeleteTitle = id => {
    setIdDelete(id);
    setOpenDelete(true);
  };

  const setOpenUpdateTitleModal = groupService => {
    setOpenUpdateTitle(true);
    dispatch(actions.setTempManageType(groupService));
  };

  const closeDialog = () => {
    setOpenAddTitle(false);
    setOpenUpdateTitle(false);
    setOpenDelete(false);
  };

  const renderTableControl = () => {
    return (
      <div className="row">
        <div className="col-md-6 col-sm-6 col-xs-6">
          <div className="btn-group">
            <button
              className="btn btn-info"
              onClick={() => setOpenAddTitle(true)}
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
        columns={tableValue}
      />
    );
  };

  const renderTable = () => {
    if (!_.isEmpty(groupServiceSlice) && groupServiceSlice.length) {
      const tableData: any[] = AppHelper.stableSort(
        groupServiceSlice,
        AppHelper.getComparator(order, orderBy),
      );
      return tableData.map((row, idx) => {
        const title = _.cloneDeep(row);
        return (
          <TableRow key={row.id}>
            {tableValue.map(column => {
              const value = title[column.id];
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
                        checked={title.is_active}
                        onChange={e => changeStatusTitle(e, title.id)}
                        color="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                    </Tooltip>
                    <Tooltip title={'Sửa'} enterDelay={500} leaveDelay={100}>
                      <button
                        className="btn btn-primary btn-xs"
                        onClick={() => setOpenUpdateTitleModal(title)}
                      >
                        <i className="fa fa-pencil"></i>
                      </button>
                    </Tooltip>
                    <Tooltip title={'Xoá'} enterDelay={500} leaveDelay={100}>
                      <button
                        className="btn btn-danger btn-xs mx-2"
                        onClick={() => openDeleteTitle(title.id)}
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
    if (!_.isEmpty(groupServiceSlice)) {
      return (
        <TablePagination
          rowsPerPageOptions={pagiOptions}
          component="div"
          count={groupServiceList.length}
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
      {openAddTitle ? (
        <ModalAddGroupService open={true} onClose={closeDialog} />
      ) : null}
      {openUpdateTitle ? (
        <ModalUpdateGroupService open={true} onClose={closeDialog} />
      ) : null}
      <ModalConfirm
        title={'Bạn có chắc chắn muốn xoá nhóm dịch vụ Này?'}
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
