/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/heading-has-content */
import React from 'react';
import * as _ from 'lodash';
import DateFnsUtils from '@date-io/date-fns';
import * as fromCommon from 'store/common/shared/selectors';
import { DEFAULT_FORMAT_DATE } from 'store/common/constants/common.constant';
import { AppHelper } from 'utils/app.helper';
import { SettingModel } from 'store/common/shared/slice';
import { useSelector } from 'react-redux';
const Barcode = require('react-barcode');
type Props = {
  card: any;
};

const PrintLostCard = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const dateUtil = new DateFnsUtils();
  const setting: SettingModel = useSelector(fromCommon.selectDefaultSetting);
  if (_.isEmpty(_.get(props, 'card'))) {
    return <p>Empty Data</p>;
  }
  const { card } = props;
  let label: string = '';
  if (card.type === 2) {
    label = 'NẠP TIỀN';
  } else if (card.type === 4) {
    label = 'MẤT THẺ';
  } else if (card.type === 3) {
    label = 'TRẢ THẺ';
  } else if (card.type === 11) {
    label = 'PHÁT THẺ MỚI';
  }
  const lastName = card.patient.last_name ? card.patient.last_name : '';
  const firstName = card.patient.first_name ? card.patient.first_name : '';
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
      <style type="text/css" />
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
                  {_.get(card, 'time')
                    ? AppHelper.getCurrentTimeAndDate(_.get(card, 'time'))
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
                  {!_.isEmpty(card) && (
                    <Barcode
                      value={_.get(card.patient, 'code')}
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
                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                    fontSize: '22px',
                  }}
                >
                  Số phiếu: {_.get(card, 'bill_number')}
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
                    {!_.isEmpty(card) ? fullName.toUpperCase() :  ''}
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
                      {_.get(card.patient, 'gender')}
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
                        _.get(card.patient, 'birthday'),
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
                    {_.get(card.patient, 'code')}
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
                    {_.get(card, 'employee_name')}
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
                      {label === 'MẤT THẺ' ? 'hoàn trả' : 'phát thẻ mới'}
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
                    {AppHelper.formatCurrency(_.get(card, 'price'))}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {_.get(card, 'type') === 3 || _.get(card, 'type') === 4 ? (
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
                      fontSize: '22px'
                    }}
                  >
                    Chữ ký nhân viên
                    </p>
                  <p style={{
                    marginTop: '40px',
                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                    fontSize: '20px'
                  }}>{_.get(card, 'employee_name')}</p>
                </div>
                <div className="registered-right">
                  <p
                    style={{
                      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                      fontSize: '22px'
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
            style={{ display: 'block', width: '410px', marginTop: '-25px' }}
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
export default PrintLostCard;
