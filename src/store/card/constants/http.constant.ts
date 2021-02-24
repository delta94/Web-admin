export const CardApiRoutes = {
  CARD: {
    REGISTER_CARD_PAYMENT: '/api/TekmediCard/register-card-payment',
    ADD_PAYMENT: '/api/TekmediCard/add-payment',
    VALIDATE: '/api/TekmediCard/validate-card-number/',
    GET_BY_CARD_NUMBER: '/api/TekmediCard/get-by-card-number/',
    RETURN_CARD: '/api/TekmediCard/return-card',
    LOST_CARD: '/api/TekmediCard/lost-card-payment',
    GET_WITH_DRAW: '/api/TekmediCard/withdraw',
  },
  CARD_HISTORY: {
    GET_BY_CARD_ID: '/api/TekmediCardHistory/find',
    GET_LIST_CARD: '/api/TekmediCardHistory/statistical',
    EXPORT_CARD: '/api/TekmediCardHistory/export',
    GET_CARD_HISTORY: '/api/TekmediCardHistory/history',
    GET_CARD_HISTORY_WITH_TYPE: '/api/TekmediCardHistory/history-with-type',
    PRINTER_HISTORY: 'api/TekmediCardHistory/find',
    CANCEL_DEAL: 'api/TekmediCard/cancel-payment',
  },
  PAYMENT: {
    CHECK_STATUS_FINNALY: '/api/Payment/check/finally',
    CANCEL_PAYMENT: '/api/TekmediCard/cancel-payment/',
  },
  LIST_VALUE_EXTEND: '/api/ListValueExtend/get-all-list-values/PTNT'
};

export const defaultColumnsFilterCard = [
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
