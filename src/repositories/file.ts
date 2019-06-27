/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

'use strict';

import * as fs from 'fs';
import * as path from 'path';
import { Service, Token } from 'typedi';

import { File } from '@storage/models/file';
import { File as FileTypes } from '@storage/utils/types';
import FileRepositoryInterface from '@storage/interfaces/file';
import { createYearDirectory, getFilename } from '@storage/utils/functions';


export const FileRepositoryImpl = new Token<FileRepositoryInterface>();


@Service(FileRepositoryImpl)
class FileRepository implements FileRepositoryInterface {

    model: FileTypes.Static;

    constructor() {
        this.model = File;
    }

    async createFile(file: FileTypes.MulterFile, data: FileTypes.RequestCreateData): Promise<File> {
        try {
            // file upload directory
            let newFileDirectory = path.resolve(process.cwd(), 'uploads', new Date().getFullYear().toString());
            // check if parent year directory exists
            if ( ! fs.existsSync(newFileDirectory) ) {
                // if it doesn't, create it
                createYearDirectory(new Date().getFullYear().toString());
            }

            // determine new file filename and path
            let filename: string = getFilename(data.name || file.originalname);
            let newFilePath = path.resolve(newFileDirectory, filename);

            // copy file from /tmp to target directory
            fs.copyFileSync(file.path, newFilePath);

            // remove file saved in /tmp directory
            fs.unlinkSync(file.path);


            let newFileData: FileTypes.CreateData = {
                url: `/uploads/${new Date().getFullYear().toString()}/${filename}`,
                name: data.name || file.originalname,
                size: file.size,
                mimeType: file.mimetype,
                directory: data.directory
            };

            // create sequelize File model instance and return it
            return this.model.create(newFileData);
        } catch (e) {
            throw new Error('Error while creating new file');
        }
    }
}

export default FileRepository;