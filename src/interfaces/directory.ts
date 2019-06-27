/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

'use strict';

import { Directory } from '@storage/models/directory';
import { Directory as DirectoryTypes } from '@storage/utils/types';


export default interface DirectoryRepositoryInterface {
    model: DirectoryTypes.Static;

    /**
     * Create new directory.
     *
     * @param data
     */
    createDirectory(data: DirectoryTypes.CreateData): Promise<Directory>;

    /**
     * Update existing directory.
     *
     * @param directory
     * @param data
     */
    updateDirectory(directory: Directory, data: DirectoryTypes.UpdateData): Promise<Directory>;

    /**
     * Delete single directory.
     *
     * @param directory
     */
    deleteDirectory(directory: Directory): Promise<void>;

    /**
     * Restore single directory
     *
     * @param directory
     */
    restoreDirectory(directory: Directory): Promise<void>;

    /**
     * Return root level directories (those with parent = NULL)
     */
    getRootDirectories(): Promise<Directory[]>;

    /**
     * Return child directories of given directory.
     *
     * @param id
     */
    getChildDirectories(id: number): Promise<Directory[]>;

    /**
     * Return directory with it's children directories included.
     * @param id
     */
    getDirectoryWithChildren(id: number): Promise<DirectoryTypes.Serialized>;
}