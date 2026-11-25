import { TskvLogger } from '../tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;
  let logSpy, errorSpy, warnSpy, debugSpy;

  beforeEach(() => {
    logger = new TskvLogger();
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    debugSpy = jest.spyOn(console, 'debug').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('log writes TSKV string to console.log', () => {
    logger.log('test message', 'key=value');

    expect(logSpy).toHaveBeenCalledTimes(1);
    const output = logSpy.mock.calls[0][0];
    expect(output).toBe('level=log\tmessage=test message\tparam0=key=value');
  });

  it('error writes TSKV string to console.error', () => {
    logger.error('error occurred', 'code=500');

    expect(errorSpy).toHaveBeenCalledTimes(1);
    const output = errorSpy.mock.calls[0][0];
    expect(output).toBe('level=error\tmessage=error occurred\tparam0=code=500');
  });

  it('warn writes TSKV string to console.warn', () => {
    logger.warn('warning message', 'context=test');

    expect(warnSpy).toHaveBeenCalledTimes(1);
    const output = warnSpy.mock.calls[0][0];
    expect(output).toBe(
      'level=warn\tmessage=warning message\tparam0=context=test',
    );
  });

  it('debug writes TSKV string to console.debug', () => {
    logger.debug('debug info', 'id=123');

    expect(debugSpy).toHaveBeenCalledTimes(1);
    const output = debugSpy.mock.calls[0][0];
    expect(output).toBe('level=debug\tmessage=debug info\tparam0=id=123');
  });

  it('verbose uses console.log with verbose level', () => {
    logger.verbose('detail info', 'trace=true');

    expect(logSpy).toHaveBeenCalledTimes(1);
    const output = logSpy.mock.calls[0][0];
    expect(output).toBe(
      'level=verbose\tmessage=detail info\tparam0=trace=true',
    );
  });
});
