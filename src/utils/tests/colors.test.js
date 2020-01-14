import { getLogo } from '../colors';

import amber from '../../assets/img/logo/amber.png';
import base from '../../assets/img/logo/base.png';
import blue from '../../assets/img/logo/blue.png';
import brown from '../../assets/img/logo/brown.png';
import cyan from '../../assets/img/logo/cyan.png';
import deepOrange from '../../assets/img/logo/deep-orange.png';
import deepPurple from '../../assets/img/logo/deep-purple.png';
import green from '../../assets/img/logo/green.png';
import indigo from '../../assets/img/logo/indigo.png';
import lightBlue from '../../assets/img/logo/light-blue.png';
import lightGreen from '../../assets/img/logo/light-green.png';
import lime from '../../assets/img/logo/lime.png';
import orange from '../../assets/img/logo/orange.png';
import pink from '../../assets/img/logo/pink.png';
import purple from '../../assets/img/logo/purple.png';
import red from '../../assets/img/logo/red.png';
import teal from '../../assets/img/logo/teal.png';
import yellow from '../../assets/img/logo/yellow.png';

describe('color Test', () => {
  it('should return amber logo', () => {
    expect(getLogo('amber')).toBe(amber);
  });
  it('should return blue logo', () => {
    expect(getLogo('blue')).toBe(blue);
  });
  it('should return brown logo', () => {
    expect(getLogo('brown')).toBe(brown);
  });
  it('should return cyan logo', () => {
    expect(getLogo('cyan')).toBe(cyan);
  });
  it('should return deep-orange logo', () => {
    expect(getLogo('deep-orange')).toBe(deepOrange);
  });
  it('should return deep-purple logo', () => {
    expect(getLogo('deep-purple')).toBe(deepPurple);
  });
  it('should return green logo', () => {
    expect(getLogo('green')).toBe(green);
  });
  it('should return indigo logo', () => {
    expect(getLogo('indigo')).toBe(indigo);
  });
  it('should return light-blue logo', () => {
    expect(getLogo('light-blue')).toBe(lightBlue);
  });
  it('should return light-green logo', () => {
    expect(getLogo('light-green')).toBe(lightGreen);
  });
  it('should return lime logo', () => {
    expect(getLogo('lime')).toBe(lime);
  });
  it('should return orange logo', () => {
    expect(getLogo('orange')).toBe(orange);
  });
  it('should return pink logo', () => {
    expect(getLogo('pink')).toBe(pink);
  });
  it('should return purple logo', () => {
    expect(getLogo('purple')).toBe(purple);
  });
  it('should return red logo', () => {
    expect(getLogo('red')).toBe(red);
  });
  it('should return teal logo', () => {
    expect(getLogo('teal')).toBe(teal);
  });
  it('should return yellow logo', () => {
    expect(getLogo('yellow')).toBe(yellow);
  });
  it('should return default logo', () => {
    expect(getLogo('unknow')).toBe(base);
  });
});
