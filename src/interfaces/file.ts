/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

'use strict';


import { File } from '@storage/models/file';
import { File as FileTypes } from '@storage/utils/types';


export default interface FileRepositoryInterface {
    model: FileTypes.Static;

    /**
     * Create new file instance.
     */
    createFile(file: FileTypes.MulterFile, data: FileTypes.RequestCreateData): Promise<File>;
}