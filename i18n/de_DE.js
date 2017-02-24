/* global define */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory)
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  }
})(function () {
  'use strict'
  var voc = {
    dayNameAbbrevs: [ 'So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa' ],
    dayNames: [
      'Sonntag', 'Montag', 'Dienstag', 'Mittwoch',
      'Donnerstag', 'Freitag', 'Samstag' ],
    monthNameAbbrevs: [
      'Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun',
      'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    monthNames: [
      'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
      'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember' ],
    numberSuffix: function () { return '.' }
  }
  return voc
})
