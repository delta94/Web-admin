/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as _ from 'lodash';

export function Schedule() {
  const dispatch = useDispatch();
  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };
  useEffectOnMount(() => {});
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-topline-red">
          <div className="card-head"></div>
          <div className="card-body ">
            <div className="row">
              <div className="col-md-6 col-sm-6 col-xs-6">
                <div className="btn-group">
                  <a id="addRow" className="btn btn-info">
                    Thêm mới <i className="fa fa-plus"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="table-scrollable">
              <table
                className="table table-hover table-checkable order-column full-width"
                id="MainTable"
              >
                <thead>
                  <tr>
                    <th
                    //  width="5%"
                    >
                      {' '}
                      #{' '}
                    </th>

                    <th>Bác sĩ</th>
                    <th>Từ</th>
                    <th>Đến</th>
                    <th>Phòng</th>
                    <th>Chức năng</th>
                  </tr>
                </thead>
                <tbody id="data">
                  <tr>
                    <td className=" text-muted">1</td>
                    <td className="" data-order="NV0001">
                      NV0001
                    </td>
                    <td className="" data-order="2020-02-22T08:00:00">
                      2020-02-22T08:00:00
                    </td>
                    <td className="" data-order="2020-02-22T09:00:00">
                      2020-02-22T09:00:00
                    </td>
                    <td className="" data-order="N/A">
                      N/A
                    </td>
                    <td className="">
                      <button
                        className="btn btn-primary btn-xs btn--icon-text certificate_edit"
                        id="PopoverCustomT-1"
                        title="Sửa"
                        data-toggle="modal"
                        data-target="#modelId"
                        type="button"
                      >
                        <i className="fa fa-pencil"></i>
                      </button>
                      <button
                        className="btn btn-danger btn-xs btn--icon-text certificate_delete"
                        id="PopoverCustomT-1"
                        title="Xóa"
                        data-target="#modal-delete"
                        // onClick="openDeleteConfirmationModal('b4728fdf-f2e3-40dd-95ae-ad58e7deacc5')"
                        data-toggle="modal"
                        type="button"
                      >
                        <i className="fa fa-trash-o"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className=" text-muted">2</td>
                    <td className="" data-order="NV0001">
                      NV0001
                    </td>
                    <td className="" data-order="2020-02-22T08:00:00">
                      2020-02-22T08:00:00
                    </td>
                    <td className="" data-order="2020-02-22T09:00:00">
                      2020-02-22T09:00:00
                    </td>
                    <td className="" data-order="N/A">
                      N/A
                    </td>
                    <td className="">
                      <button
                        className="btn btn-primary btn-xs btn--icon-text certificate_edit"
                        id="PopoverCustomT-1"
                        title="Sửa"
                        data-toggle="modal"
                        data-target="#modelId"
                        type="button"
                      >
                        <i className="fa fa-pencil"></i>
                      </button>
                      <button
                        className="btn btn-danger btn-xs btn--icon-text certificate_delete"
                        id="PopoverCustomT-1"
                        title="Xóa"
                        data-target="#modal-delete"
                        // onClick="openDeleteConfirmationModal('5f224cf4-4547-4fd1-a73e-21ae5cae49a6')"
                        data-toggle="modal"
                        type="button"
                      >
                        <i className="fa fa-trash-o"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* <ModalSchedule /> */}
    </div>
  );
}
