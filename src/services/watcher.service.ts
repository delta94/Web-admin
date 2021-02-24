enum WatcherError {
  NOT_START = 'Watcher is not running',
  STARTING = 'Watcher is still running',
}

export interface WatcherModel {
  startTime: any;
  endTime: any;
  _duration: any;
  _isRunning: boolean | any;
}

export class Watcher implements WatcherModel {
  startTime: any = 0;
  endTime: any = 0;
  _duration: any = 0;
  _isRunning: boolean | any = false;

  get duration() {
    return this._duration;
  }

  get isRunning(): boolean {
    return this._isRunning;
  }

  set isRunning(running: boolean) {
    this._isRunning = running;
  }

  public start = () => {
    if (this._isRunning) {
      throw new Error(WatcherError.STARTING);
    }
    this._isRunning = true;
    this.startTime = new Date().getTime();
    return this;
  };

  public stop = () => {
    if (!this._isRunning) {
      throw new Error(WatcherError.NOT_START);
    }
    this._isRunning = false;
    this.endTime = new Date().getTime();
    const second = (this.endTime - this.startTime) / 1000;
    this._duration += second;
    return this;
  };

  public reset = () => {
    this._isRunning = false;
    this._duration = 0;
    this.startTime = 0;
    this.endTime = 0;
    return this;
  };
}
