import { sign, verify, Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWTPAYLOAD } from '../types';
import config from '../config/env';
import { SERVER_MESSAGE } from '../constant';

function encryptPassword(data: any): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const salt = 10;
      if (!salt) throw new Error(SERVER_MESSAGE.SERVER_ERROR);
      bcrypt.genSalt(salt, function (err: any, salt) {
        if (err) return reject(err);
        bcrypt.hash(data, salt, function (err, hash) {
          // Store hash in your password DB.
          if (err) return reject(err);
          return resolve(hash);
        });
      });
    } catch (error) {
      reject(error);
    }
  });
}

function comparePassword(data: any, encrypteddata: string): Promise<boolean> {
  console.log('data', data, 'encrypted', encrypteddata);
  return new Promise((resolve, reject) => {
    try {
      bcrypt.compare(data, encrypteddata, (err: any, value: boolean) => {
        if (err) return reject(err);
        return resolve(value);
      });
    } catch (error) {
      reject(error);
    }
  });
}

function generateToken(payload: JWTPAYLOAD, expiresIn = 0): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      sign(
        payload,
        config.JWT_SECRET_KEY as Secret,
        { expiresIn: expiresIn > 0 ? expiresIn : config.JWT_EXPIRES_IN },
        (err, encoded) => {
          if (err) return reject(err);
          if (!encoded) return reject(new Error(SERVER_MESSAGE.SERVER_ERROR));
          return resolve(encoded);
        },
      );
    } catch (error) {
      reject(error);
    }
  });
}

function verifytoken(token: string): Promise<JWTPAYLOAD> {
  return new Promise((resolve, reject) => {
    try {
      verify(token, process.env.JWT_SECRET_KEY as Secret, (error: unknown, payload: unknown) => {
        if (error) return reject(error);
        if (payload) return resolve(payload as JWTPAYLOAD);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export { generateToken, verifytoken, encryptPassword, comparePassword };
