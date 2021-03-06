/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { FunctionComponent } from 'react';
import { PatientPage, BalancePage } from '../containers/PatientPage/Loadable';
import { HRMPage } from '../containers/PersonnelPage/Loadable';
import {
  TNB,
  Room,
  PriorityPatient,
  ManagementSTT,
} from '../containers/STTPage/Loadable';
import { UserPage } from 'app/containers/UserPage/Loadable';
import {
  TekmediCard,
  Transaction,
  Survey,
  AuditLog,
  TransactionDetail,
} from '../containers/ReportPage/Loadable';
import {
  SystemAccess,
  TitleManagement,
  Position,
  GroupService,
  Service,
  DepartmentType,
  Department,
  Medicine,
  Pharmacy,
  Device,
  TablePatientReceition,
  DepartmentService,
  DefaultSetting,
  Faculty,
} from 'app/containers/SettingPage/Loadable';
import {
  Statistical,
  RegisterPage,
  HistoryPage,
  RechargePage,
  LostPage,
  WithDrawPage,
  ReturnPage,
} from 'app/containers/CardPage/Loadable';
import { Reception } from 'app/containers/ReportPage/pages/Reception';

export interface AppRoute {
  path: string;
  name: string;
  Component: FunctionComponent;
  category: string;
  title: string;
  icon: string;
  type?: string;
  permission?: RoutePermissions;
  role?: RouteRoles;
  categoryOrder?: number;
}

export enum RouteRoles {
  TEKMEDI = 'TEKMEDI',
  TNB = 'TNB',
  IT = 'IT',
  SURVEY = 'SURVEY',
  ADMIN = 'ADMIN',
  ROOM = 'ROOM',
  RO = 'RO',
}

export enum RoutePermissions {
  ADMIN_TEKMEDI_CARD = 'ADMIN_TEKMEDI_CARD.INDEX',
  AUDIT_LOG = 'AUDIT_LOG.INDEX',
  SURVEY = 'SURVEY.INDEX',
  TRANSACTION = 'TRANSACTION.INDEX',
  DETAIL = 'DETAIL.INDEX',
  TABLE = 'TABLE.INDEX',
  DEPARTMENTS = 'DEPARTMENTS.INDEX',
  DEVICE = 'DEVICE.INDEX',
  MEDICINE = 'MEDICINE.INDEX',
  DEPARTMENT_TYPE = 'DEPARTMENT_TYPE.INDEX',
  POSITION = 'POSITION.INDEX',
  HOME = 'HOME.INDEX',
  TITLE = 'TITLE.INDEX',
  PATIENT = 'PATIENT.INDEX',
  PHARMACY = 'PHARMACY.INDEX',
  USER_MANAGER = 'USER_MANAGER.INDEX',
  ROLE = 'ROLE.INDEX',
  SCHEDULE = 'SCHEDULE.INDEX',
  SERVICES = 'SERVICES.INDEX',
  GROUP_SERVICE = 'GROUP_SERVICE.INDEX',
  SYSUSER = 'SYSUSER.INDEX',
  TEKMEDI_CARD = 'TEKMEDI_CARD.INDEX',
  PATIENT_RECEPTION = 'PATIENT_RECEPTION.INDEX',
  BANK = 'BANK.INDEX',
  ROOM = 'ROOM.INDEX',
  RECEPTION = 'RECEPTION.INDEX',
  QUEUENUMBER = 'QUEUENUMBER.INDEX',
}

export enum RouteCategory {
  CARD = 'Th???',
  ORDER = 'S??? th??? t???',
  HUMAN_RESOURCE = 'Nh??n s???',
  SETTING = 'C??i ?????t',
  PATIENT = 'B???nh nh??n',
  REPORT = 'B??o c??o',
}

