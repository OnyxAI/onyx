import amber from '../assets/img/logo/amber.png';
import base from '../assets/img/logo/base.png';
import blue from '../assets/img/logo/blue.png';
import brown from '../assets/img/logo/brown.png';
import cyan from '../assets/img/logo/cyan.png';
import deepOrange from '../assets/img/logo/deep-orange.png';
import deepPurple from '../assets/img/logo/deep-purple.png';
import green from '../assets/img/logo/green.png';
import indigo from '../assets/img/logo/indigo.png';
import lightBlue from '../assets/img/logo/light-blue.png';
import lightGreen from '../assets/img/logo/light-green.png';
import lime from '../assets/img/logo/lime.png';
import orange from '../assets/img/logo/orange.png';
import pink from '../assets/img/logo/pink.png';
import purple from '../assets/img/logo/purple.png';
import red from '../assets/img/logo/red.png';
import teal from '../assets/img/logo/teal.png';
import yellow from '../assets/img/logo/yellow.png';

/**
 * Get Json Routes
 */
export function getLogo(color) {
  let logo;

  switch (color) {
    case 'amber':
      logo = amber;
      break;
    case 'blue':
      logo = blue;
      break;
    case 'brown':
      logo = brown;
      break;
    case 'cyan':
      logo = cyan;
      break;
    case 'deep-orange':
      logo = deepOrange;
      break;
    case 'deep-purple':
      logo = deepPurple;
      break;
    case 'green':
      logo = green;
      break;
    case 'indigo':
      logo = indigo;
      break;
    case 'light-blue':
      logo = lightBlue;
      break;
    case 'light-green':
      logo = lightGreen;
      break;
    case 'lime':
      logo = lime;
      break;
    case 'orange':
      logo = orange;
      break;
    case 'pink':
      logo = pink;
      break;
    case 'purple':
      logo = purple;
      break;
    case 'red':
      logo = red;
      break;
    case 'teal':
      logo = teal;
      break;
    case 'yellow':
      logo = yellow;
      break;
    default:
      logo = base;
      break;
  }

  return logo;
}
