import {
  parseFullString,
  parseQueryString
} from '../src/modules/uri/parser';
const scheme = 'http';
const username = 'username';
const password = 'password';
const host = 'www.host.com';
const port = '123';
const folder = 'folder/subfolder';
const fileName = 'file.html';
const fileTitle = 'file';
const fileExt = 'html';
const fragment = 'fragment';
const query = {
  name: 'name',
  age: 'age'
}

const assertEqual = x => y => x !== y ? console.error(`${x} is not equal ${y}`) : void 0;
const assertPropsEqual = props => obj => props.map(el => {
  const value = obj[el];
  typeof obj === 'object' ?
    assertEqual(JSON.stringify(value))(JSON.stringify(eval(el))) :
    assertEqual(value)(eval(el))
});

export default _ => {
  // console.log(parseFullString(`${scheme}://${username}:${password}@${host}:${port}/${folder}/${fileTitle}.${fileExt}?name=${query.name}&age=${query.age}#${fragment}`))
  assertPropsEqual(['scheme', 'username', 'password', 'host', 'port', 'folder', 'fileName', 'fileTitle', 'fileExt', 'query', 'fragment'])
    (parseFullString(`${scheme}://${username}:${password}@${host}:${port}/${folder}/${fileTitle}.${fileExt}?name=${query.name}&age=${query.age}#${fragment}`));
  assertPropsEqual(['username', 'password', 'host', 'port', 'folder', 'fileName', 'fileTitle', 'fileExt', 'query', 'fragment'])
    (parseFullString(`${username}:${password}@${host}:${port}/${folder}/${fileTitle}.${fileExt}?name=${query.name}&age=${query.age}#${fragment}`));
  assertPropsEqual(['host', 'port', 'folder', 'fileName', 'fileTitle', 'fileExt', 'query', 'fragment'])
    (parseFullString(`${host}:${port}/${folder}/${fileTitle}.${fileExt}?name=${query.name}&age=${query.age}#${fragment}`));
  // assertPropsEqual(['folder', 'fileName', 'fileTitle', 'fileExt', 'query', 'fragment'])
  //   (parseFullString(`/${folder}/${fileTitle}.${fileExt}?name=${query.name}&age=${query.age}#${fragment}`));
  assertPropsEqual(['fileName', 'fileTitle', 'fileExt', 'query', 'fragment'])
    (parseFullString(`${fileTitle}.${fileExt}?name=${query.name}&age=${query.age}#${fragment}`));
  assertPropsEqual(['query', 'fragment'])
    (parseFullString(`name=${query.name}&age=${query.age}#${fragment}`));

  assertPropsEqual(['scheme', 'username', 'password', 'host', 'port', 'folder', 'fileName', 'fileTitle', 'fileExt', 'query'])
    (parseFullString(`${scheme}://${username}:${password}@${host}:${port}/${folder}/${fileTitle}.${fileExt}?name=${query.name}&age=${query.age}`));
  assertPropsEqual(['scheme', 'username', 'password', 'host', 'port', 'folder', 'fileName', 'fileTitle', 'fileExt'])
    (parseFullString(`${scheme}://${username}:${password}@${host}:${port}/${folder}/${fileTitle}.${fileExt}`));
  assertPropsEqual(['scheme', 'username', 'password', 'host', 'port', 'folder'])
    (parseFullString(`${scheme}://${username}:${password}@${host}:${port}/${folder}`));
  assertPropsEqual(['scheme', 'username', 'password', 'host', 'port'])
    (parseFullString(`${scheme}://${username}:${password}@${host}:${port}`));
  assertPropsEqual(['scheme', 'username', 'password', 'host'])
    (parseFullString(`${scheme}://${username}:${password}@${host}`));
  assertPropsEqual(['scheme', 'host'])
    (parseFullString(`${scheme}://${host}`));
  assertPropsEqual(['host'])
    (parseFullString(`${host}`));

  assertPropsEqual(['scheme', 'host', 'folder', 'fileName', 'fileTitle', 'fileExt', 'query'])
    (parseFullString(`${scheme}://${host}/${folder}/${fileTitle}.${fileExt}?name=${query.name}&age=${query.age}`));
  assertPropsEqual(['scheme', 'host', 'fileName', 'fileTitle', 'fileExt', 'query'])
    (parseFullString(`${scheme}://${host}/${fileTitle}.${fileExt}?name=${query.name}&age=${query.age}`));
  assertPropsEqual(['host', 'fileName', 'fileTitle', 'fileExt', 'query'])
    (parseFullString(`${host}/${fileTitle}.${fileExt}?name=${query.name}&age=${query.age}`));
  assertPropsEqual(['scheme', 'host', 'fileName', 'fileTitle', 'fileExt'])
    (parseFullString(`${scheme}://${host}/${fileTitle}.${fileExt}`));
  assertPropsEqual(['host', 'fileName', 'fileTitle', 'fileExt'])
    (parseFullString(`${host}/${fileTitle}.${fileExt}`));
  assertPropsEqual([])
    (parseFullString());

  // console.log(parseFullString('http://localhost:3000/a/a.html?b=1#2'));

}