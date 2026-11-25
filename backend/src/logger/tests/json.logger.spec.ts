import { JsonLogger } from "../json.logger";

describe('JsonLogger', () => {
  let logger: JsonLogger;
  const spies = {
    log: jest.spyOn(console, 'log').mockImplementation(() => {}),
    error: jest.spyOn(console, 'error').mockImplementation(() => {}),
    warn: jest.spyOn(console, 'warn').mockImplementation(() => {}),
    debug: jest.spyOn(console, 'debug').mockImplementation(() => {}),
  };

  beforeEach(() => {
    logger = new JsonLogger();
    Object.values(spies).forEach(s => s.mockClear());
  });

  it('error формирует JSON с уровнем error', () => {
    logger.error('ошибка', 'host=localhost');
    expect(spies.error).toHaveBeenCalledTimes(1);
    expect(JSON.parse(spies.error.mock.calls[0][0])).toEqual({
      level: 'error',
      message: 'ошибка',
      optionalParams: ['host=localhost'],
    });
  });

  it('log формирует JSON с уровнем log', () => {
    logger.log('сообщение', 'user=123');
    expect(spies.log).toHaveBeenCalledTimes(1);
    expect(JSON.parse(spies.log.mock.calls[0][0])).toEqual({
      level: 'log',
      message: 'сообщение',
      optionalParams: ['user=123'],
    });
  });

  it('warn формирует JSON с уровнем warn', () => {
    logger.warn('предупреждение');
    expect(spies.warn).toHaveBeenCalledTimes(1);
    expect(JSON.parse(spies.warn.mock.calls[0][0])).toEqual({
      level: 'warn',
      message: 'предупреждение',
      optionalParams: [],
    });
  });

  it('debug формирует JSON с уровнем debug', () => {
    logger.debug('дебаг', 'id=1');
    expect(spies.debug).toHaveBeenCalledTimes(1);
    expect(JSON.parse(spies.debug.mock.calls[0][0])).toEqual({
      level: 'debug',
      message: 'дебаг',
      optionalParams: ['id=1'],
    });
  });

  it('verbose формирует JSON с уровнем verbose (через console.log)', () => {
    logger.verbose('вербоз');
    expect(spies.log).toHaveBeenCalledTimes(1);
    expect(JSON.parse(spies.log.mock.calls[0][0])).toEqual({
      level: 'verbose',
      message: 'вербоз',
      optionalParams: [],
    });
  });
});