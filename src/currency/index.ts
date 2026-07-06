import currency from 'currency.js';

const currencies: Record<string, { decimals: number; name: string }> = {
  AED: { decimals: 2, name: 'UAE dirham' },
  AFN: { decimals: 0, name: 'Afghan afghani' },
  ALL: { decimals: 0, name: 'Albanian lek' },
  AMD: { decimals: 0, name: 'Armenian dram' },
  ARS: { decimals: 2, name: 'Argentine peso' },
  AUD: { decimals: 2, name: 'Australian dollar' },
  AZN: { decimals: 2, name: 'Azerbaijani manat' },
  BAM: { decimals: 2, name: 'Bosnia and Herzegovina convertible mark' },
  BDT: { decimals: 2, name: 'Bangladeshi taka' },
  BGN: { decimals: 2, name: 'Bulgarian lev' },
  BHD: { decimals: 3, name: 'Bahraini dinar' },
  BIF: { decimals: 0, name: 'Burundian franc' },
  BND: { decimals: 2, name: 'Brunei dollar' },
  BOB: { decimals: 2, name: 'Boliviano' },
  BRL: { decimals: 2, name: 'Brazilian real' },
  BWP: { decimals: 2, name: 'Botswana pula' },
  BYN: { decimals: 2, name: 'Belarusian ruble' },
  BZD: { decimals: 2, name: 'Belize dollar' },
  CAD: { decimals: 2, name: 'Canadian dollar' },
  CDF: { decimals: 2, name: 'Congolese franc' },
  CHF: { decimals: 2, name: 'Swiss franc' },
  CLP: { decimals: 0, name: 'Chilean peso' },
  CNY: { decimals: 2, name: 'Chinese yuan' },
  COP: { decimals: 2, name: 'Colombian peso' },
  CRC: { decimals: 2, name: 'Costa Rican colon' },
  CVE: { decimals: 2, name: 'Cape Verdean escudo' },
  CZK: { decimals: 2, name: 'Czech koruna' },
  DJF: { decimals: 0, name: 'Djiboutian franc' },
  DKK: { decimals: 2, name: 'Danish krone' },
  DOP: { decimals: 2, name: 'Dominican peso' },
  DZD: { decimals: 2, name: 'Algerian dinar' },
  EEK: { decimals: 2, name: 'Estonian kroon' },
  EGP: { decimals: 2, name: 'Egyptian pound' },
  ERN: { decimals: 2, name: 'Eritrean nakfa' },
  ETB: { decimals: 2, name: 'Ethiopian birr' },
  EUR: { decimals: 2, name: 'Euro' },
  GBP: { decimals: 2, name: 'Pound sterling' },
  GEL: { decimals: 2, name: 'Georgian lari' },
  GHS: { decimals: 2, name: 'Ghanaian cedi' },
  GNF: { decimals: 0, name: 'Guinean franc' },
  GTQ: { decimals: 2, name: 'Guatemalan quetzal' },
  HKD: { decimals: 2, name: 'Hong Kong dollar' },
  HNL: { decimals: 2, name: 'Honduran lempira' },
  HRK: { decimals: 2, name: 'Croatian kuna' },
  HUF: { decimals: 0, name: 'Hungarian forint' },
  IDR: { decimals: 0, name: 'Indonesian rupiah' },
  ILS: { decimals: 2, name: 'Israeli new shekel' },
  INR: { decimals: 2, name: 'Indian rupee' },
  IQD: { decimals: 0, name: 'Iraqi dinar' },
  IRR: { decimals: 0, name: 'Iranian rial' },
  ISK: { decimals: 0, name: 'Icelandic krona' },
  JMD: { decimals: 2, name: 'Jamaican dollar' },
  JOD: { decimals: 3, name: 'Jordanian dinar' },
  JPY: { decimals: 0, name: 'Japanese yen' },
  KES: { decimals: 2, name: 'Kenyan shilling' },
  KHR: { decimals: 2, name: 'Cambodian riel' },
  KMF: { decimals: 0, name: 'Comorian franc' },
  KRW: { decimals: 0, name: 'South Korean won' },
  KWD: { decimals: 3, name: 'Kuwaiti dinar' },
  KZT: { decimals: 2, name: 'Kazakhstani tenge' },
  LBP: { decimals: 0, name: 'Lebanese pound' },
  LKR: { decimals: 2, name: 'Sri Lankan rupee' },
  LTL: { decimals: 2, name: 'Lithuanian litas' },
  LVL: { decimals: 2, name: 'Latvian lats' },
  LYD: { decimals: 3, name: 'Libyan dinar' },
  MAD: { decimals: 2, name: 'Moroccan dirham' },
  MDL: { decimals: 2, name: 'Moldovan leu' },
  MGA: { decimals: 0, name: 'Malagasy ariary' },
  MKD: { decimals: 2, name: 'Macedonian denar' },
  MMK: { decimals: 0, name: 'Burmese kyat' },
  MOP: { decimals: 2, name: 'Macanese pataca' },
  MUR: { decimals: 0, name: 'Mauritian rupee' },
  MXN: { decimals: 2, name: 'Mexican peso' },
  MYR: { decimals: 2, name: 'Malaysian ringgit' },
  MZN: { decimals: 2, name: 'Mozambican metical' },
  NAD: { decimals: 2, name: 'Namibian dollar' },
  NGN: { decimals: 2, name: 'Nigerian naira' },
  NIO: { decimals: 2, name: 'Nicaraguan cordoba' },
  NOK: { decimals: 2, name: 'Norwegian krone' },
  NPR: { decimals: 2, name: 'Nepalese rupee' },
  NZD: { decimals: 2, name: 'New Zealand dollar' },
  OMR: { decimals: 3, name: 'Omani rial' },
  PAB: { decimals: 2, name: 'Panamanian balboa' },
  PEN: { decimals: 2, name: 'Peruvian sol' },
  PHP: { decimals: 2, name: 'Philippine peso' },
  PKR: { decimals: 0, name: 'Pakistani rupee' },
  PLN: { decimals: 2, name: 'Polish zloty' },
  PYG: { decimals: 0, name: 'Paraguayan guarani' },
  QAR: { decimals: 2, name: 'Qatari riyal' },
  RON: { decimals: 2, name: 'Romanian leu' },
  RSD: { decimals: 0, name: 'Serbian dinar' },
  RUB: { decimals: 2, name: 'Russian ruble' },
  RWF: { decimals: 0, name: 'Rwandan franc' },
  SAR: { decimals: 2, name: 'Saudi riyal' },
  SDG: { decimals: 2, name: 'Sudanese pound' },
  SEK: { decimals: 2, name: 'Swedish krona' },
  SGD: { decimals: 2, name: 'Singapore dollar' },
  SOS: { decimals: 0, name: 'Somali shilling' },
  SYP: { decimals: 0, name: 'Syrian pound' },
  THB: { decimals: 2, name: 'Thai baht' },
  TND: { decimals: 3, name: 'Tunisian dinar' },
  TOP: { decimals: 2, name: "Tongan pa'anga" },
  TRY: { decimals: 2, name: 'Turkish lira' },
  TTD: { decimals: 2, name: 'Trinidad and Tobago dollar' },
  TWD: { decimals: 2, name: 'New Taiwan dollar' },
  TZS: { decimals: 0, name: 'Tanzanian shilling' },
  UAH: { decimals: 2, name: 'Ukrainian hryvnia' },
  UGX: { decimals: 0, name: 'Ugandan shilling' },
  USD: { decimals: 2, name: 'United States dollar' },
  UYU: { decimals: 2, name: 'Uruguayan peso' },
  UZS: { decimals: 0, name: 'Uzbekistani sum' },
  VEF: { decimals: 2, name: 'Venezuelan bolivar' },
  VND: { decimals: 0, name: 'Vietnamese dong' },
  XAF: { decimals: 0, name: 'Central African CFA franc' },
  XOF: { decimals: 0, name: 'West African CFA franc' },
  YER: { decimals: 0, name: 'Yemeni rial' },
  ZAR: { decimals: 2, name: 'South African rand' },
  ZMK: { decimals: 0, name: 'Zambian kwacha' },
  ZWL: { decimals: 0, name: 'Zimbabwean dollar' },
};

