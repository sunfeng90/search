export class ESearchException extends Error{
  public errno;
  public msg;
  constructor(errno, msg) {
    super(msg);
    this.errno = errno;
    this.msg = msg;
  }
}