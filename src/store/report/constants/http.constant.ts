export const ReportApiRoutes = {
  TEKMEDI_CARD: {
    GET_LIST_HISTORY: 'api/TekmediCardHistory/admin-statistical',
    PRINT_DEAL: 'api/TekmediCardHistory/find',
    CANCEL_DEAL: 'api/TekmediCard/cancel-payment',
    EXPORT_FILE: 'api/TekmediCardHistory/admin-export',
  },
};

export const defaultGetListHistoryTekmediCard = [
  {
    data: 'id',
    name: '',
    searchable: false,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'id',
    name: '',
    searchable: false,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'tekmedi_card_number',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'code',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'name',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'gender',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'birthday',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'identity_card_number',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'time',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'employee_name',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'manipulation',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'price',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'before_value',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'after_value',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
];
export enum ReportHistoryStatus {
  PRINTER = 'In Giao Dịch',
  CANCEL = 'Hủy Giao Dịch',
}

export enum DialogKeyHistory {
  CANCEL = 'CANCEL',
}
export enum DialogTitleHistory {
  CANCEL_TITLE = 'Bạn có chắc chắn muốn hủy giao dịch này?',
}
