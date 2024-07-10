import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { FILE_UPLOAD_ERRORS } from '../constants/common.js'
import filenamify from 'filenamify'

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    fs.mkdir(path.join(path.resolve(), '/tmp'), (err) => {
      if (err) {
        console.log(err)
      }
      cb(null, path.join(path.resolve(), '/tmp'))
    })
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + '-' + filenamify(file.originalname))
  },
})

//Single img upload
const uploadImgMulter = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      // To accept the file pass `true`
      cb(null, true)
    } else {
      // To reject the file pass `false` or Error
      //@ts-expect-error wrong lib typo
      cb(FILE_UPLOAD_ERRORS.WRONG_TYPE, false)
    }
  },
})

const uploadImgSingle = uploadImgMulter.single('img')

export const uploadImg = (req: Request, res: Response, next: NextFunction) => {
  uploadImgSingle(req, res, (error) => {
    if (!error) {
      next()
    } else {
      console.log(error)
      switch (error) {
        case FILE_UPLOAD_ERRORS.WRONG_TYPE:
          res.status(StatusCodes.BAD_REQUEST).json({ error })
          break
        default:
          console.error(FILE_UPLOAD_ERRORS.UNKNOWN, error)
          res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: FILE_UPLOAD_ERRORS.UNKNOWN })
      }
    }
  })
}
