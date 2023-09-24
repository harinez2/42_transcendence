import { Injectable } from '@nestjs/common';
import { randomBytes, createCipheriv, createDecipheriv, scrypt } from 'crypto';
import { AUTH2FA_SECRET } from 'config';

@Injectable()
export class CryptoService {
  private readonly algorithm = 'aes-256-gcm';
  private readonly password = AUTH2FA_SECRET;
  private readonly salt = 'salt';
  private readonly keyLength = 32;

  async encrypt(text: string): Promise<string> {
    const key = await this.getKey();

    const iv = randomBytes(16);
    const cipher = createCipheriv(this.algorithm, key, iv);
    const encrypted = Buffer.concat([
      cipher.update(text, 'utf8'),
      cipher.final(),
    ]);
    const authTag = cipher.getAuthTag();

    return this.toUrlSafeBase64(Buffer.concat([iv, authTag, encrypted]));
  }

  async decrypt(text: string): Promise<string> {
    const key = await this.getKey();

    const data = this.fromUrlSafeBase64(text);
    const iv = data.subarray(0, 16);
    const authTag = data.subarray(16, 32);
    const encrypted = data.subarray(32);

    const decipher = createDecipheriv(this.algorithm, key, iv);
    decipher.setAuthTag(authTag);

    return decipher.update(encrypted).toString('utf8') + decipher.final('utf8');
  }

  private getKey(): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      scrypt(this.password, this.salt, this.keyLength, (err, derivedKey) => {
        if (err) reject(err);
        resolve(derivedKey);
      });
    });
  }

  private toUrlSafeBase64(data: Buffer): string {
    return data
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  private fromUrlSafeBase64(data: string): Buffer {
    data += '=='.slice(2 - (data.length & 3));
    return Buffer.from(data.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
  }
}
