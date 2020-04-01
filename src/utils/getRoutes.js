import enRoutes from './routes/en-US.json';
import frRoutes from './routes/fr-FR.json';

/**
 * Get Json Routes
 */
export function getRoutes(language) {
  let routes;

  switch (language) {
    case 'en-US':
      routes = enRoutes;
      break;
    case 'fr-FR':
      routes = frRoutes;
      break;
    default:
      routes = enRoutes;
      break;
  }

  return routes;
}
