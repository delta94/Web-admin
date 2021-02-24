/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import * as _ from 'lodash';
import * as RoomSlice from 'store/room/shared/slice';
import * as RoomSelector from 'store/room/shared/selectors';
import * as DeviceSlice from 'store/device/shared/slice';
import * as DeviceSelector from 'store/device/shared/selectors';
import {
  useInjectReducer,
  useInjectSaga,
} from 'store/core/@reduxjs/redux-injectors';
import { useSelector, useDispatch } from 'react-redux';
import { sliceKey, reducer, actions } from 'store/device/shared/slice';
import { RoomSaga } from 'store/room/shared/saga';
import { AppHelper, Order } from 'utils/app.helper';
import { DeviceSaga } from 'store/device/shared/saga';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { NotifyService } from 'services/notify.service';
import { useSnackbar } from 'notistack';
import { Tooltip } from '@material-ui/core';
import { tableDevice } from 'store/device/constants/device.constant';
import { ModalAddDevice } from '../components/Device/AddDeviceModal';
import { ModalEditDevice } from '../components/Device/EditDeviceModal';
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

export function Device() {
  const { enqueueSnackbar } = useSnackbar();
  const notifyController = new NotifyService(enqueueSnackbar);
  useInjectReducer({ key: sliceKey, reducer });
  useInjectSaga({ key: sliceKey, saga: DeviceSaga });
  useInjectReducer({ key: RoomSlice.sliceKey, reducer: RoomSlice.reducer });
  useInjectSaga({ key: RoomSlice.sliceKey, saga: RoomSaga });
  const classes = useStyles();
  const dispatch = useDispatch();
  const devices: any = useSelector<any>(DeviceSelector.selectDevices);
  const loading: any = useSelector<any>(DeviceSelector.selectLoading);
  const error: any = useSelector<any>(DeviceSelector.selectError);
  const success: any = useSelector<any>(DeviceSelector.selectSuccess);
  const rooms: any = useSelector<any>(RoomSelector.selectRooms);
  const [addDevice, setAddDevice] = useState<boolean>(false);
  const [editDevice, setEditDevice] = useState<boolean>(false);
  const [deleteDevice, setDeleteDevice] = useState<boolean>(false);
  const [idDelete, setIdDelete] = useState<string>('');
  const [listDevice, setListDevice] = useState<any[]>([]);
  const pagiOptions: number[] = [10, 15, 30, 50, 100];
  const [filter, setFilter] = useState<any>({
    page: 0,
    rowsPerPage: 10,
  });

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, [filter]);
  };

  useEffectOnMount(() => {
    dispatch(actions.getDeviceAll(filter));
  });

  useEffect(() => {
    dispatch(RoomSlice.actions.getRoomAll());
    return () => {
      dispatch(DeviceSlice.actions.resetAll());
    };
  }, []);

  useEffect(() => {
    if (!_.isEmpty(error)) {
      notifyController.setNotifyMessage(error.message).setFailNotify();
      dispatch(DeviceSlice.actions.clearError());
    }
  }, [error]);

  useEffect(() => {
    if (!_.isEmpty(success)) {
      notifyController.setNotifyMessage(success.message).setSuccessNotify();
      dispatch(DeviceSlice.actions.clearSuccess());
      dispatch(actions.getDeviceAll(filter));
    }
  }, [success]);

  useEffect(() => {
    if (!_.isEmpty(devices) && devices.data.length && rooms && rooms.length) {
      let deviceFormat: any[] = devices.data.map(device => {
        const room = rooms.find(room => room.id === device.room_id);
        if (room) {
          return {
            ...device,
            roomName: room.description,
          };
        }
        return device;
      });
      setListDevice(deviceFormat);
    }
  }, [devices, rooms]);

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<any>('name');

  const handleRequestSort = (event, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const openAddDevice = () => setAddDevice(true);

  const openEditDevice = id => {
    setEditDevice(true);
    dispatch(DeviceSlice.actions.getDeviceById(id));
  };

  const openDeleteDevice = id => {
    setIdDelete(id);
    setDeleteDevice(true);
  };

  const handleDeleteDevice = () => {
    if (idDelete === '') return;
    dispatch(DeviceSlice.actions.deleteDevice(idDelete));
  };

  const closeModal = () => {
    setAddDevice(false);
    setEditDevice(false);
    setDeleteDevice(false);
  };

  const renderTableControl = () => {
    return (
      <div className="row">
        <div className="col-md-6 col-sm-6 col-xs-6">
          <div className="btn-group">
            <a id="addRow" className="btn btn-info" onClick={openAddDevice}>
              Thêm mới <i className="fa fa-plus"></i>
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
        columns={tableDevice}
      />
    );
  };

  const renderTable = () => {
    if (listDevice && listDevice.length) {
      const tableData: any[] = AppHelper.stableSort(
        listDevice,
        AppHelper.getComparator(order, orderBy),
      );
      return tableData.map((row, idx) => {
        const device = _.cloneDeep(row);
        return (
          <TableRow key={row.id}>
            {tableDevice.map(column => {
              const value = device[column.id];
              if (column.id === 'no') {
                const { page, rowsPerPage } = filter;
                return (
                  <TableCell key={column.id}>
                    {page * rowsPerPage + idx + 1}
                  </TableCell>
                );
              } else if (column.id === 'actions') {
                return (
                  <TableCell key={column.id}>
                    <Tooltip title={'Sửa'} enterDelay={500} leaveDelay={100}>
                      <button
                        className="btn btn-primary btn-xs"
                        onClick={() => openEditDevice(device.id)}
                      >
                        <i className="fa fa-pencil"></i>
                      </button>
                    </Tooltip>
                    <Tooltip title={'Xoá'} enterDelay={500} leaveDelay={100}>
                      <button
                        className="btn btn-danger btn-xs mx-2"
                        onClick={() => openDeleteDevice(device.id)}
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
            colSpan={tableDevice.length}
          >
            No matching records found
          </TableCell>
        </TableRow>
      );
    }
  };

  const renderPagination = () => {
    if (!_.isEmpty(devices) && devices.data.length) {
      return (
        <TablePagination
          rowsPerPageOptions={pagiOptions}
          component="div"
          count={devices.recordsTotal}
          rowsPerPage={filter.rowsPerPage}
          page={filter.page}
          labelRowsPerPage={'Hiển Thị'}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      );
    }
  };

  const handleChangePage = (e, page) => {
    let changePage = Object.assign({}, filter, { page });
    setFilter(changePage);
  };

  const handleChangeRowsPerPage = e => {
    let changeRowPerPage = Object.assign({}, filter, {
      rowsPerPage: +e.target.value,
      page: 0,
    });
    setFilter(changeRowPerPage);
  };

  return (
    <div className="row">
      {loading ? <AppLoading loading={true} /> : null}
      <div className="col-md-12">
        {addDevice ? <ModalAddDevice open={true} onClose={closeModal} /> : null}
        {editDevice ? (
          <ModalEditDevice open={true} onClose={closeModal} />
        ) : null}
        <ModalConfirm
          title={'Bạn có chắc chắn muốn xoá thiết bị này?'}
          other={{
            bodyText: '',
          }}
          keyConfirm={''}
          open={deleteDevice}
          onClose={() => closeModal()}
          confirmMethod={() => handleDeleteDevice()}
        />
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
