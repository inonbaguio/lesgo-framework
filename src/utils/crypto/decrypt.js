import crypto from 'crypto';
import cryptoConfig from 'config/crypto'; // eslint-disable-line import/no-unresolved
import LesgoException from '../../exceptions/LesgoException';
import isEmpty from '../isEmpty';

const { algorithm, secretKey } = cryptoConfig;

export default text => {
  if (isEmpty(text)) {
    throw new LesgoException(
      'Empty parameter supplied on decryp',
      'CRYPTO_DECRYPT_EMPTY_PARAMETER'
    );
  }

  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);

  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
};