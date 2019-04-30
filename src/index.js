import spx from 'spx-com';
spx.setCustomUsersList({ webTitle: 'AM', listTitle: 'UsersAD' });
window.spx = spx;


var AuraURI = function (uri) {
  var it = this;
  !uri && (uri = window.location.href);
  this.parseURI(uri);
  // this.REGEX = {};
  // this.REGEX.ABNF = {
  // 	ALPHA: 'a-zA-Zа-яА-ЯёЁ',
  // 	CR: '\\n',
  // 	LF: '\\r',
  // 	SP: '\\s',
  // 	DIGIT: '0-9',
  // 	DQUOTE: '"',
  // 	HEXDIG: '0[xX][0-9a-fA-F]+'
  // }

  // this.REGEX.DELIMS = {
  // 	GENERIC: '\\:\\/\\?\\#\\[\\]\\@',
  // 	SUBCOMPONENTS: '\\!\\$\\&\'\\(\\)\\*\\+\\,\\;\\=',
  // 	SCHEME: ':',
  // 	AUTHORITY: '\\/\\/',
  // 	USER_INFO: '@'
  // }

  // this.REGEX.CHARS = {
  // 	PERCENT_ENCODED: '', // '%' + this.REGEX.ABNF.HEXDIG + this.REGEX.ABNF.HEXDIG,
  // 	RESERVED: this.REGEX.DELIMS.GENERIC + this.REGEX.DELIMS.SUBCOMPONENTS,
  // 	UNRESERVED: this.REGEX.ABNF.ALPHA + this.REGEX.ABNF.DIGIT + '\\-\\.\\_\\~'
  // }

  // this.REGEX.ELEMENTS = {
  // 	H16: '', // 1*4HEXDIG
  // 	DEC_OCTET: '',
  // 	// DIGIT                 ; 0-9
  // 	// %x31-39 DIGIT         ; 10-99
  // 	// "1" 2DIGIT            ; 100-199
  // 	// "2" %x30-34 DIGIT     ; 200-249
  // 	// "25" %x30-35          ; 250-255
  // }
  // this.REGEX.ELEMENTS.LS32 = ''; // ( h16 ":" h16 ) / IPv4address
  // this.REGEX.ELEMENTS.IP_V4_ADRESS = ''; // dec-octet "." dec-octet "." dec-octet "." dec-octet
  // this.REGEX.ELEMENTS.IP_V6_ADRESS = '';
  // // 														 6( h16 ":" ) ls32
  // // 												"::" 5( h16 ":" ) ls32
  // //	[               h16 ] "::" 4( h16 ":" ) ls32
  // //	[ *1( h16 ":" ) h16 ] "::" 3( h16 ":" ) ls32
  // //	[ *2( h16 ":" ) h16 ] "::" 2( h16 ":" ) ls32
  // //	[ *3( h16 ":" ) h16 ] "::"    h16 ":"   ls32
  // //	[ *4( h16 ":" ) h16 ] "::"              ls32
  // //	[ *5( h16 ":" ) h16 ] "::"              h16
  // //	[ *6( h16 ":" ) h16 ] "::"
  // this.REGEX.ELEMENTS.IP_LITERAL = ''; // "[" ( IPv6address / IPvFuture  ) "]"
  // this.REGEX.ELEMENTS.IP_VFuture_ADRESS = ''; // "v" 1*HEXDIG "." 1*( unreserved / sub-delims / ":" )
  // this.REGEX.ELEMENTS.REG_NAME = this.REGEX.CHARS.UNRESERVED + this.REGEX.CHARS.PERCENT_ENCODED + this.REGEX.DELIMS.SUBCOMPONENTS; // *( unreserved / pct-encoded / sub-delims )

  // this.REGEX.COMPONENTS = {
  // 	SCHEME: '^[' + this.REGEX.ABNF.ALPHA + '][' + this.REGEX.ABNF.ALPHA + this.REGEX.ABNF.DIGIT + '\\+\\-\\.]*',
  // 	USER_INFO: '', // *( unreserved / pct-encoded / sub-delims / ":" )
  // 	HOST: '[' + this.REGEX.ELEMENTS.REG_NAME + ']+', // IP-literal / IPv4address / reg-name
  // 	PORT: '', // *DIGIT
  // 	AUTHORITY: '', // [ userinfo "@" ] host [ ":" port ]

  // }

  // 'scheme://username:password@www.example.com:123/hello/world/there.html?name=ferret&age=20#fragment';

  // if (!uri) {
  // 	console.log('URI is missed');
  // 	return
  // }

  // this.scheme = new RegExp(this.REGEX.DELIMS.SCHEME + this.REGEX.DELIMS.AUTHORITY).test(uri) ? uri.match(new RegExp(this.REGEX.COMPONENTS.SCHEME))[0] : '';
  // this.host = uri.match(new RegExp(this.REGEX.COMPONENTS.HOST)) || '';

  $(window).on('ONCHANGESTATE', function () {
    it.parseURI(window.location.href);
  });
}



