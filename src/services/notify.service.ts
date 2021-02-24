/* eslint-disable prettier/prettier */
/* eslint-disable no-duplicate-case */
import * as fromReport from 'store/report/constants/report.constant';
export class NotifyService {
  enqueueSnackbar: any;
  variantSuccess: any = {
    variant: 'success',
  };
  variantFail: any = {
    variant: 'error',
  };
  variantWarning: any = {
    variant: 'warning',
  };
  variantInfo: any = {
    variant: 'info',
  };
  message?: string;
  anchorOrigin = {
    vertical: 'top',
    horizontal: 'right',
  };

  constructor(enqueueSnackbar: any) {
    this.enqueueSnackbar = enqueueSnackbar;
  }

  public setNotify(response: any): void {
    if (!response) return;
    switch (response.key) {
      case fromReport.RESPONSE_CONSTANT.HISTORY_CARD.CANCEL_DEAL_SUCCESS:
        this.enqueueSnackbar(this.message, this.variantSuccess);
        break;
      case fromReport.RESPONSE_CONSTANT.HISTORY_CARD.CANCEL_DEAL_FAIL:
        this.enqueueSnackbar(this.message, this.variantFail);
        break;
      default:
        break;
    }
  }

  public setNotifyAnchorOrigin = (config): NotifyService => {
    this.anchorOrigin = config;
    return this;
  }

  public setNotifyMessage(message: string): NotifyService {
    this.message = message;
    return this;
  }

  public setSuccessNotify(): NotifyService {
    this.enqueueSnackbar(this.message, this.variantSuccess);
    return this;
  }

  public setFailNotify(): NotifyService {
    this.enqueueSnackbar(this.message, this.variantFail);
    return this; 
  }

  public setWaringNotify(): NotifyService {
    this.enqueueSnackbar(this.message, this.variantWarning);
    return this;
  }

  public setInfoNotify(): NotifyService {
    this.enqueueSnackbar(this.message, this.variantInfo);
    return this; 
  }
}