export const AppRouting: AppRoute[] = [
  {
    path: '/statistical-card',
    name: 'Statistical Page',
    Component: Statistical,
    category: RouteCategory.CARD,
    title: 'Th???ng k??',
    permission: RoutePermissions.TEKMEDI_CARD,
    role: RouteRoles.TEKMEDI,
    categoryOrder: 1,
    icon: 'donut_small',
  },
  {
    path: '/register-card',
    name: 'Register Page',
    Component: RegisterPage,
    category: RouteCategory.CARD,
    title: 'Ghi th???',
    permission: RoutePermissions.TEKMEDI_CARD,
    role: RouteRoles.TEKMEDI,
    categoryOrder: 1,
    icon: 'add_circle_outline',
  },
  {
    path: '/recharge-card',
    name: 'Recharge Page',
    Component: RechargePage,
    category: RouteCategory.CARD,
    title: 'N???p ti???n',
    permission: RoutePermissions.TEKMEDI_CARD,
    role: RouteRoles.TEKMEDI,
    categoryOrder: 1,
    icon: 'attach_money',
  },
  {
    path: '/return-card',
    name: 'Return Page',
    Component: ReturnPage,
    category: RouteCategory.CARD,
    title: 'Tr??? th???',
    permission: RoutePermissions.TEKMEDI_CARD,
    role: RouteRoles.TEKMEDI,
    categoryOrder: 1,
    icon: 'indeterminate_check_box',
  },

  {
    path: '/lost-card',
    name: 'Lost Page',
    Component: LostPage,
    category: RouteCategory.CARD,
    title: 'M???t th???',
    permission: RoutePermissions.TEKMEDI_CARD,
    role: RouteRoles.TEKMEDI,
    categoryOrder: 1,
    icon: 'cancel_presentation',
  },
  // {
  //   path: '/withdraw-card',
  //   name: 'WithDraw Page',
  //   Component: WithDrawPage,
  //   category: RouteCategory.CARD,
  //   title: 'R??t ti???n',
  //   permission: RoutePermissions.TEKMEDI_CARD,
  //   role: RouteRoles.TEKMEDI,
  //   categoryOrder: 1,
  //   icon: 'money_off',
  // },
  {
    path: '/history-card',
    name: 'History Page',
    Component: HistoryPage,
    category: RouteCategory.CARD,
    title: 'L???ch s??? th???',
    permission: RoutePermissions.TEKMEDI_CARD,
    role: RouteRoles.TEKMEDI,
    categoryOrder: 1,
    icon: 'grid_on',
  },
  {
    path: '/tnb',
    name: 'TNB Page',
    Component: TNB,
    category: RouteCategory.ORDER,
    title: 'Ti???p nh???n b???nh',
    icon: 'mic',
    permission: RoutePermissions.PATIENT_RECEPTION,
    role: RouteRoles.TNB,
    categoryOrder: 2,
  },
  {
    path: '/priority-patient',
    name: 'PriorityPatient Page',
    Component: PriorityPatient,
    category: RouteCategory.ORDER,
    title: 'S??? th??? t??? ??u ti??n',
    permission: RoutePermissions.PATIENT_RECEPTION,
    role: RouteRoles.TNB,
    categoryOrder: 2,
    icon: 'priority_high',
  },
  {
    path: '/room',
    name: 'Room Page',
    Component: Room,
    category: RouteCategory.ORDER,
    title: 'Ph??ng kh??m',
    permission: RoutePermissions.PATIENT_RECEPTION,
    role: RouteRoles.ROOM,
    categoryOrder: 2,
    icon: 'room',
  },
  {
    path: '/management-stt',
    name: 'Management ORDER',
    Component: ManagementSTT,
    category: RouteCategory.ORDER,
    title: 'Qu???n l?? s??? th??? t??? ti???p nh???n',
    permission: RoutePermissions.PATIENT_RECEPTION,
    role: RouteRoles.ROOM,
    categoryOrder: 2,
    icon: 'dashboard',
  },
  {
    path: '/hrm',
    name: 'HRM Page',
    Component: HRMPage,
    category: RouteCategory.HUMAN_RESOURCE,
    title: 'Qu???n l?? nh??n s???',
    permission: RoutePermissions.USER_MANAGER,
    role: RouteRoles.ADMIN,
    categoryOrder: 4,
    icon: 'account_box',
  },
  {
    path: '/patient',
    name: 'Patient Page',
    Component: PatientPage,
    category: RouteCategory.PATIENT,
    title: 'Qu???n l?? b???nh nh??n',
    permission: RoutePermissions.PATIENT,
    role: RouteRoles.ADMIN,
    categoryOrder: 5,
    icon: 'accessibility',
  },
  {
    path: '/balance',
    name: 'Balance Page',
    Component: BalancePage,
    category: RouteCategory.PATIENT,
    title: 'Th???ng k?? s??? d??',
    permission: RoutePermissions.BANK,
    role: RouteRoles.ADMIN,
    categoryOrder: 5,
    icon: 'account_balance_wallet',
  },
  {
    path: '/default-setting',
    name: 'Default Setting',
    Component: DefaultSetting,
    category: RouteCategory.SETTING,
    title: 'Qu???n l?? c??i ?????t chung',
    permission: RoutePermissions.ROLE,
    role: RouteRoles.ADMIN,
    categoryOrder: 6,
    icon: 'settings_applications',
  },
  {
    path: '/system-access',
    name: 'System Access Page',
    Component: SystemAccess,
    category: RouteCategory.SETTING,
    title: 'Qu???n l?? quy???n truy c???p',
    permission: RoutePermissions.ROLE,
    role: RouteRoles.ADMIN,
    categoryOrder: 6,
    icon: 'lock',
  },
  {
    path: '/title',
    name: 'Title Page',
    Component: TitleManagement,
    category: RouteCategory.SETTING,
    title: 'Qu???n l?? ch???c danh',
    permission: RoutePermissions.TITLE,
    role: RouteRoles.ADMIN,
    categoryOrder: 6,
    icon: 'face',
  },
  {
    path: '/faculty',
    name: 'Faculty Page',
    Component: Faculty,
    category: RouteCategory.SETTING,
    title: 'Qu???n l?? khoa',
    permission: RoutePermissions.TITLE,
    role: RouteRoles.ADMIN,
    categoryOrder: 6,
    icon: 'class',
  },
  {
    path: '/position',
    name: 'Position Page',
    Component: Position,
    category: RouteCategory.SETTING,
    title: 'Qu???n l?? ch???c v???',
    permission: RoutePermissions.POSITION,
    role: RouteRoles.ADMIN,
    categoryOrder: 6,
    icon: 'supervisor_account',
  },
  {
    path: '/group-service',
    name: 'Group Serviec Page',
    Component: GroupService,
    category: RouteCategory.SETTING,
    title: 'Qu???n l?? nh??m d???ch v???',
    permission: RoutePermissions.GROUP_SERVICE,
    role: RouteRoles.ADMIN,
    categoryOrder: 6,
    icon: 'swap_horizontal_circle',
  },
  {
    path: '/service',
    name: 'Serviec Page',
    Component: Service,
    category: RouteCategory.SETTING,
    title: 'Qu???n l?? d???ch v???',
    permission: RoutePermissions.SERVICES,
    role: RouteRoles.ADMIN,
    categoryOrder: 6,
    icon: 'save',
  },
  {
    path: '/department-type',
    name: 'Department Type Page',
    Component: DepartmentType,
    category: RouteCategory.SETTING,
    title: 'Qu???n l?? lo???i ph??ng ban',
    permission: RoutePermissions.DEPARTMENT_TYPE,
    role: RouteRoles.ADMIN,
    categoryOrder: 6,
    icon: 'event_available',
  },
  {
    path: '/department',
    name: 'Department Page',
    Component: Department,
    category: RouteCategory.SETTING,
    title: 'Qu???n l?? ph??ng ban',
    permission: RoutePermissions.DEPARTMENTS,
    role: RouteRoles.ADMIN,
    categoryOrder: 6,
    icon: 'room',
  },
  {
    path: '/department-service',
    name: 'DepartmentService Page',
    Component: DepartmentService,
    category: RouteCategory.SETTING,
    title: 'Qu???n l?? Ph??ng ban - D???ch v???',
    permission: RoutePermissions.GROUP_SERVICE,
    role: RouteRoles.ADMIN,
    categoryOrder: 6,
    icon: 'edit_attributes',
  },
  {
    path: '/medicine',
    name: 'Medicine Page',
    Component: Medicine,
    category: RouteCategory.SETTING,
    title: 'Qu???n l?? thu???c-v???t t??',
    permission: RoutePermissions.MEDICINE,
    role: RouteRoles.ADMIN,
    categoryOrder: 6,
    icon: 'layers',
  },
  {
    path: '/pharmacy',
    name: 'Pharmacy Page',
    Component: Pharmacy,
    category: RouteCategory.SETTING,
    title: 'Qu???n l?? nh?? thu???c',
    permission: RoutePermissions.PHARMACY,
    role: RouteRoles.ADMIN,
    categoryOrder: 6,
    icon: 'local_pharmacy',
  },
  {
    path: '/device',
    name: 'Device Page',
    Component: Device,
    category: RouteCategory.SETTING,
    title: 'Qu???n l?? thi???t b???',
    permission: RoutePermissions.DEVICE,
    role: RouteRoles.ADMIN,
    categoryOrder: 6,
    icon: 'important_devices',
  },
  {
    path: '/table',
    name: 'Table Page',
    Component: TablePatientReceition,
    category: RouteCategory.SETTING,
    title: 'Qu???n l?? b??n ti???p nh???n',
    permission: RoutePermissions.TABLE,
    role: RouteRoles.ADMIN,
    categoryOrder: 6,
    icon: 'table_view',
  },

  {
    path: '/tekmedi-card',
    name: 'Tekmedi Card Page',
    Component: TekmediCard,
    category: RouteCategory.REPORT,
    title: 'Qu???n l?? n???p tr??? m???t th???',
    permission: RoutePermissions.ADMIN_TEKMEDI_CARD,
    role: RouteRoles.ADMIN,
    categoryOrder: 7,
    icon: 'pie_charts',
  },
  {
    path: '/transaction',
    name: 'Transaction Page',
    Component: Transaction,
    category: RouteCategory.REPORT,
    title: 'Giao d???ch',
    permission: RoutePermissions.TRANSACTION,
    role: RouteRoles.ADMIN,
    categoryOrder: 7,
    icon: 'filter_list',
  },
  {
    path: '/reception',
    name: 'Reception Page',
    Component: Reception,
    category: RouteCategory.REPORT,
    title: 'Qu???n l?? ti???p nh???n',
    permission: RoutePermissions.RECEPTION,
    role: RouteRoles.ADMIN,
    categoryOrder: 7,
    icon: 'aspect_ratio',
  },
  {
    path: '/survey',
    name: 'Survey Page',
    Component: Survey,
    category: RouteCategory.REPORT,
    title: 'Kh???o s??t',
    permission: RoutePermissions.SURVEY,
    role: RouteRoles.ADMIN,
    categoryOrder: 7,
    icon: 'question_answer',
  },
  {
    path: '/audit-log',
    name: 'Audit Log Page',
    Component: AuditLog,
    category: RouteCategory.REPORT,
    title: 'Audit Log',
    permission: RoutePermissions.AUDIT_LOG,
    role: RouteRoles.ADMIN,
    categoryOrder: 7,
    icon: 'https',
  },
  {
    path: '/system-user',
    name: 'User Profile Page',
    Component: UserPage,
    category: 'User',
    title: 'User Profile',
    icon: 'settings_system_daydream',
  },
  {
    path: '/transaction/detail',
    name: 'Transaction Detail Page',
    Component: TransactionDetail,
    category: RouteCategory.REPORT,
    title: 'Chi ti???t giao d???ch',
    permission: RoutePermissions.AUDIT_LOG,
    role: RouteRoles.ADMIN,
    categoryOrder: 7,
    icon: '',
  },
];
