const API_BASE_URL = 'http://localhost:3001/api/v1/';
const API_USERS_URL = API_BASE_URL + 'users';
const LOGIN_URL = API_BASE_URL + 'auth/login';
const REGISTER_URL = API_BASE_URL + 'auth/register';
const LOGOUT_URL = API_BASE_URL + 'auth/logout';
const REFRESH_TOKEN_URL = API_BASE_URL + 'auth/refresh';
const AUTHENTICATE_URL = API_BASE_URL + 'auth/authenticate';
const TOPICS_URL = API_BASE_URL + 'topics';
const ROOMS_URL = API_BASE_URL+ 'rooms';
const MESSAGES_URL = API_BASE_URL+ 'messages';
const RECENTS_URL = API_BASE_URL+'recents';
const BROWSE_TOPICS = API_BASE_URL + 'topics/browse-topic';
const IMAGE_URL = API_BASE_URL+ 'static/images/';
const UPLOAD_FILE = API_BASE_URL+ 'upload';
const PARTICIPANTS_URL = API_BASE_URL + 'participants';

export {
  API_BASE_URL, 
  API_USERS_URL, 
  LOGIN_URL, 
  REGISTER_URL, 
  LOGOUT_URL, 
  REFRESH_TOKEN_URL, 
  AUTHENTICATE_URL, 
  TOPICS_URL, 
  ROOMS_URL,
  MESSAGES_URL,
  BROWSE_TOPICS,
  RECENTS_URL,
  IMAGE_URL,
  UPLOAD_FILE,
  PARTICIPANTS_URL,
};