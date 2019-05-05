import stringifier from '../src/modules/uri/stringifier.js';
const parsed = {
  scheme: 'http',
  username: 'username',
  password: 'password',
  host: 'www.example.com',
  port: '123',
  folder: 'hello/world',
  fileName: 'there.html',
  fileTitle: 'there',
  fileExt: 'html',
  fragment: 'fragment',
  query: {
    name: 'ferret',
    age: '20'
  }
}
const assertEqual = x => y => x !== y ? console.error(`${x} is not equal ${y}`) : void 0;
export default _ => {

  assertEqual(`http://username:password@www.example.com:123/hello/world/there.html?name=ferret&age=20#fragment`)(stringifier(parsed))
  assertEqual(`//username:password@www.example.com:123/hello/world/there.html?name=ferret&age=20#fragment`)(stringifier(parsed, {
    relativeMode: 'scheme'
  }));
  assertEqual(`/hello/world/there.html?name=ferret&age=20#fragment`)(stringifier(parsed, {
    relativeMode: 'root'
  }));
  assertEqual(`there.html?name=ferret&age=20#fragment`)(stringifier(parsed, {
    relativeMode: 'path'
  }))
}