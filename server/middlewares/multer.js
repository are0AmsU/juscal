import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'static')
  },
  filename: (req, file, cb) => {
    const filename = req.body.name + file.fieldname[0].toUpperCase() + file.fieldname.slice(1) + '.' + file.originalname.split('.')[1]
    cb(null, filename)
  }
})

export const upload = multer({ storage: storage })