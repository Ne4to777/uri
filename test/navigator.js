import navigator from './../src/'
const log = console.log;

const example = {
  "host": "www.example.com",
  "port": "123",
  "username": "username",
  "password": "password",
  "folder": "hello/world",
  "fileName": "there.html",
  "fileTitle": "there",
  "fileExt": "html",
  "scheme": "http",
  "fragment": "fragment",
  "query": {
    "name": "ferret",
    "age": "20"
  }
}


// const uriBuilder = new Uri(`http://username:password@www.example.com:123/hello/world/there.html`);

// log(uriBuilder.query);
// uriBuilder.setQueryKeys({
//   c: 'hello',
//   d: 'hi'
// });
// log(uriBuilder.query);

// log(uriBuilder + '');
export default _ => {
  const n = navigator({
    onstatechange: _ => console.log(1)
  });

  console.log(n);

  // n.pushQueryKey('b', 1)
  // n.folder = 'a';
  // n.fileName = 'a.html';
  // n.push()

  // n.pushPath('a/a.html')
  // n.setRelativeURL('a.html?b=1#2');
  // console.log(n.getRelativeURL());
  // n.pushURL('a.html?b=1#2')


}