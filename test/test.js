/* global describe, it, beforeEach */
'use strict'

process.env.TZ = 'America/Los_Angeles'

var tmp = require('../')
var date = tmp.date
var gmdate = tmp.gmdate
var assert = require('assert')

describe('date', function () {
  var testDate
  beforeEach(function () {
    testDate = new Date(2016, 1, 4, 3, 24, 5, 34)
  })
  describe('d', function () {
    it('should properly format date with padded zero', function () {
      assert.strictEqual(date('d', testDate), '04')
    })
  })
  describe('j', function () {
    it('should properly format date without padded zero', function () {
      assert.strictEqual(date('j', testDate), '4')
    })
  })
  describe('D', function () {
    it('should format date to short day name', function () {
      assert.strictEqual(date('D', testDate), 'Thu')
      testDate.setMonth(0, 31)
      assert.strictEqual(date('D', testDate), 'Sun')
      testDate.setMonth(1, 1)
      assert.strictEqual(date('D', testDate), 'Mon')
      testDate.setDate(2)
      assert.strictEqual(date('D', testDate), 'Tue')
      testDate.setDate(3)
      assert.strictEqual(date('D', testDate), 'Wed')
      testDate.setDate(5)
      assert.strictEqual(date('D', testDate), 'Fri')
      testDate.setDate(6)
      assert.strictEqual(date('D', testDate), 'Sat')
    })
  })
  describe('l', function () {
    it('should format date to long day name', function () {
      assert.strictEqual(date('l', testDate), 'Thursday')
      testDate.setMonth(0, 31)
      assert.strictEqual(date('l', testDate), 'Sunday')
      testDate.setMonth(1, 1)
      assert.strictEqual(date('l', testDate), 'Monday')
      testDate.setDate(2)
      assert.strictEqual(date('l', testDate), 'Tuesday')
      testDate.setDate(3)
      assert.strictEqual(date('l', testDate), 'Wednesday')
      testDate.setDate(5)
      assert.strictEqual(date('l', testDate), 'Friday')
      testDate.setDate(6)
      assert.strictEqual(date('l', testDate), 'Saturday')
    })
  })
  describe('N', function () {
    it('should format date to iso-8601 day number (monday = 1, sunday = 7)', function () {
      assert.strictEqual(date('N', testDate), '4')
      testDate.setMonth(0, 31)
      assert.strictEqual(date('N', testDate), '7')
      testDate.setMonth(1, 1)
      assert.strictEqual(date('N', testDate), '1')
      testDate.setDate(2)
      assert.strictEqual(date('N', testDate), '2')
      testDate.setDate(3)
      assert.strictEqual(date('N', testDate), '3')
      testDate.setDate(5)
      assert.strictEqual(date('N', testDate), '5')
      testDate.setDate(6)
      assert.strictEqual(date('N', testDate), '6')
    })
  })
  describe('S', function () {
    it('should properly determine ordinality of the date', function () {
      assert.strictEqual(date('jS', testDate), '4th')
      testDate.setMonth(1, 1)
      assert.strictEqual(date('jS', testDate), '1st')
      testDate.setDate(2)
      assert.strictEqual(date('jS', testDate), '2nd')
      testDate.setDate(3)
      assert.strictEqual(date('jS', testDate), '3rd')
    })
  })
  describe('w', function () {
    it('should properly format the day of the week to just a number', function () {
      assert.strictEqual(date('w', testDate), '4')
      testDate.setMonth(0, 31)
      assert.strictEqual(date('w', testDate), '0')
      testDate.setMonth(1, 6)
      assert.strictEqual(date('w', testDate), '6')
    })
  })
  describe('z', function () {
    it('should return the number of days into the year', function () {
      assert.strictEqual(date('z', testDate), '34')
    })
  })
  describe('F', function () {
    it('should return the long month name of the date', function () {
      testDate.setMonth(0, 31)
      assert.strictEqual(date('F', testDate), 'January')
      testDate.setMonth(1, 1)
      assert.strictEqual(date('F', testDate), 'February')
      testDate.setMonth(2, 1)
      assert.strictEqual(date('F', testDate), 'March')
      testDate.setMonth(3, 1)
      assert.strictEqual(date('F', testDate), 'April')
      testDate.setMonth(4, 1)
      assert.strictEqual(date('F', testDate), 'May')
      testDate.setMonth(5, 1)
      assert.strictEqual(date('F', testDate), 'June')
      testDate.setMonth(6, 1)
      assert.strictEqual(date('F', testDate), 'July')
      testDate.setMonth(7, 1)
      assert.strictEqual(date('F', testDate), 'August')
      testDate.setMonth(8, 1)
      assert.strictEqual(date('F', testDate), 'September')
      testDate.setMonth(9, 1)
      assert.strictEqual(date('F', testDate), 'October')
      testDate.setMonth(10, 1)
      assert.strictEqual(date('F', testDate), 'November')
      testDate.setMonth(11, 1)
      assert.strictEqual(date('F', testDate), 'December')
    })
  })
  describe('m', function () {
    it('should return the month number with a padded zero (non-zero indexed)', function () {
      testDate.setMonth(0, 31)
      assert.strictEqual(date('m', testDate), '01')
      testDate.setMonth(1, 1)
      assert.strictEqual(date('m', testDate), '02')
      testDate.setMonth(2, 1)
      assert.strictEqual(date('m', testDate), '03')
      testDate.setMonth(3, 1)
      assert.strictEqual(date('m', testDate), '04')
      testDate.setMonth(4, 1)
      assert.strictEqual(date('m', testDate), '05')
      testDate.setMonth(5, 1)
      assert.strictEqual(date('m', testDate), '06')
      testDate.setMonth(6, 1)
      assert.strictEqual(date('m', testDate), '07')
      testDate.setMonth(7, 1)
      assert.strictEqual(date('m', testDate), '08')
      testDate.setMonth(8, 1)
      assert.strictEqual(date('m', testDate), '09')
      testDate.setMonth(9, 1)
      assert.strictEqual(date('m', testDate), '10')
      testDate.setMonth(10, 1)
      assert.strictEqual(date('m', testDate), '11')
      testDate.setMonth(11, 1)
      assert.strictEqual(date('m', testDate), '12')
    })
  })
  describe('M', function () {
    it('should return the short month name of the date', function () {
      testDate.setMonth(0, 31)
      assert.strictEqual(date('M', testDate), 'Jan')
      testDate.setMonth(1, 1)
      assert.strictEqual(date('M', testDate), 'Feb')
      testDate.setMonth(2, 1)
      assert.strictEqual(date('M', testDate), 'Mar')
      testDate.setMonth(3, 1)
      assert.strictEqual(date('M', testDate), 'Apr')
      testDate.setMonth(4, 1)
      assert.strictEqual(date('M', testDate), 'May')
      testDate.setMonth(5, 1)
      assert.strictEqual(date('M', testDate), 'Jun')
      testDate.setMonth(6, 1)
      assert.strictEqual(date('M', testDate), 'Jul')
      testDate.setMonth(7, 1)
      assert.strictEqual(date('M', testDate), 'Aug')
      testDate.setMonth(8, 1)
      assert.strictEqual(date('M', testDate), 'Sep')
      testDate.setMonth(9, 1)
      assert.strictEqual(date('M', testDate), 'Oct')
      testDate.setMonth(10, 1)
      assert.strictEqual(date('M', testDate), 'Nov')
      testDate.setMonth(11, 1)
      assert.strictEqual(date('M', testDate), 'Dec')
    })
  })
  describe('n', function () {
    it('should return the month number without a padded zero (non-zero indexed)', function () {
      testDate.setMonth(0, 31)
      assert.strictEqual(date('n', testDate), '1')
      testDate.setMonth(1, 1)
      assert.strictEqual(date('n', testDate), '2')
      testDate.setMonth(2, 1)
      assert.strictEqual(date('n', testDate), '3')
      testDate.setMonth(3, 1)
      assert.strictEqual(date('n', testDate), '4')
      testDate.setMonth(4, 1)
      assert.strictEqual(date('n', testDate), '5')
      testDate.setMonth(5, 1)
      assert.strictEqual(date('n', testDate), '6')
      testDate.setMonth(6, 1)
      assert.strictEqual(date('n', testDate), '7')
      testDate.setMonth(7, 1)
      assert.strictEqual(date('n', testDate), '8')
      testDate.setMonth(8, 1)
      assert.strictEqual(date('n', testDate), '9')
      testDate.setMonth(9, 1)
      assert.strictEqual(date('n', testDate), '10')
      testDate.setMonth(10, 1)
      assert.strictEqual(date('n', testDate), '11')
      testDate.setMonth(11, 1)
      assert.strictEqual(date('n', testDate), '12')
    })
  })
  describe('L', function () {
    it('should return 0 for non-leap-years', function () {
      [2015, 2013, 2011, 2003, 1997, 1998, 1986].forEach(function (y) {
        testDate.setYear(y)
        assert.strictEqual(date('L', testDate), '0')
      })
    })
    it('should return 1 for leap-years', function () {
      [2016, 2012, 2008, 2004, 2000, 1996, 1992, 1988].forEach(function (y) {
        testDate.setYear(y)
        assert.strictEqual(date('L', testDate), '1')
      })
    })
  })
  describe('t', function () {
    it('should return the number of calendar days for the set month', function () {
      assert.strictEqual(date('t', testDate), '29')
      testDate.setYear(2015)
      assert.strictEqual(date('t', testDate), '28')
      testDate.setMonth(0, 4)
      assert.strictEqual(date('t', testDate), '31')
      testDate.setMonth(3, 1)
      assert.strictEqual(date('t', testDate), '30')
    })
  })
  describe('Y', function () {
    it('should return the full year', function () {
      assert.strictEqual(date('Y', testDate), '2016')
      testDate.setYear(2012)
      assert.strictEqual(date('Y', testDate), '2012')
    })
  })
  describe('y', function () {
    it('should return the truncated year (1998 -> 98)', function () {
      assert.strictEqual(date('y', testDate), '16')
      testDate.setYear(2012)
      assert.strictEqual(date('y', testDate), '12')
      testDate.setYear(2000)
      assert.strictEqual(date('y', testDate), '00')
    })
  })
  describe('a', function () {
    it('should return am or pm depending on the hour of day', function () {
      assert.strictEqual(date('a', testDate), 'am')
      testDate.setHours(0)
      assert.strictEqual(date('a', testDate), 'am')
      testDate.setHours(23)
      assert.strictEqual(date('a', testDate), 'pm')
      testDate.setHours(12)
      assert.strictEqual(date('a', testDate), 'pm')
    })
  })
  describe('A', function () {
    it('should return AM or PM depending on the hour of the day', function () {
      assert.strictEqual(date('A', testDate), 'AM')
      testDate.setHours(0)
      assert.strictEqual(date('A', testDate), 'AM')
      testDate.setHours(23)
      assert.strictEqual(date('A', testDate), 'PM')
      testDate.setHours(12)
      assert.strictEqual(date('A', testDate), 'PM')
    })
  })
  describe('g', function () {
    it('should return non-military hour without a leading zero', function () {
      assert.strictEqual(date('g', testDate), '3')
      testDate.setHours(15)
      assert.strictEqual(date('g', testDate), '3')
      testDate.setHours(0)
      assert.strictEqual(date('g', testDate), '12')
      testDate.setHours(12)
      assert.strictEqual(date('g', testDate), '12')
    })
  })
  describe('G', function () {
    it('should return military hour without a leading zero', function () {
      assert.strictEqual(date('G', testDate), '3')
      testDate.setHours(15)
      assert.strictEqual(date('G', testDate), '15')
      testDate.setHours(0)
      assert.strictEqual(date('G', testDate), '0')
      testDate.setHours(12)
      assert.strictEqual(date('G', testDate), '12')
    })
  })
  describe('h', function () {
    it('should return non-military hour with a leading zero', function () {
      assert.strictEqual(date('h', testDate), '03')
      testDate.setHours(15)
      assert.strictEqual(date('h', testDate), '03')
      testDate.setHours(0)
      assert.strictEqual(date('h', testDate), '12')
      testDate.setHours(12)
      assert.strictEqual(date('h', testDate), '12')
    })
  })
  describe('H', function () {
    it('should return military hour with a leading zero', function () {
      assert.strictEqual(date('H', testDate), '03')
      testDate.setHours(15)
      assert.strictEqual(date('H', testDate), '15')
      testDate.setHours(0)
      assert.strictEqual(date('H', testDate), '00')
      testDate.setHours(12)
      assert.strictEqual(date('H', testDate), '12')
    })
  })
  describe('i', function () {
    it('should return the minutes with a leading zero', function () {
      assert.strictEqual(date('i', testDate), '24')
      testDate.setMinutes(3)
      assert.strictEqual(date('i', testDate), '03')
    })
  })
  describe('s', function () {
    it('should return the seconds with a leading zero', function () {
      assert.strictEqual(date('s', testDate), '05')
      testDate.setSeconds(45)
      assert.strictEqual(date('s', testDate), '45')
    })
  })
  describe('u', function () {
    it('should return the milliseconds with a leading zero', function () {
      assert.strictEqual(date('s.u', testDate), '05.034')
    })
  })
  describe('U', function () {
    it('should return the seconds since the unix epoch', function () {
      assert.strictEqual(date('U', testDate), '1454585045')
    })
  })
  describe('P', function () {
    it('should return the timezone offset seperated by a colon', function () {
      assert.strictEqual(date('P', testDate), '+08:00')
    })
  })
  describe('O', function () {
    it('should return the timezone offset not seperated by a colon', function () {
      assert.strictEqual(date('O', testDate), '+0800')
    })
  })
  describe('c', function () {
    it('should return the date formatted in iso 8601 format', function () {
      assert.strictEqual(date('c', testDate), '2016-02-04T03:24:05+08:00')
    })
  })
  describe('r', function () {
    it('should return the date formatted rfc2822 format', function () {
      assert.strictEqual(date('r', testDate), 'Thu, 04 Feb 2016 03:24:05 +0800')
    })
  })
  describe('letter escaping', function () {
    it('should skip over letters that are prefixed with a slash (\\)', function () {
      assert.strictEqual(date('\\rc', testDate), 'r2016-02-04T03:24:05+08:00')
      assert.strictEqual(date('Y-\\m-d H:\\i:s', testDate), '2016-m-04 03:i:05')
    })
  })
})

