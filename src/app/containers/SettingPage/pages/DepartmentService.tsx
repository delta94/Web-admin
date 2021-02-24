/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import * as _ from 'lodash';
import * as ServiceSlice from 'store/services/shared/slice';
import * as DeptsSlice from 'store/department/shared/slice';
import * as DeptTypeSlice from 'store/deparmentType/shared/slice';
import * as DeptServiceSlice from 'store/departmentService/shared/slice';
import {
  useInjectReducer,
  useInjectSaga,
} from 'store/core/@reduxjs/redux-injectors';
import { useSelector, useDispatch } from 'react-redux';
import { ServicesSaga } from 'store/services/shared/saga';
import { DepartmentSaga } from 'store/department/shared/saga';
import { DepartmentTypeSaga } from 'store/deparmentType/shared/saga';
import { DepartmentServiceSaga } from 'store/departmentService/shared/saga';
import { AppHelper, Order } from 'utils/app.helper';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  selectLoading,
  selectListDeptService,
  selectError,
  selectSuccess,
} from 'store/departmentService/shared/selectors';
import { selectListServices } from 'store/services/shared/selectors';
import { selectListDept } from 'store/department/shared/selectors';
import { selectListDeptType } from 'store/deparmentType/shared/selectors';
import { NotifyService } from 'services/notify.service';
import { useSnackbar } from 'notistack';
import { Tooltip } from '@material-ui/core';
import { ModalAddDepartmentService } from '../components/DepartmentService/AddDepartmentService';
import { ModalUpdateDepartmentService } from '../components/DepartmentService/UpdateDepartmentService';
import { ModalConfirm } from 'app/components/Modal/Confirm';
import {
  optionsDeptType,
  optionsCreateBy,
  tableDeptService,
} from 'store/departmentService/constants/departmentService.constant';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import { DeptServiceModel } from 'store/departmentService/services/departmentService.http';
import {
  RESPONSE_CONSTANT,
  FilterKey,
} from 'store/departmentService/constants/departmentService.constant';
import { ModalUploadFile } from '../components/DepartmentService/ModalUploadFile';
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
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    minHeight: '200px',
    maxHeight: '800px',
  },
  table: {
    minWidth: '100vw',
    overflowX: 'scroll',
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

const filterOptions = createFilterOptions({
  matchFrom: 'any',
  stringify: (option: any) => option.description,
  trim: true,
});

const TEMPLATE_DEPT = {
  url: '/templates/Tekmedi.Template_DepartmentService.xlsx',
  fileName: 'Tekmedi.Template_DepartmentService.xlsx',
};
interface FilteElement {
  id: string;
  description: string;
}

export function DepartmentService() {
  const { enqueueSnackbar } = useSnackbar();
  const notifyController = new NotifyService(enqueueSnackbar);
  useInjectReducer({
    key: DeptServiceSlice.sliceKey,
    reducer: DeptServiceSlice.reducer,
  });
  useInjectSaga({
    key: DeptServiceSlice.sliceKey,
    saga: DepartmentServiceSaga,
  });
  useInjectReducer({
    key: ServiceSlice.sliceKey,
    reducer: ServiceSlice.reducer,
  });
  useInjectSaga({ key: ServiceSlice.sliceKey, saga: ServicesSaga });
  useInjectReducer({
    key: DeptsSlice.sliceKey,
    reducer: DeptsSlice.reducer,
  });
  useInjectSaga({ key: DeptsSlice.sliceKey, saga: DepartmentSaga });
  useInjectReducer({
    key: DeptTypeSlice.sliceKey,
    reducer: DeptTypeSlice.reducer,
  });

  useInjectSaga({ key: DeptTypeSlice.sliceKey, saga: DepartmentTypeSaga });
  const classes = useStyles();
  const dispatch = useDispatch();
  const groupServiceList: any = useSelector(selectListDeptService);
  const listService: any = useSelector(selectListServices);
  const listDept: any = useSelector(selectListDept);
  const listDeptType: any = useSelector(selectListDeptType);
  const loading: any = useSelector<any>(selectLoading);
  const error: any = useSelector<any>(selectError);
  const success: any = useSelector<any>(selectSuccess);
  const defaultFilter: DeptServiceModel = {
    deptId: '',
    deptDesc: '',
    roomId: '',
    roomDesc: '',
    examId: '',
    examDesc: '',
    serviceId: '',
    serviceDesc: '',
    usageTypeId: '',
    usageTypeDesc: '',
    typeId: '',
    typeDesc: '',
    page: 0,
    rowsPerPage: 10,
  };
  const [mainFilter, setMainFilter] = useState<DeptServiceModel>(defaultFilter);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openImport, setOpenImport] = useState<boolean>(false);
  const [idDelete, setIdDelete] = useState<string>('');
  const pagiOptions: number[] = [10, 15, 25, 50, 100];
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<any>('code');

  useEffect(() => {
    dispatch(DeptTypeSlice.actions.resetAll());
    dispatch(DeptServiceSlice.actions.getAllDeptService(defaultFilter));
    dispatch(ServiceSlice.actions.getAllServices());
    dispatch(DeptsSlice.actions.getAllDepartment());
    dispatch(DeptTypeSlice.actions.getAllDepartmentType());
    return () => {
      dispatch(DeptServiceSlice.actions.resetAll());
      dispatch(ServiceSlice.actions.resetAll());
      dispatch(DeptsSlice.actions.resetAll());
    };
  }, []);

  useEffect(() => {
    if (!_.isEmpty(error)) {
      notifyController.setNotifyMessage(error.message).setFailNotify();
      dispatch(DeptServiceSlice.actions.clearError());
    }
  }, [error]);

  useEffect(() => {
    if (!_.isEmpty(success)) {
      notifyController.setNotifyMessage(success.message).setSuccessNotify();
      const { key, data } = success;
      if (key === RESPONSE_CONSTANT.EXPORT_DEPT_SERVICE_SUCCESS) {
        AppHelper.createDownloadFile({
          file_path: data.file_path,
          file_name: data.file_name,
        });
      } else if (
        key === RESPONSE_CONSTANT.CHANGE_STATUS_DEPT_SERVICE_SUCCESS ||
        key === RESPONSE_CONSTANT.DELETE_DEPT_SERVICE_SUCCESS ||
        key === RESPONSE_CONSTANT.CREATE_DEPT_SERVICE_SUCCESS
      ) {
        dispatch(DeptServiceSlice.actions.getAllDeptService(mainFilter));
        closeDialog();
      }
      dispatch(DeptServiceSlice.actions.clearSuccess());
    }
  }, [success]);

  const handleRequestSort = (event, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangeStatus = (e, id) => {
    dispatch(
      DeptServiceSlice.actions.changeDeptServiceActive({
        id,
        isActive: e.target.checked,
      }),
    );
  };

  const deleteDeptService = () => {
    if (idDelete === '') return;
    dispatch(DeptServiceSlice.actions.deleteDeptService(idDelete));
  };

  const openDeleteDeptService = id => {
    setIdDelete(id);
    setOpenDelete(true);
  };

  const handleUpdate = id => {
    dispatch(DeptServiceSlice.actions.getDeptServiceWithId(id));
    setOpenUpdate(true);
  };

  const handleAdd = () => setOpenAdd(true);

  const closeDialog = () => {
    setOpenAdd(false);
    setOpenUpdate(false);
    setOpenDelete(false);
    setOpenImport(false);
  };

  const handleFilter = (keySearch: FilterKey, event?: unknown, value?: any) => {
    let valueSearch: FilteElement = {
      id: '',
      description: '',
    };
    if (!_.isEmpty(value)) {
      valueSearch = {
        id: value.id,
        description: value.description,
      };
    }
    switch (keySearch) {
      case FilterKey.DEPARTMENT:
        setMainFilter({
          ...mainFilter,
          page: 0,
          deptId: valueSearch.id,
          deptDesc: valueSearch.description,
        });
        break;
      case FilterKey.EXAMINATION:
        setMainFilter({
          ...mainFilter,
          page: 0,
          examId: valueSearch.id,
          examDesc: valueSearch.description,
        });
        break;
      case FilterKey.ROOM:
        setMainFilter({
          ...mainFilter,
          page: 0,
          roomId: valueSearch.id,
          roomDesc: valueSearch.description,
        });
        break;
      case FilterKey.SERVICE:
        setMainFilter({
          ...mainFilter,
          page: 0,
          serviceId: valueSearch.id,
          serviceDesc: valueSearch.description,
        });
        break;
      case FilterKey.USAGE:
        setMainFilter({
          ...mainFilter,
          page: 0,
          usageTypeId: valueSearch.id,
          usageTypeDesc: valueSearch.description,
        });
        break;
      case FilterKey.TYPE:
        setMainFilter({
          ...mainFilter,
          page: 0,
          typeId: valueSearch.id,
          typeDesc: valueSearch.description,
        });
        break;
      default:
        setMainFilter(defaultFilter);
        break;
    }
  };

  const submitSearch = e => {
    e.preventDefault();
    dispatch(DeptServiceSlice.actions.getAllDeptService(mainFilter));
  };

  const refreshData = () => {
    handleFilter(FilterKey.DEFAULT);
    dispatch(DeptServiceSlice.actions.getAllDeptService(defaultFilter));
  };

  const downloadTemplate = () => {
    AppHelper.createDownloadFile({
      file_path: TEMPLATE_DEPT.url,
      file_name: TEMPLATE_DEPT.fileName,
    });
  };

  const exportFile = () => {
    dispatch(DeptServiceSlice.actions.exportDeptService(mainFilter));
  };

  const openImportModal = () => setOpenImport(true);

  const renderFilter = () => {
    return (
      <form className="row py-2" onSubmit={submitSearch}>
        <div className="col-md-2">
          <label className="mb-3">Khoa</label>
          <Autocomplete
            inputValue={mainFilter.deptDesc}
            options={listDeptType.length ? listDeptType : []}
            getOptionLabel={option => option.description}
            renderOption={(option: any) => (
              <React.Fragment>
                <span>{option.description}</span>
              </React.Fragment>
            )}
            fullWidth={true}
            filterOptions={filterOptions}
            noOptionsText="No options"
            size="small"
            renderInput={(params: any) => {
              let inputProps = {
                ...params.inputProps,
                value: mainFilter.deptDesc,
              };
              return (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Vui lòng chọn khoa..."
                  inputProps={{
                    ...inputProps,
                  }}
                />
              );
            }}
            onChange={(e, value) =>
              handleFilter(FilterKey.DEPARTMENT, e, value)
            }
            onInputChange={(e, value) =>
              setMainFilter({
                ...mainFilter,
                deptDesc: value,
              })
            }
          />
        </div>
        <div className="col-md-2">
          <label className="mb-3">Phòng chỉ định</label>
          <Autocomplete
            inputValue={mainFilter.examDesc}
            options={listDept.length ? listDept : []}
            getOptionLabel={option => option.description}
            fullWidth={true}
            filterOptions={filterOptions}
            noOptionsText="No options"
            size="small"
            renderInput={params => {
              let inputProps = {
                ...params.inputProps,
                value: mainFilter.examDesc,
              };
              return (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Chọn phòng chỉ định..."
                  inputProps={{
                    ...inputProps,
                  }}
                />
              );
            }}
            onChange={(e, value) =>
              handleFilter(FilterKey.EXAMINATION, e, value)
            }
            onInputChange={(e, value) =>
              setMainFilter({
                ...mainFilter,
                examDesc: value,
              })
            }
          />
        </div>
        <div className="col-md-2">
          <label className="mb-3">Phòng thực hiện</label>
          <Autocomplete
            inputValue={mainFilter.roomDesc}
            options={listDept.length ? listDept : []}
            getOptionLabel={option => option.description}
            fullWidth={true}
            filterOptions={filterOptions}
            noOptionsText="No options"
            size="small"
            renderInput={params => {
              let inputProps = {
                ...params.inputProps,
                value: mainFilter.roomDesc,
              };
              return (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Chọn phòng thực hiện..."
                  inputProps={{
                    ...inputProps,
                  }}
                />
              );
            }}
            onChange={(e, value) => handleFilter(FilterKey.ROOM, e, value)}
            onInputChange={(e, value) =>
              setMainFilter({
                ...mainFilter,
                roomDesc: value,
              })
            }
          />
        </div>
        <div className="col-md-2">
          <label className="mb-3">Dịch vụ</label>
          <Autocomplete
            inputValue={mainFilter.serviceDesc}
            options={listService.length ? listService : []}
            getOptionLabel={option => option.description}
            fullWidth={true}
            filterOptions={filterOptions}
            noOptionsText="No options"
            size="small"
            renderInput={params => {
              let inputProps = {
                ...params.inputProps,
                value: mainFilter.serviceDesc,
              };
              return (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Chọn dịch vụ..."
                  inputProps={{
                    ...inputProps,
                  }}
                />
              );
            }}
            onChange={(e, value) => handleFilter(FilterKey.SERVICE, e, value)}
            onInputChange={(e, value) =>
              setMainFilter({
                ...mainFilter,
                serviceDesc: value,
              })
            }
          />
        </div>
        <div className="col-md-2">
          <label className="mb-3">Loại</label>
          <Autocomplete
            inputValue={mainFilter.usageTypeDesc}
            options={optionsDeptType}
            getOptionLabel={option => option.description}
            fullWidth={true}
            filterOptions={filterOptions}
            noOptionsText="No options"
            size="small"
            renderInput={params => {
              let inputProps = {
                ...params.inputProps,
                value: mainFilter.usageTypeDesc,
              };
              return (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Chọn loại..."
                  inputProps={{
                    ...inputProps,
                  }}
                />
              );
            }}
            onChange={(e, value) => handleFilter(FilterKey.USAGE, e, value)}
            onInputChange={(e, value) =>
              setMainFilter({
                ...mainFilter,
                usageTypeDesc: value,
              })
            }
          />
        </div>
        <div className="col-md-2">
          <label className="mb-3">Tạo bởi</label>
          <Autocomplete
            inputValue={mainFilter.typeDesc}
            options={optionsCreateBy}
            getOptionLabel={option => option.description}
            fullWidth={true}
            filterOptions={filterOptions}
            noOptionsText="No options"
            size="small"
            renderInput={params => {
              let inputProps = {
                ...params.inputProps,
                value: mainFilter.typeDesc,
              };
              return (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Tạo bởi..."
                  inputProps={{
                    ...inputProps,
                  }}
                />
              );
            }}
            onChange={(e, value) => handleFilter(FilterKey.TYPE, e, value)}
            onInputChange={(e, value) =>
              setMainFilter({
                ...mainFilter,
                typeDesc: value,
              })
            }
          />
        </div>
        <div className="col-md-3 pt-3">
          <div className="btn-group">
            <button
              className="btn btn-primary mt-auto"
              type="submit"
              style={{ minWidth: '118px' }}
            >
              Tìm kiếm <i className="fa fa-search"></i>
            </button>
          </div>
          <div className="btn-group ml-2">
            <button
              style={{ minWidth: '120px' }}
              type="button"
              className="btn btn-info"
              onClick={refreshData}
            >
              Refresh <i className="fa fa-repeat"></i>
            </button>
          </div>
        </div>
      </form>
    );
  };

  const renderTableControl = () => {
    return (
      <div className="row py-3">
        <div className="col-md-12 col-sm-12 col-xs-12">
          <div className="btn-group">
            <button id="btnAdd" className="btn btn-primary" onClick={handleAdd}>
              Thêm mới <i className="fa fa-plus" />
            </button>
          </div>
          <div className="btn-group ml-2">
            <button className="btn btn-warning" onClick={downloadTemplate}>
              Template <i className="fa fa-sticky-note-o" />
            </button>
          </div>
          <div className="btn-group ml-2" onClick={exportFile}>
            <button id="btnExport" className="btn btn-info">
              Export <i className="fa fa-download" />
            </button>
          </div>
          <div className="btn-group ml-2">
            <button
              className="btn btn-success"
              type="button"
              onClick={openImportModal}
            >
              Import <i className="fa fa-upload" />
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
        columns={tableDeptService}
      />
    );
  };

  const renderTable = () => {
    if (!_.isEmpty(groupServiceList) && groupServiceList.data.length) {
      const tableData: any[] = AppHelper.stableSort(
        groupServiceList.data,
        AppHelper.getComparator(order, orderBy),
      );
      return tableData.map((row, idx) => {
        const deptService = _.cloneDeep(row);
        return (
          <TableRow key={row.id}>
            {tableDeptService.map(column => {
              const value = deptService[column.id];
              if (column.id === 'no') {
                const { page, rowsPerPage } = mainFilter;
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
                        checked={deptService.is_active}
                        onChange={e => handleChangeStatus(e, deptService.id)}
                        color="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                    </Tooltip>
                    <Tooltip title={'Sửa'} enterDelay={500} leaveDelay={100}>
                      <button
                        className="btn btn-primary btn-xs"
                        onClick={() => handleUpdate(deptService.id)}
                      >
                        <i className="fa fa-pencil"></i>
                      </button>
                    </Tooltip>
                    <Tooltip title={'Xoá'} enterDelay={500} leaveDelay={100}>
                      <button
                        className="btn btn-danger btn-xs mx-2"
                        onClick={() => openDeleteDeptService(deptService.id)}
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
            colSpan={tableDeptService.length}
          >
            No matching records found
          </TableCell>
        </TableRow>
      );
    }
  };

  const handleChangePage = (e, page) => {
    const newFilter = {
      ...mainFilter,
      page,
    };
    setMainFilter(newFilter);
    dispatch(DeptServiceSlice.actions.getAllDeptService(newFilter));
  };

  const handleChangeRowsPerPage = e => {
    const newFilter = {
      ...mainFilter,
      page: 0,
      rowsPerPage: +e.target.value,
    };
    setMainFilter(newFilter);
    dispatch(DeptServiceSlice.actions.getAllDeptService(newFilter));
  };

  const renderPagination = () => {
    if (!_.isEmpty(groupServiceList)) {
      return (
        <TablePagination
          rowsPerPageOptions={pagiOptions}
          component="div"
          count={groupServiceList.recordsTotal}
          rowsPerPage={mainFilter.rowsPerPage}
          page={mainFilter.page}
          labelRowsPerPage={'Hiển Thị'}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      );
    }
  };

  return (
    <div className="row">
      {openAdd && (
        <ModalAddDepartmentService open={true} onClose={closeDialog} />
      )}
      {openUpdate && (
        <ModalUpdateDepartmentService open={true} onClose={closeDialog} />
      )}
      <ModalConfirm
        title={'Bạn có chắc chắn muốn xóa dữ liệu này?'}
        other={{
          bodyText: '',
        }}
        keyConfirm={''}
        open={openDelete}
        onClose={() => closeDialog()}
        confirmMethod={() => deleteDeptService()}
      />
      {openImport && (
        <ModalUploadFile open={openImport} onClose={closeDialog} />
      )}
      {loading ? <AppLoading loading={true} /> : null}
      <div className="col-md-12">
        <div className="card card-topline-red">
          <div className="card-head"></div>
          <div className="card-body">
            {renderFilter()}
            {renderTableControl()}
            <div className="table-scrollable">
              <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                  <Table stickyHeader className={classes.table}>
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
