const apiUri = () => {
  const url = process.env.REACT_APP_SERVER_API_URL || '';
  const path = process.env.REACT_APP_SERVER_API_PATH || '';
  const version = process.env.REACT_APP_SERVER_API_VERSION || '';
  return `${url}${path}${version}`;
};

export default {
  apiUrl: () => process.env.REACT_APP_SERVER_API_URL || '',
  apiPath: () => process.env.REACT_APP_SERVER_API_PATH || '',
  apiVersion: () => process.env.REACT_APP_SERVER_API_VERSION || '',
  apiUri,
  env: () => process.env.NODE_ENV,
  mapsApiKey: () => process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  googleMapsURL: () =>
    `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
  isProdEnv: () => process.env.NODE_ENV === 'production',
  sentryDns: () => process.env.REACT_APP_SENTRY_DNS,
  stagingUrl: () => 'https://painel-staging.wattpanel.com/',
  url: () => process.env.PUBLIC_URL,
};
