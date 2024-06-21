import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET;
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;

export { JWT_SECRET, TMDB_API_KEY, TMDB_BASE_URL };
