export class CardModel {
  after_value?: number;
  before_value?: number;
  birthday?: string;
  code?: string;
  district?: string;
  employee_id?: string;
  employee_name?: string;
  gender?: string;
  id?: string;
  identity_card_number?: any;
  is_actived_card?: true;
  manipulation?: string;
  name?: string;
  new_tekmedi_card_number?: any;
  phone?: any;
  price?: number;
  province?: string;
  tekmedi_card_number?: string;
  tekmedi_id?: any;
  time?: string;
  type?: number;
  ward?: string;
  format?: any;

  constructor(card) {
    this.after_value = card.after_value;
    this.before_value = card.before_value;
    this.birthday = card.birthday;
    this.code = card.code;
    this.district = card.district;
    this.employee_id = card.employee_id;
    this.employee_name = card.employee_name;
    this.gender = card.gender;
    this.id = card.id;
    this.identity_card_number = card.identity_card_number;
    this.is_actived_card = card.is_actived_card;
    this.manipulation = card.manipulation;
    this.name = card.name;
    this.new_tekmedi_card_number = card.new_tekmedi_card_number;
    this.phone = card.phone;
    this.price = card.price;
    this.province = card.province;
    this.tekmedi_card_number = card.tekmedi_card_number;
    this.tekmedi_id = card.tekmedi_id;
    this.time = card.time;
    this.type = card.type;
    this.ward = card.ward;
    this.format = card.format;
  }
}

export const columns = [
  { id: 'no', label: 'No', minWidth: 50 },
  { id: 'tekmedi_card_number', label: 'Mã thẻ', minWidth: 100 },
  {
    id: 'gender',
    label: 'Giới tính',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'birthday',
    label: 'Ngày sinh',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'time',
    label: 'Ngày giờ',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'price',
    label: 'Số tiền giao dịch',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'before_value',
    label: 'Số tiền trước khi giao dịch',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'after_value',
    label: 'Số tiền sau khi giao dịch',
    minWidth: 170,
    align: 'right',
  },
];
