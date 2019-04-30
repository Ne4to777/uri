
export default (obj = {}) => {
  if (!Object.keys(obj).length) return '';
  const scheme = obj.scheme ? `${obj.scheme}://` : '';
  const userInfo = obj.username && obj.password ? `${obj.username}:${obj.password}@` : '';
  const host = obj.host || '';
  const port = obj.port ? `:${obj.port}` : '';
  const folder = obj.folder ? `/${obj.folder}` : '';
  const fileName = obj.fileName || '';
  const path = folder ? `${folder}/${fileName}` : fileName;

  const queries = [];
  for (const prop in obj.query) queries.push(`${prop}=${encodeURIComponent(obj.query[prop])}`);

  const query = queries.length ? `?${queries.join('&')}` : '';
  const fragment = obj.fragment ? `#${obj.fragment}` : '';
  return scheme + (userInfo + host + port + path + query + fragment).replace(/\/\/+/g, '/');
}