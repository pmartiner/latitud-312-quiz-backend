import pgpInit from 'pg-promise';
import dotenv from 'dotenv';

// .env
dotenv.config();

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const isProduction = process.env.NODE_ENV === 'production';
const pgp = pgpInit();
export const db = pgp(isProduction ? process.env.DATABASE_URL as string : connectionString);