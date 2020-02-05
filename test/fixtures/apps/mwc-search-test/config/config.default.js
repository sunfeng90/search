'use strict';

exports.keys = '123456';


exports.customLogger = {
  elkLogger: {
    level: 'DEBUG', // 日志级别
    file: './egg-mwc-client.log', // 日志路径
    flushInterval: 2000, // 2秒一刷
    maxBufferLength: 1000, // 缓冲队列上限
    business: 'egg-mwc-client', // elk业务索引
    extend: (ctx, logData) => logData, // 扩展日志数据
  },
};
