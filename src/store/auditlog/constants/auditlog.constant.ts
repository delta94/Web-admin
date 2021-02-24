export const AuditlogApiRoutes = {
  GET_ALL: '/api/AuditLog/all',
  FILTER_ALL: '/api/AuditLog/get-range',
};

export const RESPONSE_CONSTANT = {
  GET_AUDITLOG_SUCESS: 'GET_AUDITLOG_SUCESS',
  GET_AUDITLOG_FAIL: 'GET_AUDITLOG_FAIL',
  FILTER_AUDITLOG_SUCESS: 'FILTER_AUDITLOG_SUCESS',
  FILTER_AUDITLOG_FAIL: 'FILTER_AUDITLOG_FAIL',
};

export const RESPONSE_MESSAGE = {
  GET_AUDITLOG_SUCESS: 'Lấy danh sách auditlog thành công',
  GET_AUDITLOG_FAIL: 'Lấy danh sách auditlog thất bại',
  FILTER_AUDITLOG_SUCESS: 'Lấy danh sách auditlog thành công',
  FILTER_AUDITLOG_FAIL: 'Lấy danh sách auditlog  thất bại',
};

export const auditlogTable = [
  { id: 'no', label: '#', minWidth: 50 },
  { id: 'inserted_date', label: 'Inserted Date', minWidth: 150 },
  { id: 'updated_date', label: 'Updated Date', minWidth: 150 },
  { id: 'trace_id', label: 'Trace Id', minWidth: 300 },
  { id: 'ip_address', label: 'Ip Address', minWidth: 200 },
  {
    id: 'request_url',
    label: 'Request Url',
    minWidth: 600,
  },
  {
    id: 'http_method',
    label: 'Http Method',
    minWidth: 150,
  },
  {
    id: 'action_name',
    label: 'Action Name',
    minWidth: 300,
  },
  {
    id: 'controller_name',
    label: 'Controller Name',
    minWidth: 200,
  },
  {
    id: 'response_status',
    label: 'Response Status',
    minWidth: 200,
  },
  {
    id: 'response_status_code',
    label: 'Response Status Code',
    minWidth: 200,
  },
  {
    id: 'action_parameters',
    label: 'Action Parameters',
    minWidth: 600,
  },
  {
    id: 'request_body',
    label: 'Request Body',
    minWidth: 600,
  },
  {
    id: 'response_body',
    label: 'Response Body',
    minWidth: 600,
  },
  {
    id: 'exception',
    label: 'Exception',
    minWidth: 600,
  },
];

export const defaultFilter = [
  {
    data: 'id',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'inserted_date',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'updated_date',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'trace_id',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'ip_address',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'request_url',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'http_method',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'action_name',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'controller_name',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'response_status',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'response_status_code',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'action_parameters',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'request_body',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'response_body',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'exception',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
];
