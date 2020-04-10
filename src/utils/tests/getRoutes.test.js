import { getRoutes } from '../getRoutes';

import enRoutes from '../routes/en-US.json';
import frRoutes from '../routes/fr-FR.json';

describe('getRoutes', () => {
  it('should return the fr Route', () => {
    expect(getRoutes('fr-FR', [])).toBe(frRoutes);
  });
  it('should return the en Route', () => {
    expect(getRoutes('en-US', [])).toBe(enRoutes);
  });
  it('should return the default Route', () => {
    expect(getRoutes('unknow', [])).toBe(enRoutes);
  });
});
