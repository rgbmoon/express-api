const POSTGRES_HOST = process.env.POSTGRES_HOST
const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE
const POSTGRES_USER = process.env.POSTGRES_USER
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD

export const POSTGRES_URI = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:5432/${POSTGRES_DATABASE}?sslmode=require`
