import {
  parseFullString,
  parseQueryString,
  parsePathString,
  parseFileNameString
} from './parser';
import stringifier from './stringifier';

export default class Uri {
  constructor(str = window.location.href) {
    this._data = parseFullString(str);
    !this._data.query && (this._data.query = {})
  }
  get scheme() {
    return this._data.scheme;
  }
  set scheme(str = '') {
    this._data.scheme = str;
  }
  get username() {
    return this._data.username;
  }
  set username(str = '') {
    this._data.username = str;
  }
  get password() {
    return this._data.password;
  }
  set password(str = '') {
    this._data.password = str;
  }
  get host() {
    return this._data.host;
  }
  set host(str = '') {
    this._data.host = str;
  }
  get port() {
    return this._data.port;
  }
  set port(str = '') {
    this._data.port = str;
  }
  get folder() {
    return this._data.folder;
  }
  set folder(str = '') {
    this._data.folder = str;
  }
  get fileTitle() {
    return this._data.fileTitle;
  }
  set fileTitle(str = '') {
    this._data.fileTitle = str;
  }
  get fileExt() {
    return this._data.fileExt;
  }
  set fileExt(str = '') {
    this._data.fileExt = str;
  }
  get fileName() {
    return this.fileTitle && this.fileExt ? `${this.fileTitle}.${this.fileExt}` : void 0;
  }
  set fileName(str = '') {
    const {
      fileTitle,
      fileExt
    } = parseFileNameString(str);
    this.fileExt = fileExt;
    this.fileTitle = fileTitle;
  }
  get path() {
    if (this.folder) {
      return this.fileName ? `${this.folder}/${this.fileName}` : this.folder
    } else if (this.fileName) {
      return this.fileName
    }
  }
  set path(str = '') {
    const {
      folder,
      fileName
    } = parsePathString(str);

    this.folder = folder;
    this.fileName = fileName;
  }
  get query() {
    return this._data.query;
  }
  set query(obj = {}) {
    this._data.query = typeof obj === 'string' ? parseQueryString(obj) : obj;
  }
  getQueryKey(str) {
    return this.query[str];
  }
  addQueryKey(str) {
    return this.query[str] = void 0;
  }
  setQueryKey(str, value) {
    this.query[str] = value;
  }
  getQueryKeys(array = []) {
    return array.reduce((acc, el) => {
      acc[el] = this.query[el];
      return acc
    }, {});
  }
  setQueryKeys(obj = {}) {
    for (const key in obj) {
      this.query[key] = obj[key];
    }
  }
  deleteQueryKey(str) {
    delete this.query[str]
  }
  deleteQueryKeys(strings = []) {
    strings.map(el => {
      delete this.query[el]
    })
  }
  clearQuery() {
    this.query = {}
  }
  get fragment() {
    return this._data.fragment;
  }
  set fragment(str = '') {
    this._data.fragment = str;
  }
  toString(opts) {
    return stringifier(this._data, opts)
  }
}