export type MoneyInput = number | Money;

export interface Currency {
  code: string;
  decimals: number;
}

export interface IMoneyOperations {
  add(value: MoneyInput): Money;
  subtract(value: MoneyInput): Money;
  multiply(value: MoneyInput): Money;
  divide(value: MoneyInput): Money;

  nonNegative(): Money;
  getValue(): number;
  getCurrency(): Currency;
}

export class Money implements IMoneyOperations {
  private readonly _value: number;
  private readonly _currencyCode: string;
  private readonly _decimals: number;

  constructor(value: number, currencyCode: string = 'USD') {
    const decimals = (currencies[currencyCode] ?? currencies['USD']).decimals;
    this._currencyCode = currencyCode;
    this._decimals = decimals;
    this._value = currency(value, { precision: decimals }).value;
  }

  private toNumber(input: MoneyInput): number {
    return input instanceof Money ? input.getValue() : input;
  }

  private decimalPlaces(n: number): number {
    const parts = n.toString().split('.');
    return parts.length === 2 ? parts[1].length : 0;
  }

  private maxDecimalPlaces(a: number, b: number): number {
    return Math.max(this.decimalPlaces(a), this.decimalPlaces(b));
  }

  private sumDecimalPlaces(a: number, b: number): number {
    return this.decimalPlaces(a) + this.decimalPlaces(b);
  }

  private spawn(value: number): Money {
    return new Money(value, this._currencyCode);
  }

  add(input: MoneyInput): Money {
    const value = this.toNumber(input);
    const precision = this.maxDecimalPlaces(this._value, value) + 1;
    const intermediate = currency(this._value, { precision }).add(value).value;
    return this.spawn(intermediate);
  }

  subtract(input: MoneyInput): Money {
    const value = this.toNumber(input);
    const precision = this.maxDecimalPlaces(this._value, value) + 1;
    const intermediate = currency(this._value, { precision }).subtract(value).value;
    return this.spawn(intermediate);
  }

  multiply(input: MoneyInput): Money {
    const value = this.toNumber(input);
    const precision = this.sumDecimalPlaces(this._value, value);
    const intermediate = currency(this._value, { precision }).multiply(value).value;
    return this.spawn(intermediate);
  }

  divide(input: MoneyInput): Money {
    const value = this.toNumber(input);
    const precision = this._decimals + 4;
    const intermediate = currency(this._value, { precision }).divide(value).value;
    return this.spawn(intermediate);
  }

  nonNegative(): Money {
    const safe = Number.isNaN(this._value) ? 0 : Math.max(this._value, 0);
    return this.spawn(safe);
  }

  getValue(): number {
    return this._value;
  }

  getCurrency(): Currency {
    return { code: this._currencyCode, decimals: this._decimals };
  }
}

export const money = (value: number, currencyCode: string = 'USD'): Money => new Money(value, currencyCode);
