import React from 'react';
import { CurrencyService } from 'services/currency.service';

export function PriceButton(props) {
  const { price, disable, onClick } = props;
  return (
    <div className="col-sm-6" key={price}>
      <button
        style={{
          backgroundColor: '#e9ecef',
          width: '100%',
          height: '90%',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
        value={price.value}
        className="btn btn-lg recharge"
        disabled={disable}
        onClick={() => onClick(price)}
        type="button"
      >
        {CurrencyService.formatCurrency(price.value)}
      </button>
    </div>
  );
}
