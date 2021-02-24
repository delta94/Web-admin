import React from 'react';
import * as RoomSelector from 'store/room/shared/selectors';
import * as _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import {
  useInjectReducer,
  useInjectSaga,
} from 'store/core/@reduxjs/redux-injectors';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { CssTextField } from 'store/room/constants/http.constant';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Autocomplete from '@material-ui/lab/Autocomplete';

export function RegisterSTTModal({ open, onClose }) {
  const dispatch = useDispatch();
  const { register, errors, handleSubmit, } = useForm();

  const dataRoomAll: any = useSelector(RoomSelector.selectRooms);

  const changeRoom = room => {
    console.log(room);
  };

  return (
    <Dialog
      disableBackdropClick={true}
      fullWidth={true}
      maxWidth={'md'}
      open={open}
      onClose={onClose}
    >
      <DialogContent>
        <form>
          <h4 className="modal-title mb-4">Đăng Ký Số Thứ Tự</h4>
          <div className="row">
            <div className="form-group col-sm-12 col-md-6">
              <label htmlFor="code">Mã bệnh nhân</label>
              <input
                id="code"
                type="text"
                className="form-control"
                name="code"
                placeholder="Nhập Mã bệnh nhân"
                style={{ height: '55px' }}
              />
            </div>
            <div className="col-sm-12 col-md-6">
              <div className="form-group">
                <label className="col-sm-3 control-label text-edit pl-0">
                  Phòng khám
                </label>
                <div className="w-100">
                  <Autocomplete
                    options={
                      !_.isEmpty(dataRoomAll) && dataRoomAll.length
                        ? dataRoomAll
                        : []
                    }
                    style={{ height: '39px' }}
                    getOptionLabel={(option: any) =>
                      option.description + ' - ' + option.code
                    }
                    renderInput={(params: any) => {
                      return (
                        <CssTextField
                          style={{
                            background: 'white',
                            fontSize: '16px',
                          }}
                          {...params}
                          variant="outlined"
                          name="room"
                          placeholder="Nhập tên phòng khám"
                        />
                      );
                    }}
                    onChange={(event, value) => changeRoom(value)}
                  />
                </div>
              </div>
            </div>
            <div className="form-group col-sm-12 col-md-6">
              <label htmlFor="name">Tên bệnh nhân</label>
              <input
                id="name"
                type="text"
                className="form-control"
                name="name"
                placeholder="Nhập Tên bệnh nhân"
                style={{ height: '55px' }}
              />
            </div>
          </div>
          <div className="form-group d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Đóng
            </button>
            <button type="submit" className="btn btn-primary ml-2">
              Đăng ký
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
