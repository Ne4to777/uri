import parser from './parser';
import stringifier from './stringifier';
import navigator from './navigator';
export default _ => {
  parser();
  stringifier();
  navigator()
}