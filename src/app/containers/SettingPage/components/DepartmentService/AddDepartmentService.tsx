/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import * as _ from 'lodash';
import * as ServiceSlice from 'store/services/shared/slice';
import * as DeptsSlice from 'store/department/shared/slice';
import * as DeptTypeSlice from 'store/deparmentType/shared/slice';
import * as DeptServiceSlice from 'store/departmentService/shared/slice';
import { useInjectReducer, useInjectSaga } from 'store/core/@reduxjs/redux-injectors';
import { useDispatch, useSelector } from 'react-redux';
import {
  RESPONSE_MESSAGE,
  RESPONSE_CONSTANT,
  FilterKey,
  optionsDeptType
} from 'store/departmentService/constants/departmentService.constant';
import { useForm } from 'react-hook-form';
import { ServicesSaga } from 'store/services/shared/saga';
import { DepartmentSaga } from 'store/department/shared/saga';
import { DepartmentTypeSaga } from 'store/deparmentType/shared/saga';
import { DepartmentServiceSaga } from 'store/departmentService/shared//saga';
import { selectListServices } from 'store/services/shared/selectors';
import { selectListDept } from 'store/department/shared/selectors';
import { selectListDeptType } from 'store/deparmentType/shared/selectors';
import { DeptServiceModel, DepartmentServiceHttp } from 'store/departmentService/services/departmentService.http';
import { AppHelper } from 'utils/app.helper';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';

const filterOptions = createFilterOptions({
  matchFrom: 'any',
  stringify: (option: any) => option.description,
  trim: true,
});

