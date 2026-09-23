import moment from 'moment'
import {HebrewMoment} from './hebrewMoment.model'

/** Anything that can stand for a calendar date across the app. */
export type DateValue = HebrewMoment | Date | number | moment.Moment
