import test from './../test';
import parser from './modules/parser';




// console.log(parseQueryString('InitialTabId=Ribbon%2EList&VisibilityContext=WSSListAndLibrary'));

// const addQueryKey = function (key) {
//   this.query[key] = '';
// }

// const deleteQueryKey = function (key, isHistoryReplaced) {
//   if (this.setQueryKey(key)) {
//     this.changeHistory(isHistoryReplaced);
//   }
// }

// const refreshParameters = function () {
//   var query = [];
//   for (var param in this.query) {
//     query.push(param + '=' + encodeURIComponent(this.query[param]));
//   }
//   this.queryString = query.join('&');
//   this.fullQueryString = this.queryString + (this.fragment ? '#' + this.fragment : '');
// }

// const setQueryKey = function (key, value) {
//   var isSet;
//   if (value === void 0) {
//     if (this.query.hasOwnProperty(key)) {
//       delete this.query[key];
//       isSet = true
//     } else {
//       isSet = false
//     }
//   } else {
//     !this.query.hasOwnProperty(key) && this.addQueryKey(key);
//     this.query[key] = value;
//     isSet = true
//   }
//   this.refreshParameters();
//   return isSet;
// }

// const setQueryKeys = function (parameters) {
//   for (var key in parameters) {
//     this.setQueryKey(key, parameters[key])
//   }
// }

// const replaceQuery = function (queryString, isHistoryReplaced) {
//   this.parseQuery(queryString);
//   this.changeHistory(isHistoryReplaced);
// }

// const replaceQueryKey = function (key, value, isHistoryReplaced) {
//   this.setQueryKey(key, value);
//   this.changeHistory(isHistoryReplaced);
// }

// const replaceQueryKeys = function (parameters, isHistoryReplaced) {
//   this.setQueryKeys(parameters);
//   this.changeHistory(isHistoryReplaced);
// }

// const clearQuery = function () {
//   this.replaceQuery();
// };

// const changeHistory = function (isHistoryReplaced) {
//   history[isHistoryReplaced ? 'replaceState' : 'pushState'](null, null, this.fullQueryString ? '?' + this.fullQueryString : this.fileName);
// };


test();