import React from 'react';
import './Modal.css';
export function ModalSchedule() {
  return (
    <div
      className="modal fade"
      id="modelId"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-center">Sửa thông tin</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="cotainer">
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="bacsi">Bác sĩ</label>
                    <select id="bacsi" className="form-control">
                      <option selected>Chọn mã bác sĩ</option>
                      <option>NV0001</option>
                    </select>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group row">
                    <label
                      htmlFor="example-datetime-local-input"
                      style={{ marginLeft: '15px' }}
                    >
                      Từ ngày
                    </label>
                    <input
                      className="form-control"
                      type="datetime-local"
                      defaultValue="2011-08-19T13:45:00"
                      id="example-datetime-local-input"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group row">
                    <label
                      htmlFor="example-datetime-local-input"
                      style={{ marginLeft: '15px' }}
                    >
                      Đến ngày
                    </label>
                    <input
                      className="form-control"
                      type="datetime-local"
                      defaultValue="2011-08-19T13:45:00"
                      id="example-datetime-local-input"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="bacsi">Phòng khám</label>
                    <select id="bacsi" className="form-control">
                      <option selected>Chọn phòng khám</option>
                      <option>NV0001</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              ĐÓNG
            </button>
            <button type="button" className="btn btn-primary">
              LƯU
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