export function ModalAddDepartmentService({ open, onClose }) {
  const deptServiceHttp = new DepartmentServiceHttp();
  useInjectReducer({
    key: ServiceSlice.sliceKey,
    reducer: ServiceSlice.reducer,
  });
  useInjectSaga({
    key: ServiceSlice.sliceKey,
    saga: ServicesSaga
  });
  useInjectReducer({
    key: DeptsSlice.sliceKey,
    reducer: DeptsSlice.reducer,
  });
  useInjectSaga({
    key: DeptsSlice.sliceKey,
    saga: DepartmentSaga
  });
  useInjectReducer({
    key: DeptTypeSlice.sliceKey,
    reducer: DeptTypeSlice.reducer,
  });
  useInjectSaga({
    key: DeptTypeSlice.sliceKey,
    saga: DepartmentTypeSaga
  });
  useInjectReducer({
    key: DeptServiceSlice.sliceKey,
    reducer: DeptServiceSlice.reducer,
  });
  useInjectSaga({
    key: DeptServiceSlice.sliceKey,
    saga: DepartmentServiceSaga
  });
  const listService: any = useSelector(selectListServices);
  const listDept: any = useSelector(selectListDept);
  const listDeptType: any = useSelector(selectListDeptType);
  const [selected, setSelected] = useState<DeptServiceModel>({
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
    page: 0,
    rowsPerPage: 0
  });

  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const onSubmit = ({ isActive }) => {
    deptServiceHttp
      .checkUniqueCodeDeptService(selected)
      .then(response => response.data)
      .then(checkCode => {
        if (AppHelper.checkResponseData(checkCode)) {
          if (!_.get(checkCode, 'result')) {
            dispatch(DeptServiceSlice.actions.createDeptService({
              ...selected,
              isActive
            }));
          }else {
            dispatch(DeptServiceSlice.actions.setError({
              id: AppHelper.generateUUID() + Date.now(),
              key: RESPONSE_CONSTANT.CHECK_CODE_FAIL,
              message: RESPONSE_MESSAGE.CHECK_CODE_FAIL,
            }));
          }
        }
      })

  };

  const selectDeptType = (e: unknown, value: any, type: FilterKey) => {
    let initValue: any = {
      id: '',
      description: '',
    };
    if (!_.isEmpty(value)) {
      initValue = {...value};
    }
    switch (type) {
      case FilterKey.DEPARTMENT:
        setSelected({
          ...selected,
          deptId: initValue.id,
          deptDesc: initValue.description,
        });
        break;
      case FilterKey.EXAMINATION:
        setSelected({
          ...selected,
          examId: initValue.id,
          examDesc: initValue.description,
        });
        break;
      case FilterKey.ROOM:
        setSelected({
          ...selected,
          roomId: initValue.id,
          roomDesc: initValue.description,
        });
        break;
      case FilterKey.USAGE:
        setSelected({
          ...selected,
          usageTypeId: initValue.id,
          usageTypeDesc: initValue.description,
        });
        break;
      case FilterKey.SERVICE:
        setSelected({
          ...selected,
          serviceId: initValue.id,
          serviceDesc: initValue.description,
        });
        break;
    }
  }

  return (
    <Dialog
      disableBackdropClick={true}
      fullWidth={true}
      maxWidth={'xs'}
      open={open}
      onClose={onClose}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4 className="modal-title pb-3">Ph??ng Ban - D???ch V???</h4>
          <div className="form-group">
            <label htmlFor="department_type">Khoa</label>
            <Autocomplete
              inputValue={selected.deptDesc}
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
                const inputProps = {
                  ...params.inputProps,
                  value: selected.deptDesc
                };
                return (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Vui l??ng ch???n khoa..."
                    inputProps={{...inputProps}}
                    inputRef={register()}
                    name="department_type"
                  />
                );
              }}
              onInputChange={(e, value) => setSelected({
                ...selected,
                deptDesc: value
              })}
              onChange={(e, value) => selectDeptType(e, value, FilterKey.DEPARTMENT)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Ph??ng th???c hi???n</label>
            <Autocomplete
              inputValue={selected.roomDesc}
              options={listDept.length ? listDept : []}
              getOptionLabel={option => option.description}
              fullWidth={true}
              filterOptions={filterOptions}
              noOptionsText="No options"
              size="small"
              renderInput={params => {
                const inputProps = {
                  ...params.inputProps,
                  value: selected.roomDesc
                };
                return (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Ch???n ph??ng th???c hi???n..."
                    inputProps={{ ...inputProps }}
                  />
                );
              }}
              onInputChange={(e, value) => setSelected({
                ...selected,
                roomDesc: value
              })}
              onChange={(e, value) => selectDeptType(e, value, FilterKey.ROOM)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Ph??ng ch??? ?????nh</label>
            <Autocomplete
              inputValue={selected.examDesc}
              options={listDept.length ? listDept : []}
              getOptionLabel={option => option.description}
              fullWidth={true}
              filterOptions={filterOptions}
              noOptionsText="No options"
              size="small"
              renderInput={params => {
                const inputProps = {
                  ...params.inputProps,
                  value: selected.examDesc
                };
                return (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Ch???n ph??ng ch??? ?????nh..."
                    inputProps={{
                      ...inputProps,
                    }}
                  />
                );
              }}
              onInputChange={(e, value) => setSelected({
                ...selected,
                examDesc: value
              })}
              onChange={(e, value) => selectDeptType(e, value, FilterKey.EXAMINATION)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">D???ch v???</label>
            <Autocomplete
              inputValue={selected.serviceDesc}
              options={listService.length ? listService : []}
              getOptionLabel={option => option.description}
              fullWidth={true}
              filterOptions={filterOptions}
              noOptionsText="No options"
              size="small"
              renderInput={params => {
                const inputProps = {
                  ...params.inputProps,
                  value: selected.serviceDesc
                };
                return (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Ch???n d???ch v???..."
                    inputProps={{
                      ...inputProps,
                    }}
                  />
                );
              }}
              onInputChange={(e, value) => setSelected({
                ...selected,
                serviceDesc: value
              })}
              onChange={(e, value) => selectDeptType(e, value, FilterKey.SERVICE)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="name">Lo???i</label>
            <Autocomplete
              inputValue={selected.usageTypeDesc}
              options={optionsDeptType}
              getOptionLabel={option => option.description}
              fullWidth={true}
              filterOptions={filterOptions}
              noOptionsText="No options"
              size="small"
              renderInput={params => {
                const inputProps = {
                  ...params.inputProps,
                  value: selected.usageTypeDesc
                };
                return (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Ch???n lo???i..."
                    inputProps={{
                      ...inputProps,
                    }}
                  />
                );
              }}
              onInputChange={(e, value) => setSelected({
                ...selected,
                usageTypeDesc: value
              })}
              onChange={(e, value) => selectDeptType(e, value, FilterKey.USAGE)}
            />
          </div>
          
          <div className="form-group">
            <label className="checkbox-inline">
              <input type="checkbox" ref={register()} name="isActive" defaultChecked={true} /> 
              Ho???t ?????ng
            </label>
          </div>
          <div className="form-group d-flex justify-content-end">
            <button type="button" className="btn btn-secondary" onClick={onClose}>????ng</button>
            <button type="submit" className="btn btn-primary ml-2">L??u</button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
