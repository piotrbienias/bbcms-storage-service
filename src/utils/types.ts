/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

'use strict';

import { BuildOptions, Model, ModelCtor } from "sequelize";
import { Directory } from '@storage/models/directory';
import { File } from '@storage/models/file';


/**
 * Directory model related types
 */
export namespace Directory {

    /**
     * Serialized representation of directory model instance
     */
    export type Serialized = {
        id: number;
        name: string;
        createdAt: Date;
        isDeleted: boolean;
        parent?: number | Serialized;
        children?: Serialized[];
    }


    /**
     * Static representation of Directory model
     */
    export type Static = typeof Model & {
        new(values?: object, options?: BuildOptions): Directory;
        associate(models: { [key: string]: ModelCtor<Model> }): void;
    }

    /**
     * Create new directory data
     */
    export type CreateData = {
        name: string;
        parent?: number;
    }

    /**
     * Update directory data
     */
    export type UpdateData = Partial<CreateData>;
}


export namespace File {

    /**
     * Serialized representation of file model instance
     */
    export type Serialized = {
        id: number;
        url: string;
        name: string;
        directory: number | Directory.Serialized;
        size: number;
        mimeType: string;
        isDeleted: boolean;
    }

    /**
     * Static representation of File model
     */
    export type Static = typeof Model & {
        new(values?: object, options?: BuildOptions): File;
        associate(models: { [key: string]: ModelCtor<Model> }): void;
    }

    /**
     * Create new file data
     */
    export type CreateData = {
        url: string;
        name: string;
        directory?: number;
        size: number;
        mimeType: string;
    }

    export type RequestCreateData = Partial<Pick<CreateData, 'name' | 'directory'>>;

    /**
     * Update file data - only name of the file can be updated.
     */
    export type UpdateData = {
        name?: string;
    }

    /**
     * File type from Multer package
     */
    export type MulterFile = {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        size: number;
        destination: string;
        filename: string;
        path: string;
        buffer: Buffer;
    }
}