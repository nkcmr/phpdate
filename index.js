/* global define */
(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory)
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    Object.assign(global, factory())
  }
})(this, function () {
  'use strict'

  var ESCAPE_CHAR = '\\'
  var millisecondsPerDay = 24 * 60 * 60 * 1000

  var shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  var longDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  var iso8601NumericDay = ['7', '1', '2', '3', '4', '5', '6']

  var longMonths = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
  var shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  var numberSuffix = (function (sufs) {
    return function (date, utc) {
      return (sufs[utc ? date.getUTCDate() : date.getDate() % 10] || 'th')
    }
  }(['th', 'st', 'nd', 'rd']))

  /**
   * @type {{[t: string]: (date: Date, utc: boolean)}}
   */
  var tokens = {
    d: function (date, utc) {
      return String(100 + (utc ? date.getUTCDate() : date.getDate())).slice(1)
    },
    j: function (date, utc) {
      return String(utc ? date.getUTCDate() : date.getDate())
    },
    D: function (date, utc) {
      return shortDays[utc ? date.getUTCDay() : date.getDay()]
    },
    l: function (date, utc) {
      return longDays[utc ? date.getUTCDay() : date.getDay()]
    },
    N: function (date, utc) {
      return iso8601NumericDay[utc ? date.getUTCDay() : date.getDay()]
    },
    S: numberSuffix, // locale-dependent!
    w: function (date, utc) {
      return String(utc ? date.getUTCDay() : date.getDay())
    },
    z: function (date, utc) {
      var start = (new Date(utc ? date.getUTCFullYear() : date.getFullYear(), 0, 1)).getTime()
      return String(Math.floor((date.getTime() - start) / millisecondsPerDay))
    },
    F: function (date, utc) {
      return longMonths[utc ? date.getUTCMonth() : date.getMonth()]
    },
    m: function (date, utc) {
      return String((utc ? date.getUTCMonth() : date.getMonth()) + 101).slice(1)
    },
    M: function (date, utc) {
      return shortMonths[utc ? date.getUTCMonth() : date.getMonth()]
    },
    n: function (date, utc) {
      return String((utc ? date.getUTCMonth() : date.getMonth()) + 1)
    },
    L: function (date, utc) {
      var year = utc ? date.getUTCFullYear() : date.getFullYear()
      if (((year % 4) === 0 && (year % 100) !== 0) || (year % 400) === 0) {
        return '1'
      }
      return '0'
    },
    t: function (date, utc) {
      if ((utc ? date.getUTCMonth() : date.getMonth()) === 1) {
        return this.L(date, utc) === '1' ? '29' : '28'
      }
      if ([0, 2, 4, 6, 7, 9, 11].indexOf((utc ? date.getUTCMonth() : date.getMonth())) !== -1) {
        return '31'
      }
      return '30'
    },
    Y: function (date, utc) {
      return String(utc ? date.getUTCFullYear() : date.getFullYear())
    },
    y: function (date, utc) {
      return String(utc ? date.getUTCFullYear() : date.getFullYear()).substr(2, 2)
      // Using the exact positions will give a little performance boost for
      // the next few thousand years, at the cost of a little maintainance
      // effort in the far future. (Writing this @ 2017-02-24)
    },
    a: function (date, utc) {
      return (utc ? date.getUTCHours() : date.getHours()) < 12 ? 'am' : 'pm'
    },
    A: function (date, utc) {
      return this.a(date, utc).toUpperCase()
    },
    g: function (date, utc) {
      return String((utc ? date.getUTCHours() : date.getHours()) % 12 || 12)
    },
    G: function (date, utc) {
      return String(utc ? date.getUTCHours() : date.getHours())
    },
    h: function (date, utc) {
      var h = this.g(date, utc)
      return (h.length === 2 ? h : '0' + h)
    },
    H: function (date, utc) {
      return String(100 + (utc ? date.getUTCHours() : date.getHours())).slice(1)
    },
    i: function (date, utc) {
      return String(100 + (utc ? date.getUTCMinutes() : date.getMinutes())).slice(1)
    },
    s: function (date, utc) {
      return String(100 + (utc ? date.getUTCSeconds() : date.getSeconds())).slice(1)
    },
    u: function (date, utc) {
      return String(1000 + (utc ? date.getUTCMilliseconds() : date.getMilliseconds())).slice(1)
    },
    U: function (date) {
      return String(Math.floor((date.getTime()) / 1000))
    },
    P: function (date, utc) {
      var offsetMinutes = utc ? 0 : date.getTimezoneOffset()
      var sign = offsetMinutes < 0 ? '-' : '+'
      offsetMinutes = Math.abs(offsetMinutes)
      var hours = Math.floor(offsetMinutes / 60)
      var minutes = offsetMinutes % 60
      return sign + String(100 + hours).slice(1) + ':' +
        String(100 + minutes).slice(1)
    },
    O: function (date, utc) {
      var offsetMinutes = utc ? 0 : date.getTimezoneOffset()
      var sign = offsetMinutes < 0 ? '-' : '+'
      offsetMinutes = Math.abs(offsetMinutes)
      var hours = Math.floor(offsetMinutes / 60)
      var minutes = offsetMinutes % 60
      return sign + String(10000 + (100 * hours) + minutes).slice(1)
    },
    c: function (_date, utc) {
      return (utc ? gmdate : date)('Y-m-dTH:i:sP', _date)
    },
    r: function (_date, utc) {
      return (utc ? gmdate : date)('D, d M Y H:i:s O', _date)
    }
  }

  /**
   * @param {boolean} utc
   */
  function dateFnFactory (utc) {
    /**
     * @param {string} format
     * @param {Date | undefined} time
     */
    function date (format, time) {
      var specimen, idx, char, replacement, head, tail
      if (!time) {
        time = new Date()
      }
      specimen = format.split('')
      for (idx = 0; idx < specimen.length; idx++) {
        if (idx > 0 && specimen[Math.max(0, idx - 1)] === ESCAPE_CHAR) {
          head = specimen.slice(0, idx - 1)
          tail = specimen.slice(idx)
          specimen = head.concat(tail)
          idx -= 1
          continue
        }
        char = specimen[idx]
        if (!tokens[char]) {
          continue
        }
        replacement = tokens[char](time, utc).split('')
        head = specimen.slice(0, idx)
        tail = specimen.slice(idx + 1)
        specimen = head.concat(replacement, tail)
        idx += (replacement.length - 1)
      }
      return specimen.join('')
    }
    return date
  }

  var gmdate = dateFnFactory(true)
  var date = dateFnFactory(false)

  return {
    date: date,
    gmdate: gmdate
  }
})
