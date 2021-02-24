/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import * as _ from 'lodash';
import * as DeptServiceSlice from 'store/departmentService/shared/slice';
import * as DeptServiceSelector from 'store/departmentService/shared/selectors'
import { DepartmentServiceSaga } from 'store/departmentService/shared/saga';
import { useInjectReducer, useInjectSaga } from 'store/core/@reduxjs/redux-injectors';
import { useDispatch, useSelector } from 'react-redux';
import { AppHelper, Order } from 'utils/app.helper';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
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
    minHeight: '100px',
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

const tableImportData: any[] = [
  {id: 'department_code', label: 'Mã Phòng Ban', minWidth: 150},
  {id: 'department_name', label: 'Tên Phòng Ban', minWidth: 150},
  {id: 'examination_code', label: 'Mã Kiểm Tra', minWidth: 150},
  {id: 'examination_name', label: 'Kiểm Tra', minWidth: 120},
  {id: 'message', label: 'Lỗi', minWidth: 120},
  {id: 'room_code', label: 'Mã Phòng', minWidth: 120},
  {id: 'room_name', label: 'Tên Phòng', minWidth: 120},
  {id: 'service_code', label: 'Mã Dịch Vụ', minWidth: 150},
  {id: 'service_name', label: 'Tên Dịch Vụ', minWidth: 150},
  {id: 'status', label: 'Trạng Thái', minWidth: 120},
];

export function ModalUploadFile({ open, onClose }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [fileImportName, setFileImportName] = useState<string>('');
  const [fileImport, setFileImport] = useState<any>(null);
  const dataImport: any = useSelector<any>(DeptServiceSelector.selectImportFiles);

  useInjectReducer({
    key: DeptServiceSlice.sliceKey,
    reducer: DeptServiceSlice.reducer,
  });
  useInjectSaga({
    key: DeptServiceSlice.sliceKey,
    saga: DepartmentServiceSaga,
  });

  useEffect(() => {
    return () => {
      dispatch(DeptServiceSlice.actions.clearImportFile());
    }
  }, []);

  const importFile = e => {
    e.preventDefault();
    if (!fileImport) return;
    dispatch(DeptServiceSlice.actions.importDeptService(fileImport));
    setFileImport({});
    setFileImportName('');
  };

  const changeFileImport = e => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      setFileImport(file);
      setFileImportName(AppHelper.truncate(file.name, 20));
    }
  };

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<any>('user_name');

  const handleRequestSort = (event, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const renderColumns = () => {
    return (
      <TableHeaderSort
        classes={classes}
        onRequestSort={handleRequestSort}
        order={order}
        orderBy={orderBy}
        columns={tableImportData}
      />
    );
  };

  const renderTable = () => {
    if (!_.isEmpty(dataImport)) {
      const tableData: any[] = AppHelper.stableSort(
        dataImport.import,
        AppHelper.getComparator(order, orderBy),
      );
      return tableData.map((row, idx) => {
        const fileImport = _.cloneDeep(row);
        return (
          <TableRow key={idx}>
            {
              tableImportData.map((col, id) => {
                const value = fileImport[col.id];
                if (col.id === 'status') {
                  if (value) {
                    return (
                      <TableCell key={id}>
                        <i
                          style={{ color: '#4caf50', fontSize: '16px' }}
                          className="fa fa-check-circle"
                          aria-hidden="true"
                        ></i>
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell key={id}>
                        <i
                          style={{ color: '#ff0000', fontSize: '16px' }}
                          className="fa fa-times-circle"
                          aria-hidden="true"
                        ></i>
                      </TableCell>
                    );
                  }
                }else if (col.id === 'message') {
                  return (
                    <TableCell key={id} style={{ color: '#ff0000', fontSize: '16px' }}>{value ? value : '-'}</TableCell> 
                  )
                }
                return (
                  <TableCell key={id}>{value ? value : '-'}</TableCell> 
                )
              })
            }
          </TableRow>
        )
      });
    } else {
      return (
        <TableRow>
          <TableCell
            className="w-100"
            align="center"
            colSpan={tableImportData.length}
          >
            No matching records found
          </TableCell>
        </TableRow>
      );
    }
  }

  return (
    <Dialog
      fullWidth={true}
      fullScreen={true}
      maxWidth={'lg'}
      open={open}
      onClose={onClose}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogContent>
        <form onSubmit={importFile}>
          <h4 className="modal-title pb-3">Upload file dữ liệu phòng ban dịch vụ</h4>
          <div className="custom-file mb-3">
            <input type="file" className="custom-file-input" id="import-file" lang="en" onChange={changeFileImport}/>
            <label className="custom-file-label" htmlFor="import-file">
              {!_.isEmpty(fileImportName)
                  ? fileImportName
                  : 'Chọn file tải lên'}
            </label>
          </div>
          <div className="form-group d-flex justify-content-end mb-3">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Đóng</button>
            <button type="submit" className="btn btn-primary ml-2">Import</button>
          </div>
          <div className="col-sm-12 px-0">
            <Paper className={classes.root}>
              <TableContainer className={classes.container}>
                <Table stickyHeader>
                  <TableHead>{renderColumns()}</TableHead>
                  <TableBody>{renderTable()}</TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
