/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import * as fs from 'fs';
import * as path from 'path';
import { v1 } from 'uuid';


/**
 * Create year directory in /uploads folder.
 *
 * @param year
 */
export const createYearDirectory = (year: string): void => {
    let directoryPath: string = path.resolve(process.cwd(), 'uploads', year);
    fs.mkdirSync(directoryPath);
};


/**
 * Generate file name from filename and UUID based on current timestamp.
 *
 * @param filename
 */
export const getFilename = (filename: string): string => {
    let filenameParts: string[] = filename.split('.');
    // result is: <name>_<uuid>.<extension> e.g. document_<hash>.pdf
    return `${filenameParts[0]}_${v1()}.${filenameParts[1]}`;
};