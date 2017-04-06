/**
 * create at 2017年4月6日15:43:38
 * @author：garens
 * @type {[type]}
 */

var Sequelize = require('sequelize');
var sequelize = require('./conn');

/**
 * 设备信息表
 * @type {[type]}
 */
var device = require('./table_models/device')

/**
 * 导出设备信息表对象
 * @type {[type]}
 */
exports.Device = device(sequelize,Sequelize);
