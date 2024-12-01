import { base64decode } from 'nodejs-base64';

export default () => ({
  credentials: JSON.parse(base64decode(process.env.FIREBASE_SERVICE_ACCOUNT)),
});
