const path = require('node:path');
const util = require('node:util');

const appRoot = require('app-root-path');
const log4js = require('log4js');

/**
 * Base Logger
 */
class Logger {

    static logger4js = null;

    static logger4jsInit(config) {
        if (!(Logger.logger4js)) {
            let apendersConf = {};
            let enabledAppenders = [];
            if (!!config.logger.file.enabled) {
                let logFile = path.resolve(appRoot.toString(), config.logger.file.path);
                apendersConf.file = {type: 'file', filename: logFile};
                enabledAppenders.push('file')
            }

            if (!!config.logger.console.enabled) {
                apendersConf.console = {type: 'stdout'};
                enabledAppenders.push('console')
            }

            log4js.configure({
                appenders: apendersConf,
                categories: {default: {appenders: enabledAppenders, level: config.logger.log4js.level}}
            });

            Logger.logger4js = log4js.getLogger();
        }
    }

    /** @type {string} */
    name;

    /**
     * @param {string} name
     */
    constructor(name) {
        this.name = name;
    }

    /**
     * @param {string} msg
     * @param {*|null} obj
     */
    info(msg, obj = null) {
        Logger.logger4js.info(`||| ${this.name} ||| ${msg}`);
        if (obj !== null) {
            Logger.logger4js.info(JSON.stringify(obj));
        }
    }

    /**
     * @param {string} msg
     * @param {*|null} obj
     */
    debug(msg, obj = null) {
        Logger.logger4js.debug(`||| ${this.name} ||| ${msg}`);
        if (obj !== null) {
            Logger.logger4js.debug(JSON.stringify(obj));
        }
    }

    /**
     * @param {string} msg
     * @param {*|null} error
     * @param {*|null} obj
     */
    error(msg, error = null, obj = null) {
        Logger.logger4js.error(`||| ${this.name} ||| ${msg}`, error);
        if (obj !== null) {
            Logger.logger4js.error(JSON.stringify(obj));
        }
    }
}

module.exports = Logger;
