/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/heading-has-content */
import React from 'react';
import * as _ from 'lodash';
import * as fromCommon from 'store/common/shared/selectors';
import DateFnsUtils from '@date-io/date-fns';
import { DEFAULT_FORMAT_DATE } from 'store/common/constants/common.constant';
import { AppHelper } from 'utils/app.helper';
import { SettingModel } from 'store/common/shared/slice';
import { useSelector } from 'react-redux';
const Barcode = require('react-barcode');
type Props = {
  payment: any;
};

const PrintCharge = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const setting: SettingModel = useSelector(fromCommon.selectDefaultSetting);
  const dateUtil = new DateFnsUtils();
  if (_.isEmpty(_.get(props, 'payment'))) {
    return <p>Empty Data</p>;
  }
  const { payment } = props;
  let label: string = '';
  if (payment.type === 2) {
    label = 'NẠP TIỀN';
  } else if (payment.type === 4) {
    label = 'MẤT THẺ';
  } else if (payment.type === 3) {
    label = 'TRẢ THẺ';
  } else if (payment.type === 11) {
    label = 'PHÍ PHÁT THẺ MỚI';
  }
  const lastName = payment.patient.last_name ? payment.patient.last_name : '';
  const firstName = payment.patient.first_name
    ? payment.patient.first_name
    : '';
  let fullName = '';
  if (lastName === undefined) {
    fullName = firstName;
  } else if (firstName === undefined) {
    fullName = lastName;
  } else {
    fullName = lastName + ' ' + firstName;
  }
  return (
    <div ref={ref} {...props}>
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html:
            '\n<!--\nspan.cls_002{font-family:Roboto, sans-serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_002{font-family:Roboto, sans-serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_003{font-family:Roboto, sans-serif;font-size:8.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_003{font-family:Roboto, sans-serif;font-size:8.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_004{font-family:Roboto, sans-serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_004{font-family:Roboto, sans-serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_005{font-family:Roboto, sans-serif;font-size:14.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_005{font-family:Roboto, sans-serif;font-size:14.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_006{font-family:Roboto, sans-serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_006{font-family:Roboto, sans-serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_007{font-family:Roboto, sans-serif;font-size:6.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_007{font-family:Roboto, sans-serif;font-size:6.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_008{font-family:Roboto, sans-serif;font-size:12.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_008{font-family:Roboto, sans-serif;font-size:12.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_009{font-family:Roboto, sans-serif;font-size:12.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_009{font-family:Roboto, sans-serif;font-size:12.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_010{font-family:Roboto, sans-serif;font-size:26.3px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_010{font-family:Roboto, sans-serif;font-size:26.3px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_011{font-family:Roboto, sans-serif;font-size:9.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_011{font-family:Roboto, sans-serif;font-size:9.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_012{font-family:Roboto, sans-serif;font-size:7.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_012{font-family:Roboto, sans-serif;font-size:7.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n-->\n',
        }}
      />
      <div
        className="printer__bill"
        style={{ margin: '0 auto', padding: '0 10px' }}
      >
        <div className="container printer__container">
          <div className="printer__top">
            <div className="printer__top__header" style={{ display: 'flex' }}>
              <div className="printer__header-left">
                <img
                  src={setting.logoUrl}
                  alt="Logo-K"
                  width={90}
                  height={60}
                />
              </div>
              <div className="printer__header-right">
                <div
                  className="printer__header-right-title"
                  style={{ marginLeft: '2px' }}
                >
                  <p
                    style={{
                      marginTop: '10px',
                      padding: '0px',
                      letterSpacing: '1px',
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                    }}
                  >
                    {setting.enName}
                  </p>
                  <p
                    style={{
                      margin: '0px',
                      padding: '0px',
                      textTransform: 'uppercase',
                      marginTop: '-10px',
                      fontSize: '24px',
                      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                    }}
                  >
                    {setting.viName}
                  </p>
                </div>
              </div>
            </div>
            <div
              className="printer__header-body"
              style={{ width: '380px', height: 'auto', display: 'block' }}
            >
              <div
                className="printer__header__body-title"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  marginTop: '8px',
                  marginLeft: '20px',
                }}
              >
                <p
                  className="printer__header__body-title-Size"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    fontSize: '22px',
                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                  }}
                >
                  Biên nhận {label}
                </p>
              </div>
              <div
                className="printer__header__body-time"
                style={{ display: 'block' }}
              >
                <p
                  style={{
                    textAlign: 'center',
                    marginTop: '-5px',
                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                    fontSize: '14px',
                  }}
                >
                  {_.get(payment, 'time')
                    ? AppHelper.getCurrentTimeAndDate(_.get(payment, 'time'))
                    : ''}
                </p>
              </div>
              <div
                className="printer__header__body-line"
                style={{ display: 'block' }}
              >
                <p
                  style={{
                    textAlign: 'center',
                    marginTop: '-14px',
                    fontSize: '15px',
                  }}
                >
                  --- --- --- --- --- --- --- --- --- --- ---
                </p>
              </div>
              <div
                className="printer__header__body-brcode"
                style={{ display: 'block', marginBottom: '10px' }}
              >
                <span style={{ textAlign: 'center', display: 'block' }}>
                  {!_.isEmpty(payment) && (
                    <Barcode
                      value={_.get(payment.patient, 'code')}
                      width={2}
                      displayValue={false}
                      height={50}
                      fontSize={16}
                      format={'CODE128'}
                      font={'Roboto'}
                      textAlign={'center'}
                      // textMargin={2}
                      textPosition={'bottom'}
                      background={'#ffffff'}
                      lineColor={'#000000'}
                      margin={2}
                    />
                  )}
                </span>
              </div>
              <div
                className="printer__header__body-number"
                style={{ display: 'block' }}
              >
                <p
                  style={{
                    textAlign: 'center',
                    marginTop: '-6px',
                    fontSize: '22px',
                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                  }}
                >
                  Số phiếu: {_.get(payment, 'bill_number')}
                </p>
              </div>
            </div>
          </div>
          <div className="printer__mid">
            <div className="printer__mid__content">
              <div
                className="printer__mid__content-patient"
                style={{
                  display: 'flex',
                  width: '410px',
                  height: 'auto',
                  justifyContent: 'flex-start',
                }}
              >
                <div className="patient-left">
                  <p
                    style={{
                      width: '100px',
                      height: 'auto',
                      fontSize: '24px',
                      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                    }}
                  >
                    Tên NB:
                  </p>
                </div>
                <div className="patient-right">
                  <p
                    style={{
                      padding: '0px',
                      margin: '0px',
                      fontSize: '26px',
                      textTransform: 'uppercase',
                      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                    }}
                  >
                    {!_.isEmpty(payment) ? fullName.toUpperCase() : ''}
                  </p>
                </div>
              </div>
              <div
                className="printer__mid__content-gender-birthday"
                style={{
                  display: 'flex',
                  width: '410px',
                  height: 'auto',
                  justifyContent: 'flex-start',
                  marginTop: '-6px',
                }}
              >
                <div
                  className="gender-birthday-left"
                  style={{
                    display: 'flex',
                    width: '180px',
                    height: 'auto',
                    justifyContent: 'flex-start',
                  }}
                >
                  <div className="gender-left">
                    <p
                      style={{
                        width: '100px',
                        height: 'auto',
                        fontSize: '24px',
                        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                      }}
                    >
                      Giới tính:
                    </p>
                  </div>
                  <div className="gender-right">
                    <p
                      style={{
                        fontSize: '26px',
                        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                      }}
                    >
                      {_.get(payment.patient, 'gender')}
                    </p>
                  </div>
                </div>
                <div
                  className="gender-birthday-right"
                  style={{
                    display: 'flex',
                    width: '220px',
                    height: 'auto',
                    justifyContent: 'flex-start',
                  }}
                >
                  <div className="birthday-left">
                    <p
                      style={{
                        width: '120px',
                        height: 'auto',
                        fontSize: '24px',
                        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                      }}
                    >
                      Năm sinh:
                    </p>
                  </div>
                  <div className="birthday-right">
                    <p
                      style={{
                        fontSize: '26px',
                        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                      }}
                    >
                      {AppHelper.getYearBirthDay(
                        _.get(payment.patient, 'birthday'),
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="printer__mid__content-patientcode"
                style={{
                  display: 'flex',
                  width: '410px',
                  height: 'auto',
                  justifyContent: 'flex-start',
                  marginTop: '-6px',
                }}
              >
                <div className="patientcode-left">
                  <p
                    style={{
                      width: '100px',
                      height: 'auto',
                      fontSize: '24px',
                      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                    }}
                  >
                    Mã NB:
                  </p>
                </div>
                <div className="patientcode-right">
                  <p
                    style={{
                      fontSize: '26px',
                      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                    }}
                  >
                    {_.get(payment.patient, 'code')}
                  </p>
                </div>
              </div>
              <div
                className="printer__mid__content-employee"
                style={{
                  display: 'flex',
                  width: '410px',
                  height: 'auto',
                  justifyContent: 'flex-start',
                  marginTop: '-6px',
                }}
              >
                <div className="employee-left">
                  <p
                    style={{
                      width: '100px',
                      height: 'auto',
                      fontSize: '24px',
                      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                    }}
                  >
                    Tên NV:
                  </p>
                </div>
                <div className="employee-right">
                  <p
                    style={{
                      fontSize: '26px',
                      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                    }}
                  >
                    {_.get(payment, 'employee_name')}
                  </p>
                </div>
              </div>
              <div
                className="printer__mid__content-price"
                style={{
                  width: '410px',
                  height: 'auto',
                  marginTop: '-6px',
                }}
              >
                <div className="price-top">
                  <p
                    style={{
                      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                      fontSize: '24px',
                    }}
                  >
                    Số tiền{' '}
                    <span
                      style={{
                        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                        fontSize: '24px',
                        textTransform: 'lowercase',
                      }}
                    >
                      {label === 'NẠP TIỀN' ? 'nạp' : label}
                    </span>
                    :
                  </p>
                </div>
                <div
                  className="price-bottom"
                  style={{ display: 'block', marginTop: '-20px' }}
                >
                  <p
                    style={{
                      fontSize: '50px',
                      textAlign: 'center',
                      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                    }}
                  >
                    {AppHelper.formatCurrency(_.get(payment, 'price'))}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {_.get(payment, 'type') === 3 || _.get(payment, 'type') === 4 ? (
            <div className="printer__bot" style={{ paddingLeft: '10px' }}>
              <div
                className="printer__bot-registered"
                style={{
                  display: 'flex',
                  width: '400px',
                  height: '150px',
                  justifyContent: 'space-between',
                  marginTop: '-10px',
                }}
              >
                <div className="registered-left">
                  <p
                    style={{
                      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                      fontSize: '22px',
                    }}
                  >
                    Chữ ký nhân viên
                  </p>
                  <p
                    style={{
                      marginTop: '40px',
                      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                      fontSize: '20px',
                    }}
                  >
                    {_.get(payment, 'employee_name')}
                  </p>
                </div>
                <div className="registered-right">
                  <p
                    style={{
                      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                      fontSize: '22px',
                    }}
                  >
                    Chữ ký người nhận
                  </p>
                </div>
              </div>
            </div>
          ) : null}
          <div
            className="printer__bot-title"
            style={{ display: 'block', width: '410px', marginTop: '-20px' }}
          >
            <p
              style={{
                fontSize: '13px',
                textAlign: 'center',
                fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
              }}
            >
              Bệnh nhân vui lòng giữ phiếu cho đến khi kết thúc khám bệnh
            </p>
            <p style={{ marginTop: '-12px', padding: '0px' }}>
              ---------------------------------------------------------------------------------------
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});
export default PrintCharge;
