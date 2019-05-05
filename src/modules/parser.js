const FILE_EXTS = {
  html: true,
  htm: true,
  aspx: true,
  asp: true,
  php: true
}
const PROTOCOLS = {
  http: true,
  https: true,
  ftp: true
}

export const parseFileNameString = str => {
  const fileSplits = str.split('.');
  const fileTitle = fileSplits.slice(0, -1).join('.');
  const fileExt = fileSplits.slice(-1)[0];
  return {
    fileTitle,
    fileExt
  }
}

export const parsePathString = str => {
  let fileName, file, folder;
  const pathSplits = str instanceof Array ? str : str.split('/');
  if (pathSplits.length === 1) {
    const first = pathSplits[0];
    if (/\./.test(first)) {
      fileName = first;
      file = parseFileNameString(fileName);
    } else {
      folder = first;
    }
  } else {
    const last = pathSplits.slice(-1)[0];
    let folderSplits = pathSplits;
    if (/\./.test(last)) {
      fileName = last;
      file = parseFileNameString(fileName);
      folderSplits = pathSplits.slice(0, -1);
    }
    folder = folderSplits.join('/');
  }
  return {
    fileName,
    folder,
    ...file
  }
}

const parseHostString = str => {
  let host, port;
  const hostSplits = str.split(':');
  const first = hostSplits[0];
  const second = hostSplits[1];
  if (second) {
    if (first) {
      port = second;
      host = first;
    }
  } else {
    host = first;
  }
  return {
    host,
    port
  }
}

const parseUserInfoString = str => {
  let username, password;
  const userSplits = str.split(':');
  const first = userSplits[0];
  const second = userSplits[1];
  if (second) {
    if (first) {
      password = second;
      username = first;
    }
  } else {
    username = first;
  }
  return {
    username,
    password
  }
}

const parseAuthorityString = str => {
  let host, userInfo;
  const userInfoSplits = str.split('@');
  const first = userInfoSplits[0];
  const second = userInfoSplits[1];
  if (second) {
    if (first) {
      userInfo = parseUserInfoString(first)
    }
    host = parseHostString(second);
  } else {
    host = parseHostString(first);
  }

  return {
    ...host,
    ...userInfo
  }
}

const parseAuthorityAndPathString = str => {
  const authoritySplits = str.split('/');
  let path, authority;
  const first = authoritySplits[0];
  const tail = authoritySplits.slice(1).join('/');

  if (tail) {
    if (first) {
      if (/\./.test(first)) {
        if (FILE_EXTS[first.split('.').slice(-1)[0]]) {
          path = parsePathString(str);
        } else {
          authority = parseAuthorityString(first);
          path = parsePathString(tail);
        }
      } else {
        authority = parseAuthorityString(first);
        path = parsePathString(tail);
      }
    } else {
      path = parsePathString(str);
    }
  } else {
    if (/\./.test(first)) {
      const dotSplits = first.split('.');
      const last = dotSplits.slice(-1)[0];
      if (FILE_EXTS[last]) {
        path = parsePathString(first);
      } else {
        authority = parseAuthorityString(first);
      }
    } else {
      authority = parseAuthorityString(first);
    }
  }
  return {
    ...authority,
    ...path
  }
}

const parseSchemeAuthorityAndPathString = str => {
  const schemeSplits = str.split('://');
  const first = schemeSplits[0];
  const second = schemeSplits[1];
  let scheme, authority;

  if (second) {
    if (first) {
      scheme = first
    }
    authority = parseAuthorityAndPathString(second);
  } else {
    if (PROTOCOLS[first]) {
      scheme = PROTOCOLS[first]
    } else {
      authority = parseAuthorityAndPathString(first);
    }
  }

  return {
    scheme,
    ...authority
  }
}

export const parseQueryString = (queryString = '') => {
  const querySplits = queryString.split('&');
  return querySplits.length ?
    querySplits.reduce((acc, el) => {
      const parameterSplits = decodeURIComponent(el).split('=');
      const value = parameterSplits[1];
      if (value !== void 0) acc[parameterSplits[0]] = value;
      return acc
    }, {}) : {}
}

const parseQueryAndFragmentString = str => {
  const queryAndFragment = decodeURIComponent(str);
  const fragmentSplits = queryAndFragment.split('#');
  const query = parseQueryString(fragmentSplits[0]);
  const fragment = fragmentSplits[1];
  return {
    query,
    fragment
  };
}

export const parseFullString = str => {
  if (!str) return {};
  const authorityAndPathSplits = str.split('?');
  const first = authorityAndPathSplits[0];
  const second = authorityAndPathSplits[1];
  if (second) {
    return first ? {
        ...parseSchemeAuthorityAndPathString(first),
        ...parseQueryAndFragmentString(second)
      } :
      parseQueryAndFragmentString(second)
  } else {
    return /=|#/.test(first) ?
      parseQueryAndFragmentString(first) :
      parseSchemeAuthorityAndPathString(first);
  }
}