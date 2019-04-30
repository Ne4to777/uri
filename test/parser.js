import parser from './../src/modules/parser';
const scheme = 'http';
const username = 'username';
const password = 'password';
const host = 'www.example.com';
const port = '123';
const folder = 'hello/world';
const fileName = 'there.html';
const fileTitle = 'there';
const fileExt = 'html';
const fragment = 'fragment';
const query = {
  name: 'ferret',
  age: '20'
}

const assertEqual = x => y => x !== y ? console.error(`${x} is not equal ${y}`) : void 0;
const assertPropsEqual = props => obj => props.map(el => {
  const value = obj[el];
  typeof obj === 'object'
    ? assertEqual(JSON.stringify(value))(JSON.stringify(eval(el)))
    : assertEqual(value)(eval(el))
});

export default _ => {
  assertPropsEqual(['scheme', 'username', 'password', 'host', 'port', 'folder', 'fileName', 'fileTitle', 'fileExt', 'query', 'fragment'])
    (parser(`${scheme}://${username}:${password}@${host}:${port}/${folder}/${fileTitle}.${fileExt}?name=${query.name}&age=${query.age}#${fragment}`));
  assertPropsEqual(['username', 'password', 'host', 'port', 'folder', 'fileName', 'fileTitle', 'fileExt', 'query', 'fragment'])
    (parser(`${username}:${password}@${host}:${port}/${folder}/${fileTitle}.${fileExt}?name=${query.name}&age=${query.age}#${fragment}`));
  assertPropsEqual(['host', 'port', 'folder', 'fileName', 'fileTitle', 'fileExt', 'query', 'fragment'])
    (parser(`${host}:${port}/${folder}/${fileTitle}.${fileExt}?name=${query.name}&age=${query.age}#${fragment}`));
  assertPropsEqual(['folder', 'fileName', 'fileTitle', 'fileExt', 'query', 'fragment'])
    (parser(`/${folder}/${fileTitle}.${fileExt}?name=${query.name}&age=${query.age}#${fragment}`));
  assertPropsEqual(['fileName', 'fileTitle', 'fileExt', 'query', 'fragment'])
    (parser(`${fileTitle}.${fileExt}?name=${query.name}&age=${query.age}#${fragment}`));
  assertPropsEqual(['query', 'fragment'])
    (parser(`name=${query.name}&age=${query.age}#${fragment}`));

  assertPropsEqual(['scheme', 'username', 'password', 'host', 'port', 'folder', 'fileName', 'fileTitle', 'fileExt', 'query'])
    (parser(`${scheme}://${username}:${password}@${host}:${port}/${folder}/${fileTitle}.${fileExt}?name=${query.name}&age=${query.age}`));
  assertPropsEqual(['scheme', 'username', 'password', 'host', 'port', 'folder', 'fileName', 'fileTitle', 'fileExt'])
    (parser(`${scheme}://${username}:${password}@${host}:${port}/${folder}/${fileTitle}.${fileExt}`));
  assertPropsEqual(['scheme', 'username', 'password', 'host', 'port', 'folder'])
    (parser(`${scheme}://${username}:${password}@${host}:${port}/${folder}`));
  assertPropsEqual(['scheme', 'username', 'password', 'host', 'port'])
    (parser(`${scheme}://${username}:${password}@${host}:${port}`));
  assertPropsEqual(['scheme', 'username', 'password', 'host'])
    (parser(`${scheme}://${username}:${password}@${host}`));
  assertPropsEqual(['scheme', 'host'])
    (parser(`${scheme}://${host}`));
  assertPropsEqual(['host'])
    (parser(`${host}`));

  assertPropsEqual(['scheme', 'host', 'folder', 'fileName', 'fileTitle', 'fileExt', 'query'])
    (parser(`${scheme}://${host}/${folder}/${fileTitle}.${fileExt}?name=${query.name}&age=${query.age}`));
  assertPropsEqual(['scheme', 'host', 'fileName', 'fileTitle', 'fileExt', 'query'])
    (parser(`${scheme}://${host}/${fileTitle}.${fileExt}?name=${query.name}&age=${query.age}`));
  assertPropsEqual(['host', 'fileName', 'fileTitle', 'fileExt', 'query'])
    (parser(`${host}/${fileTitle}.${fileExt}?name=${query.name}&age=${query.age}`));
  assertPropsEqual(['scheme', 'host', 'fileName', 'fileTitle', 'fileExt'])
    (parser(`${scheme}://${host}/${fileTitle}.${fileExt}`));
  assertPropsEqual(['host', 'fileName', 'fileTitle', 'fileExt'])
    (parser(`${host}/${fileTitle}.${fileExt}`));
  assertPropsEqual([])
    (parser());
}