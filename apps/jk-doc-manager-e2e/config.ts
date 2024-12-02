require('dotenv').config();

export const config = {
  email: process.env.EMAIL as string,
  password: process.env.PASSWORD as string,
};
