/* eslint-disable unicorn/no-null */
// undefined avec Multer ça fonctionne pas d'ou le disable unicorn/no-null
import multer from 'multer';
import crypto from 'node:crypto';

const MIME_TYPES: Record<string, string> = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    const uniqueSuffix = crypto.randomUUID();
    const uniqueName = `${uniqueSuffix}_${name}.${extension}`;
    callback(null, uniqueName);
  },
});
const multerConfig = multer({ storage: storage }).single('photo');
export default multerConfig;
