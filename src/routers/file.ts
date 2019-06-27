/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

'use strict';

import { Service, Inject } from 'typedi';
import { Request, Response } from 'express';
import multer from 'multer';
import BaseRouter from '@utils/lib/api/baseRouter';
import ApiResponse from '@utils/lib/api/response';

import FileRepositoryInterface from '@storage/repositories/file';
import { FileRepositoryImpl } from '@storage/repositories/file';
import { File as FileTypes } from '@storage/utils/types';
import { File } from '@storage/models/file';


@Service()
class FileRouter extends BaseRouter {

    @Inject(FileRepositoryImpl)
    repository: FileRepositoryInterface;

    upload: multer.Instance;

    constructor() {
        super();

        this.upload = multer({ dest: '/tmp/bbcms/uploads' });

        this.router.post('/',               this.createFile);
    }

    createFile = (req: Express.Request & Request, res: Response): Promise<Response> => {
        return this.upload.single('file')(req, res, err => {
            if ( err ) return ApiResponse.error(res, err);


            this.repository.createFile(<FileTypes.MulterFile>req.file, req.body).then((file: File) => {
                return ApiResponse.data(res, file.serialize(), 'File has been created');
            }).catch(e => {
                return ApiResponse.error(res, e);
            });
        });
    };
}


export default FileRouter;