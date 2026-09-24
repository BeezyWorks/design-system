import moment from 'moment/src/moment'

// moment's ESM source has only a default export; the app also imports these
// two as named exports (which Metro's CJS interop allows).
export const isDate = moment.isDate
export const isMoment = moment.isMoment
export default moment