describe('gmdate', function () {
  /** @type {Date} */
  var testDate
  beforeEach(function () {
    testDate = new Date(2016, 1, 4, 3, 24, 5, 34)
  })
  describe('d', function () {
    it('should properly format date with padded zero', function () {
      assert.strictEqual(gmdate('d', testDate), '04')
    })
  })
  describe('j', function () {
    it('should properly format date without padded zero', function () {
      assert.strictEqual(gmdate('j', testDate), '4')
    })
  })
  describe('D', function () {
    it('should format date to short day name', function () {
      assert.strictEqual(gmdate('D', testDate), 'Thu')
      testDate.setMonth(0, 31)
      assert.strictEqual(gmdate('D', testDate), 'Sun')
      testDate.setMonth(1, 1)
      assert.strictEqual(gmdate('D', testDate), 'Mon')
      testDate.setDate(2)
      assert.strictEqual(gmdate('D', testDate), 'Tue')
      testDate.setDate(3)
      assert.strictEqual(gmdate('D', testDate), 'Wed')
      testDate.setDate(5)
      assert.strictEqual(gmdate('D', testDate), 'Fri')
      testDate.setDate(6)
      assert.strictEqual(gmdate('D', testDate), 'Sat')
    })
  })
  describe('l', function () {
    it('should format date to long day name', function () {
      assert.strictEqual(gmdate('l', testDate), 'Thursday')
      testDate.setMonth(0, 31)
      assert.strictEqual(gmdate('l', testDate), 'Sunday')
      testDate.setMonth(1, 1)
      assert.strictEqual(gmdate('l', testDate), 'Monday')
      testDate.setDate(2)
      assert.strictEqual(gmdate('l', testDate), 'Tuesday')
      testDate.setDate(3)
      assert.strictEqual(gmdate('l', testDate), 'Wednesday')
      testDate.setDate(5)
      assert.strictEqual(gmdate('l', testDate), 'Friday')
      testDate.setDate(6)
      assert.strictEqual(gmdate('l', testDate), 'Saturday')
    })
  })
  describe('N', function () {
    it('should format date to iso-8601 day number (monday = 1, sunday = 7)', function () {
      assert.strictEqual(gmdate('N', testDate), '4')
      testDate.setMonth(0, 31)
      assert.strictEqual(gmdate('N', testDate), '7')
      testDate.setMonth(1, 1)
      assert.strictEqual(gmdate('N', testDate), '1')
      testDate.setDate(2)
      assert.strictEqual(gmdate('N', testDate), '2')
      testDate.setDate(3)
      assert.strictEqual(gmdate('N', testDate), '3')
      testDate.setDate(5)
      assert.strictEqual(gmdate('N', testDate), '5')
      testDate.setDate(6)
      assert.strictEqual(gmdate('N', testDate), '6')
    })
  })
  describe('S', function () {
    it('should properly determine ordinality of the date', function () {
      assert.strictEqual(gmdate('jS', testDate), '4th')
      testDate.setMonth(1, 1)
      assert.strictEqual(gmdate('jS', testDate), '1st')
      testDate.setDate(2)
      assert.strictEqual(gmdate('jS', testDate), '2nd')
      testDate.setDate(3)
      assert.strictEqual(gmdate('jS', testDate), '3rd')
    })
  })
  describe('w', function () {
    it('should properly format the day of the week to just a number', function () {
      assert.strictEqual(gmdate('w', testDate), '4')
      testDate.setMonth(0, 31)
      assert.strictEqual(gmdate('w', testDate), '0')
      testDate.setMonth(1, 6)
      assert.strictEqual(gmdate('w', testDate), '6')
    })
  })
  describe('z', function () {
    it('should return the number of days into the year', function () {
      assert.strictEqual(gmdate('z', testDate), '34')
    })
  })
  describe('F', function () {
    it('should return the long month name of the date', function () {
      testDate.setMonth(0, 31)
      assert.strictEqual(gmdate('F', testDate), 'January')
      testDate.setMonth(1, 1)
      assert.strictEqual(gmdate('F', testDate), 'February')
      testDate.setMonth(2, 1)
      assert.strictEqual(gmdate('F', testDate), 'March')
      testDate.setMonth(3, 1)
      assert.strictEqual(gmdate('F', testDate), 'April')
      testDate.setMonth(4, 1)
      assert.strictEqual(gmdate('F', testDate), 'May')
      testDate.setMonth(5, 1)
      assert.strictEqual(gmdate('F', testDate), 'June')
      testDate.setMonth(6, 1)
      assert.strictEqual(gmdate('F', testDate), 'July')
      testDate.setMonth(7, 1)
      assert.strictEqual(gmdate('F', testDate), 'August')
      testDate.setMonth(8, 1)
      assert.strictEqual(gmdate('F', testDate), 'September')
      testDate.setMonth(9, 1)
      assert.strictEqual(gmdate('F', testDate), 'October')
      testDate.setMonth(10, 1)
      assert.strictEqual(gmdate('F', testDate), 'November')
      testDate.setMonth(11, 1)
      assert.strictEqual(gmdate('F', testDate), 'December')
    })
  })
  describe('m', function () {
    it('should return the month number with a padded zero (non-zero indexed)', function () {
      testDate.setMonth(0, 31)
      assert.strictEqual(gmdate('m', testDate), '01')
      testDate.setMonth(1, 1)
      assert.strictEqual(gmdate('m', testDate), '02')
      testDate.setMonth(2, 1)
      assert.strictEqual(gmdate('m', testDate), '03')
      testDate.setMonth(3, 1)
      assert.strictEqual(gmdate('m', testDate), '04')
      testDate.setMonth(4, 1)
      assert.strictEqual(gmdate('m', testDate), '05')
      testDate.setMonth(5, 1)
      assert.strictEqual(gmdate('m', testDate), '06')
      testDate.setMonth(6, 1)
      assert.strictEqual(gmdate('m', testDate), '07')
      testDate.setMonth(7, 1)
      assert.strictEqual(gmdate('m', testDate), '08')
      testDate.setMonth(8, 1)
      assert.strictEqual(gmdate('m', testDate), '09')
      testDate.setMonth(9, 1)
      assert.strictEqual(gmdate('m', testDate), '10')
      testDate.setMonth(10, 1)
      assert.strictEqual(gmdate('m', testDate), '11')
      testDate.setMonth(11, 1)
      assert.strictEqual(gmdate('m', testDate), '12')
    })
  })
  describe('M', function () {
    it('should return the short month name of the date', function () {
      testDate.setMonth(0, 31)
      assert.strictEqual(gmdate('M', testDate), 'Jan')
      testDate.setMonth(1, 1)
      assert.strictEqual(gmdate('M', testDate), 'Feb')
      testDate.setMonth(2, 1)
      assert.strictEqual(gmdate('M', testDate), 'Mar')
      testDate.setMonth(3, 1)
      assert.strictEqual(gmdate('M', testDate), 'Apr')
      testDate.setMonth(4, 1)
      assert.strictEqual(gmdate('M', testDate), 'May')
      testDate.setMonth(5, 1)
      assert.strictEqual(gmdate('M', testDate), 'Jun')
      testDate.setMonth(6, 1)
      assert.strictEqual(gmdate('M', testDate), 'Jul')
      testDate.setMonth(7, 1)
      assert.strictEqual(gmdate('M', testDate), 'Aug')
      testDate.setMonth(8, 1)
      assert.strictEqual(gmdate('M', testDate), 'Sep')
      testDate.setMonth(9, 1)
      assert.strictEqual(gmdate('M', testDate), 'Oct')
      testDate.setMonth(10, 1)
      assert.strictEqual(gmdate('M', testDate), 'Nov')
      testDate.setMonth(11, 1)
      assert.strictEqual(gmdate('M', testDate), 'Dec')
    })
  })
  describe('n', function () {
    it('should return the month number without a padded zero (non-zero indexed)', function () {
      testDate.setMonth(0)
      assert.strictEqual(gmdate('n', testDate), '1')
      testDate.setMonth(1, 1)
      assert.strictEqual(gmdate('n', testDate), '2')
      testDate.setMonth(2, 1)
      assert.strictEqual(gmdate('n', testDate), '3')
      testDate.setMonth(3, 1)
      assert.strictEqual(gmdate('n', testDate), '4')
      testDate.setMonth(4, 1)
      assert.strictEqual(gmdate('n', testDate), '5')
      testDate.setMonth(5, 1)
      assert.strictEqual(gmdate('n', testDate), '6')
      testDate.setMonth(6, 1)
      assert.strictEqual(gmdate('n', testDate), '7')
      testDate.setMonth(7, 1)
      assert.strictEqual(gmdate('n', testDate), '8')
      testDate.setMonth(8, 1)
      assert.strictEqual(gmdate('n', testDate), '9')
      testDate.setMonth(9, 1)
      assert.strictEqual(gmdate('n', testDate), '10')
      testDate.setMonth(10, 1)
      assert.strictEqual(gmdate('n', testDate), '11')
      testDate.setMonth(11, 1)
      assert.strictEqual(gmdate('n', testDate), '12')
    })
  })
  describe('L', function () {
    it('should return 0 for non-leap-years', function () {
      [2015, 2013, 2011, 2003, 1997, 1998, 1986].forEach(function (y) {
        testDate.setYear(y)
        assert.strictEqual(gmdate('L', testDate), '0')
      })
    })
    it('should return 1 for leap-years', function () {
      [2016, 2012, 2008, 2004, 2000, 1996, 1992, 1988].forEach(function (y) {
        testDate.setYear(y)
        assert.strictEqual(gmdate('L', testDate), '1')
      })
    })
  })
  describe('t', function () {
    it('should return the number of calendar days for the set month', function () {
      assert.strictEqual(gmdate('t', testDate), '29')
      testDate.setYear(2015)
      assert.strictEqual(gmdate('t', testDate), '28')
      testDate.setMonth(0, 4)
      assert.strictEqual(gmdate('t', testDate), '31')
      testDate.setMonth(3, 1)
      assert.strictEqual(gmdate('t', testDate), '30')
    })
  })
  describe('Y', function () {
    it('should return the full year', function () {
      assert.strictEqual(gmdate('Y', testDate), '2016')
      testDate.setYear(2012)
      assert.strictEqual(gmdate('Y', testDate), '2012')
    })
  })
  describe('y', function () {
    it('should return the truncated year (1998 -> 98)', function () {
      assert.strictEqual(gmdate('y', testDate), '16')
      testDate.setYear(2012)
      assert.strictEqual(gmdate('y', testDate), '12')
      testDate.setYear(2000)
      assert.strictEqual(gmdate('y', testDate), '00')
    })
  })
  describe('a', function () {
    it('should return am or pm depending on the hour of day', function () {
      assert.strictEqual(gmdate('a', testDate), 'am')
      testDate.setHours(0)
      assert.strictEqual(gmdate('a', testDate), 'am')
      testDate.setHours(23) // remember: this is 23 hours at America/Los_Angeles, not UTC, so yes, 'am' is correct
      assert.strictEqual(gmdate('a', testDate), 'am')
      testDate.setHours(12)
      assert.strictEqual(gmdate('a', testDate), 'pm')
    })
  })
  describe('A', function () {
    it('should return AM or PM depending on the hour of the day', function () {
      assert.strictEqual(gmdate('A', testDate), 'AM')
      testDate.setHours(0)
      assert.strictEqual(gmdate('A', testDate), 'AM')
      testDate.setHours(23)
      assert.strictEqual(gmdate('A', testDate), 'AM')
      testDate.setHours(12)
      assert.strictEqual(gmdate('A', testDate), 'PM')
    })
  })
  describe('g', function () {
    it('should return non-military hour without a leading zero', function () {
      assert.strictEqual(gmdate('g', testDate), '11')
      testDate.setHours(15)
      assert.strictEqual(gmdate('g', testDate), '11')
      testDate.setHours(0)
      assert.strictEqual(gmdate('g', testDate), '8')
      testDate.setHours(12)
      assert.strictEqual(gmdate('g', testDate), '8')
    })
  })
  describe('G', function () {
    it('should return military hour without a leading zero', function () {
      assert.strictEqual(gmdate('G', testDate), '11')
      testDate.setHours(15)
      assert.strictEqual(gmdate('G', testDate), '23')
      testDate.setHours(0)
      assert.strictEqual(gmdate('G', testDate), '8')
      testDate.setHours(12)
      assert.strictEqual(gmdate('G', testDate), '20')
    })
  })
  describe('h', function () {
    it('should return non-military hour with a leading zero', function () {
      assert.strictEqual(gmdate('h', testDate), '11')
      testDate.setHours(15)
      assert.strictEqual(gmdate('h', testDate), '11')
      testDate.setHours(0)
      assert.strictEqual(gmdate('h', testDate), '08')
      testDate.setHours(12)
      assert.strictEqual(gmdate('h', testDate), '08')
    })
  })
  describe('H', function () {
    it('should return military hour with a leading zero', function () {
      assert.strictEqual(gmdate('H', testDate), '11')
      testDate.setHours(15)
      assert.strictEqual(gmdate('H', testDate), '23')
      testDate.setHours(0)
      assert.strictEqual(gmdate('H', testDate), '08')
      testDate.setHours(12)
      assert.strictEqual(gmdate('H', testDate), '20')
    })
  })
  describe('i', function () {
    it('should return the minutes with a leading zero', function () {
      assert.strictEqual(gmdate('i', testDate), '24')
      testDate.setMinutes(3)
      assert.strictEqual(gmdate('i', testDate), '03')
    })
  })
  describe('s', function () {
    it('should return the seconds with a leading zero', function () {
      assert.strictEqual(gmdate('s', testDate), '05')
      testDate.setSeconds(45)
      assert.strictEqual(gmdate('s', testDate), '45')
    })
  })
  describe('u', function () {
    it('should return the milliseconds with a leading zero', function () {
      assert.strictEqual(gmdate('s.u', testDate), '05.034')
    })
  })
  describe('U', function () {
    it('should return the seconds since the unix epoch', function () {
      assert.strictEqual(gmdate('U', testDate), '1454585045')
    })
  })
  describe('P', function () {
    it('should return the timezone offset seperated by a colon', function () {
      assert.strictEqual(gmdate('P', testDate), '+00:00')
    })
  })
  describe('O', function () {
    it('should return the timezone offset not seperated by a colon', function () {
      assert.strictEqual(gmdate('O', testDate), '+0000')
    })
  })
  describe('c', function () {
    it('should return the date formatted in iso 8601 format', function () {
      assert.strictEqual(gmdate('c', testDate), '2016-02-04T11:24:05+00:00')
    })
  })
  describe('r', function () {
    it('should return the date formatted rfc2822 format', function () {
      assert.strictEqual(gmdate('r', testDate), 'Thu, 04 Feb 2016 11:24:05 +0000')
    })
  })
  describe('letter escaping', function () {
    it('should skip over letters that are prefixed with a slash (\\)', function () {
      assert.strictEqual(gmdate('\\rc', testDate), 'r2016-02-04T11:24:05+00:00')
      assert.strictEqual(gmdate('Y-\\m-d H:\\i:s', testDate), '2016-m-04 11:i:05')
    })
  })
})