AuraURI.prototype.parseURI = function (uri) {
  var parameterSplits, pathSplits, fragmentSplits, querySplits, fileNameSplits;
  var schemeSplits = uri.split('://');
  this.query = {};
  this.fullQueryString = '';
  this.fragment = '';
  if (schemeSplits.length === 2) {
    this.scheme = schemeSplits[0];
    pathSplits = schemeSplits[1].split('?');
  } else {
    this.scheme = '';
  }
  var absolutePathSplits = schemeSplits[0].split('?');
  this.absolutePath = (this.scheme ? this.scheme + '://' : '') + pathSplits[0];
  var shortAbsolutePathSplits = absolutePathSplits[absolutePathSplits.length === 2 ? 1 : 0].slice(2).split('/');
  this.relativePath = '/' + shortAbsolutePathSplits.slice(1).join('/');
  fileNameSplits = this.absolutePath.split('/');
  this.fileName = fileNameSplits.pop();
  if (pathSplits.length === 2) {
    fragmentSplits = pathSplits[1].split('#');
    if (fragmentSplits.length === 2) {
      this.fragment = fragmentSplits[1];
    } else {
      this.fragment = '';
    }
    this.parseQuery(fragmentSplits[0]);
  } else {
    this.queryString = '';
  }
}

AuraURI.prototype.parseQuery = function (queryString) {
  var querySplit, queryKey, parameterSplits, value, querySplits;
  this.query = {};
  if (queryString) {
    querySplits = queryString.split('&');
    if (queryString) {
      for (var i = 0; i < querySplits.length; i++) {
        querySplit = decodeURIComponent(querySplits[i]);
        parameterSplits = querySplit.split('=');
        queryKey = parameterSplits[0];
        value = parameterSplits[1];
        if (value !== void 0) {
          this.query[queryKey] = value;
        }
      };
    }
  }

  this.refreshParameters();
}

AuraURI.prototype.addQueryKey = function (key) {
  this.query[key] = '';
}

AuraURI.prototype.deleteQueryKey = function (key, isHistoryReplaced) {
  if (this.setQueryKey(key)) {
    this.changeHistory(isHistoryReplaced);
  }
}

AuraURI.prototype.refreshParameters = function () {
  var query = [];
  for (var param in this.query) {
    query.push(param + '=' + encodeURIComponent(this.query[param]));
  }
  this.queryString = query.join('&');
  this.fullQueryString = this.queryString + (this.fragment ? '#' + this.fragment : '');
}

AuraURI.prototype.setQueryKey = function (key, value) {
  var isSet;
  if (value === void 0) {
    if (this.query.hasOwnProperty(key)) {
      delete this.query[key];
      isSet = true
    } else {
      isSet = false
    }
  } else {
    !this.query.hasOwnProperty(key) && this.addQueryKey(key);
    this.query[key] = value;
    isSet = true
  }
  this.refreshParameters();
  return isSet;
}

AuraURI.prototype.setQueryKeys = function (parameters) {
  for (var key in parameters) {
    this.setQueryKey(key, parameters[key])
  }
}

AuraURI.prototype.replaceQuery = function (queryString, isHistoryReplaced) {
  this.parseQuery(queryString);
  this.changeHistory(isHistoryReplaced);
}

AuraURI.prototype.replaceQueryKey = function (key, value, isHistoryReplaced) {
  this.setQueryKey(key, value);
  this.changeHistory(isHistoryReplaced);
}

AuraURI.prototype.replaceQueryKeys = function (parameters, isHistoryReplaced) {
  this.setQueryKeys(parameters);
  this.changeHistory(isHistoryReplaced);
}

AuraURI.prototype.clearQuery = function () {
  this.replaceQuery();
};

AuraURI.prototype.changeHistory = function (isHistoryReplaced) {
  history[isHistoryReplaced ? 'replaceState' : 'pushState'](null, null, this.fullQueryString ? '?' + this.fullQueryString : this.fileName);
};