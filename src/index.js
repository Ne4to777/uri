// import test from './../test';
import Uri from './modules/uri/';
const identity = _ => _;

const fireEvent = event => async isAsync => isAsync ?
  setTimeout(_ => event()) :
  await event();


export default (opts = {}) => {
  const {
    onstatechange = identity
  } = opts;
  const fireOnStateChange = fireEvent(onstatechange);
  const uri = new Uri();
  return {
    set folder(str) {
      uri.folder = str;
    },
    get folder() {
      return uri.folder;
    },
    set fileName(str) {
      uri.fileName = str;
    },
    get fileName() {
      return uri.fileName;
    },
    set path(str) {
      uri.path = str;
    },
    get path() {
      return uri.path;
    },
    set query(str) {
      uri.query = str;
    },
    get query() {
      return uri.query;
    },
    set fragment(str) {
      uri.fragment = str;
    },
    get fragment() {
      return uri.fragment;
    },
    getQueryKey: uri.getQueryKey.bind(uri),
    setQueryKey: uri.setQueryKey.bind(uri),
    getQueryKeys: uri.getQueryKeys.bind(uri),
    setQueryKeys: uri.setQueryKeys.bind(uri),
    deleteQueryKey: uri.deleteQueryKey.bind(uri),
    deleteQueryKeys: uri.deleteQueryKeys.bind(uri),
    clearQuery: uri.clearQuery.bind(uri),
    getRelativeURL: function () {
      return this.toString({
        relativeMode: 'root'
      })
    },
    setRelativeURL: function (str) {
      const localUri = new Uri(str);
      this.path = localUri.path;
      this.query = Object.assign({}, localUri.query);
      this.fragment = localUri.fragment;
    },
    toString: uri.toString.bind(uri),
    push: async (opts = {}) => {
      const {
        state,
        title,
        isAsync
      } = opts;
      await fireOnStateChange(isAsync);
      history.pushState(state, title, uri.toString({
        relativeMode: 'root'
      }));
    },
    pushFolder: function (str, opts) {
      this.folder = str;
      this.push(opts)
    },
    pushFileName: function (str, opts) {
      this.fileName = str;
      this.push(opts)
    },
    pushPath: function (str, opts) {
      this.path = str;
      this.push(opts)
    },
    pushQuery: function (obj, opts) {
      this.query = obj;
      this.push(opts)
    },
    pushQueryKey: function (key, value, opts) {
      this.setQueryKey(key, value);
      this.push(opts)
    },
    pushQueryKeys: function (obj, opts) {
      this.setQueryKeys(obj, value);
      this.push(opts)
    },
    pushFragment: function (str, opts) {
      this.fragment = str;
      this.push(opts)
    },
    pushURL: function (str, opts) {
      this.setRelativeURL(str, opts);
      this.push(opts)
    },
    getState: _ => history.state,
    getLength: _ => history.length,
    forward: async (opts = {}) => {
      await fireOnStateChange(opts.isAsync);
      history.forward()
    },
    back: async (opts = {}) => {
      await fireOnStateChange(opts.isAsync);
      history.back()
    },
    go: async (i, opts = {}) => {
      await fireOnStateChange(opts.isAsync);
      history.go(i);
    }
  }
}

// test();