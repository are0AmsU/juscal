import multer from 'multer';
import * as uuid from 'uuid';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'static');
    },
    filename: (req, file, cb) => {
        const filename = uuid.v4() + '.' + file.originalname.split('.')[1];
        cb(null, filename);
    }
});
export const upload = multer({ storage: storage });
//# sourceMappingURL=multer.js.map