
const EXTS = {
  html: true,
  htm: true,
  aspx: true,
  asp: true,
  php: true
}
const parsePathString = str => {
  const result = {};
  const pathSplits = str instanceof Array ? str : str.split('/');
  if (pathSplits.length) {
    let fileName;
    const last = pathSplits.slice(-1)[0];
    let folderSplits = pathSplits;
    if (/\./.test(last)) {
      fileName = last;
      folderSplits = pathSplits.slice(0, -1);
    }
    const folder = folderSplits.join('/');
    folder && (result.folder = folder);

    if (fileName) {
      result.fileName = fileName;
      const fileSplits = fileName.split('.');
      const fileTitle = fileSplits[0];
      const fileExt = fileSplits[1];
      result.fileTitle = fileTitle;
      result.fileExt = fileExt
    }
  }
  return result
}

const parseAuthorityString = str => {
  const result = {};
  const userInfoSplits = str.split('@');
  const absolutePath = userInfoSplits.pop();
  const userInfo = userInfoSplits[0];
  const hostAndPathSplits = absolutePath.split('/');
  const hostAndPort = hostAndPathSplits.shift();
  const hostSplits = hostAndPort.split(':');
  const host = hostSplits.shift();
  result.host = host;
  const port = hostSplits[0];
  port && (result.port = port)

  if (userInfo) {
    const usernameSplits = userInfo.split(':');
    const username = usernameSplits.shift();
    const password = usernameSplits[0];
    result.username = username
    result.password = password
  }
  return result
}

const parseSchemeAuthorityAndPathString = str => {
  const re = /[^\/](\/)[^\/]/;
  if (/:\/\//.test(str)) {
    const schemeSplits = str.split('://');
    const scheme = schemeSplits.shift();
    const authorityString = schemeSplits.shift();
    const authoritySplits = authorityString.split('/');
    return re.test(authorityString)
      ? {
        ...parseAuthorityString(authoritySplits.shift()),
        ...parsePathString(authoritySplits),
        scheme
      }
      : {
        ...parseAuthorityString(authorityString),
        scheme
      }
  } else {
    const authoritySplits = str.split('/');
    const authorityString = authoritySplits.shift();
    const splits = authorityString.split('.');
    const ext = splits[1];
    if (EXTS[ext]) {
      return {
        fileTitle: splits[0],
        fileName: authorityString,
        fileExt: ext
      }
    } else {
      return re.test(str)
        ? {
          ...parseAuthorityString(authorityString),
          ...parsePathString(authoritySplits),
        }
        : parseAuthorityString(str)
    }

  }
}


const parseQueryString = (queryString = '') => {
  const querySplits = queryString.split('&');
  return querySplits.length
    ? querySplits.reduce((acc, el) => {
      const parameterSplits = decodeURIComponent(el).split('=');
      const value = parameterSplits[1];
      if (value !== void 0) acc[parameterSplits[0]] = value;
      return acc
    }, {})
    : {}
}

const parseQueryAndFragmentString = str => {
  const result = {};
  const queryAndFragment = decodeURIComponent(str);
  const fragmentSplits = queryAndFragment.split('#');
  const queryString = fragmentSplits.shift();
  const fragment = fragmentSplits[0];
  fragment && (result.fragment = fragment);
  queryString && (result.query = parseQueryString(queryString));
  return result;
}

export default str => {
  const authorityAndPathSplits = str.split('?');
  const authorityAndPath = authorityAndPathSplits[0];
  if (authorityAndPathSplits.length === 1) {
    return /=/.test(authorityAndPath)
      ? parseQueryAndFragmentString(authorityAndPath)
      : parseSchemeAuthorityAndPathString(authorityAndPath)
  } else {
    return {
      ...parseSchemeAuthorityAndPathString(authorityAndPath),
      ...parseQueryAndFragmentString(authorityAndPathSplits[1])
    }
  }
}
