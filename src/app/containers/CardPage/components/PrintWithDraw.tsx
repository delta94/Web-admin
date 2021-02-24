/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/heading-has-content */
import React from 'react';
import * as fromCommon from 'store/common/shared/selectors';
import * as _ from 'lodash';
import DateFnsUtils from '@date-io/date-fns';
import { DEFAULT_FORMAT_DATE } from 'store/common/constants/common.constant';
import { AppHelper } from 'utils/app.helper';
import { useSelector } from 'react-redux';
import { SettingModel } from 'store/common/shared/slice';

type Props = {
  payment: any;
};

const PrintWithDraw = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const setting: SettingModel = useSelector(fromCommon.selectDefaultSetting);
  const dateUtil = new DateFnsUtils();
  if (_.isEmpty(_.get(props, 'payment'))) {
    return <p>Empty Data</p>;
  }
  const { payment } = props;
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
    <div
      ref={ref}
      {...props}
      style={{
        color: 'black',
        width: '80mm',
        padding: '0px',
        margin: 'auto',
      }}
    >
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html:
            '\n<!--\nspan.cls_002{font-family:"Roboto",serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_002{font-family:"Roboto",serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_003{font-family:"Roboto",serif;font-size:8.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_003{font-family:"Roboto",serif;font-size:8.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_004{font-family:"Roboto",serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_004{font-family:"Roboto",serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_005{font-family:"Roboto",serif;font-size:14.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_005{font-family:"Roboto",serif;font-size:14.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_006{font-family:"Liberation Sans Narrow",serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_006{font-family:"Liberation Sans Narrow",serif;font-size:9.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_007{font-family:"Liberation Sans Narrow",serif;font-size:6.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_007{font-family:"Liberation Sans Narrow",serif;font-size:6.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_008{font-family:"Liberation Sans Narrow",serif;font-size:12.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_008{font-family:"Liberation Sans Narrow",serif;font-size:12.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_009{font-family:"Roboto",serif;font-size:12.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_009{font-family:"Roboto",serif;font-size:12.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_010{font-family:"Roboto",serif;font-size:26.3px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_010{font-family:"Roboto",serif;font-size:26.3px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_011{font-family:"Roboto",serif;font-size:9.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_011{font-family:"Roboto",serif;font-size:9.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_012{font-family:"Liberation Sans Narrow",serif;font-size:7.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_012{font-family:"Liberation Sans Narrow",serif;font-size:7.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n-->\n',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '48.5%',
          marginLeft: '-440px',
          top: '0px',
          width: '800px',
          height: '600px',
          borderStyle: 'none',
          overflow: 'hidden',
          fontFamily: 'Roboto',
        }}
      >
        <div style={{ position: 'absolute', left: '38.5%', top: '5px' }}>
          <img src={setting.logoUrl} width={78} height="auto" />
        </div>
        <div
          style={{ position: 'absolute', left: '26.47px', top: '13.05px' }}
          className="cls_002"
        >
          <span className="cls_002">
            {dateUtil.format(new Date(), DEFAULT_FORMAT_DATE)}
          </span>
        </div>
        <div
          style={{ position: 'absolute', left: '385px', top: '15px' }}
          className="cls_003"
        >
          <span
            className="cls_003"
            style={{ fontSize: '10px', fontFamily: 'Roboto' }}
          >
            {setting.enName}
          </span>
        </div>
        <div
          style={{ position: 'absolute', left: '385px', top: '30px' }}
          className="cls_004"
        >
          <span
            className="cls_004"
            style={{
              fontSize: '12px',
              textAlign: 'center',
              fontFamily: 'Roboto',
            }}
          >
            {setting.viName}
          </span>
        </div>
        <div
          style={{
            position: 'absolute',
            left: '330px',
            top: '60px',
            width: '30%',
            minHeight: '20px',
            textAlign: 'center',
            lineHeight: '1.2',
            fontFamily: 'Roboto',
          }}
        >
          <span style={{ fontSize: '15px', fontFamily: 'Roboto' }}>
            BIÊN NHẬN RÚT TIỀN
          </span>
        </div>
        <div
          style={{ position: 'absolute', left: '360px', top: '75px' }}
          className="cls_006"
        >
          <span
            className="cls_006"
            style={{ fontSize: '12px', fontFamily: 'Roboto' }}
          >
            {_.get(payment, 'time')
              ? AppHelper.getCurrentTimeAndDate(_.get(payment, 'time'))
              : ''}
          </span>
        </div>
        <div
          style={{ position: 'absolute', left: '375px', top: '85px' }}
          className="cls_007"
        >
          <span className="cls_007">
            -----------------------------------------------------------------
          </span>
        </div>
        <div
          className="wrapper"
          style={{
            position: 'absolute',
            left: '310px',
            right: '7px',
            top: '95px',
            display: 'grid',
            gridTemplateColumns: '30% 70%',
            gridColumnGap: '8px',
            textAlign: 'left',
            paddingRight: '230px',
            fontFamily: 'Roboto',
          }}
        >
          <div className="cls_008">
            <span
              className="cls_008"
              style={{ fontFamily: 'Roboto', fontSize: '14px' }}
            >
              Nhân viên:
            </span>
          </div>
          <div className="cls_009">
            <span
              className="cls_009"
              style={{ fontFamily: 'Roboto', fontSize: '15px' }}
            >
              {_.get(payment, 'employee_name')}
            </span>
          </div>
          <div className="cls_008">
            <span
              className="cls_008"
              style={{ fontFamily: 'Roboto', fontSize: '14px' }}
            >
              Mã số BN:
            </span>
          </div>
          <div className="cls_009">
            <span
              className="cls_009"
              style={{ fontFamily: 'Roboto', fontSize: '15px' }}
            >
              {_.get(payment.patient, 'code')}
            </span>
          </div>
          <div className="cls_008">
            <span
              className="cls_008"
              style={{ fontFamily: 'Roboto', fontSize: '14px' }}
            >
              Tên BN:
            </span>
          </div>
          <div className="cls_009">
            <span
              className="cls_009"
              style={{ fontFamily: 'Roboto', fontSize: '15px' }}
            >
              {!_.isEmpty(payment) ? fullName : ''}
            </span>
          </div>
          <div className="cls_008">
            <span
              className="cls_008"
              style={{ fontFamily: 'Roboto', fontSize: '14px' }}
            >
              Giới tính:
            </span>
          </div>
          <div className="cls_009">
            <span
              className="cls_009"
              style={{ fontFamily: 'Roboto', fontSize: '15px' }}
            >
              {_.get(payment.patient, 'gender')}
            </span>
          </div>
          <div className="cls_008">
            <span
              className="cls_008"
              style={{ fontFamily: 'Roboto', fontSize: '14px' }}
            >
              Năm sinh:
            </span>
          </div>
          <div className="cls_009">
            <span
              className="cls_009"
              style={{ fontFamily: 'Roboto', fontSize: '15px' }}
            >
              {AppHelper.getYearBirthDay(_.get(payment.patient, 'birthday'))}
            </span>
          </div>
          <div
            style={{ gridColumnStart: '1', gridColumnEnd: '3' }}
            className="cls_008"
          >
            <span style={{ fontFamily: 'Roboto', fontSize: '14px' }}>
              Số tiền rút:
            </span>
          </div>
          <div style={{ gridColumnStart: '1', gridColumnEnd: '3' }}>
            <span
              style={{
                fontFamily: 'Roboto',
                fontSize: '30px',
                fontWeight: 'bold',
                textAlign: 'center',
                display: 'block',
              }}
            >
              {AppHelper.formatCurrency(_.get(payment, 'price'))}
            </span>
          </div>
          <div
            style={{ gridColumnStart: '1', gridColumnEnd: '3' }}
            className="cls_012"
          >
            <span
              className="cls_012"
              style={{
                fontFamily: 'Roboto',
                fontSize: '10px',
                textAlign: 'center',
                display: 'block',
                marginTop: '-5px',
              }}
            >
              Bệnh nhân vui lòng giữ phiếu cho đến khi kết thúc khám bệnh
            </span>
          </div>
          <div
            style={{
              gridColumnStart: '1',
              gridColumnEnd: '3',
              marginTop: '-8px',
            }}
            className="cls_008"
          >
            <span className="cls_008">
              ----------------------------------------------------------------
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});
export default PrintWithDraw;
