import crypto from 'crypto';
import config from '../config/env';
import { BadRequest } from '../error';

class Encrypter {
  public readonly algorithm: string;
  private readonly key: any;
  constructor(encryptionKey: string) {
    this.algorithm = 'aes-256-cbc';
    this.key = crypto.scryptSync(encryptionKey, 'salt', 32);
  }

  encrypt(plainText: string) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    const encrypted = cipher.update(plainText, 'utf8', 'hex');
    return [encrypted + cipher.final('hex'), Buffer.from(iv).toString('hex')].join('|');
  }

  dencrypt(encryptedText: string) {
    const [encrypted, iv] = encryptedText.split('|');
    if (!iv) throw new Error('IV not found');
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, Buffer.from(iv, 'hex'));
    return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
  }

  createHmac(algorithm: string, password: string, plaintext: string) {
    //const insertSpace = plaintext.replace(/("[^"]+"[:,])/g, '$1 ');
    if (!algorithm) throw new BadRequest('Hmac algorith is required');
    const hmac = crypto.createHmac(algorithm, password);
    hmac.update(plaintext);
    return hmac.digest('hex');
  }
}

export default new Encrypter(config.ENCRYPTION_PASSWORD as string);
