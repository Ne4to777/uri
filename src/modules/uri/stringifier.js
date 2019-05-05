const mergeSlashes = str => str.replace(/\/\/+/g, '/');
export default (obj = {}, opts = {}) => {
  if (!Object.keys(obj).length) return '';
  const {
    relativeMode
  } = opts;
  const scheme = obj.scheme ? `${obj.scheme}://` : '';
  const userInfo = obj.username && obj.password ? `${obj.username}:${obj.password}@` : '';
  const host = obj.host || '';
  const port = obj.port ? `:${obj.port}` : '';
  const folder = obj.folder ? `/${obj.folder}` : '';
  const fileName = obj.fileTitle && obj.fileExt ? `${obj.fileTitle}.${obj.fileExt}` : '';
  const path = mergeSlashes(folder ? (fileName ? `${folder}/${fileName}` : `${folder}/`) : `/${fileName}`);

  const queries = [];
  for (const prop in obj.query) {
    const value = obj.query[prop];
    queries.push(`${prop}=${value===void 0?'':encodeURIComponent(obj.query[prop])}`);
  }

  const query = queries.length ? `?${queries.join('&')}` : '';
  const fragment = obj.fragment ? `#${obj.fragment}` : '';
  const queryAndFragment = query + fragment;
  const pathQueryAndFragment = path + queryAndFragment;

  switch (relativeMode) {
    case 'scheme':
      return (scheme ? '//' : '') + userInfo + host + port + pathQueryAndFragment;
    case 'root':
      return pathQueryAndFragment;
    case 'path':
      return fileName + queryAndFragment;
    case 'query':
      return queryAndFragment
    default:
      return scheme + userInfo + host + port + pathQueryAndFragment;
  }
}