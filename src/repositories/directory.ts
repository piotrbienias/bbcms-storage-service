/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

'use strict';

import { Service, Token } from 'typedi';

import { Directory as DirectoryTypes } from '@storage/utils/types';
import { Directory } from '@storage/models/directory';
import DirectoryRepositoryInterface from '@storage/interfaces/directory';


export const DirectoryRepositoryImpl = new Token<DirectoryRepositoryInterface>();


@Service(DirectoryRepositoryImpl)
class DirectoryRepository implements DirectoryRepositoryInterface {

    model: DirectoryTypes.Static;

    constructor() {
        this.model = Directory;
    }

    getRootDirectories(): Promise<Directory[]> {
        return this.model.findAll({ where: { parent: null } });
    }

    getChildDirectories(id: number): Promise<Directory[]> {
        return this.model.findAll({ where: { parent: id } });
    }

    async createDirectory(data: DirectoryTypes.CreateData): Promise<Directory> {
        let directory: Directory;
        directory = await this.model.create(data);

        return directory;
    }

    async updateDirectory(directory: Directory, data: Partial<DirectoryTypes.CreateData>): Promise<Directory> {
        let updatedDirectory: Directory;
        updatedDirectory = await directory.update(data);

        return updatedDirectory;
    }

    deleteDirectory(directory: Directory): Promise<void> {
        return directory.destroy();
    }

    restoreDirectory(directory: Directory): Promise<void> {
        return directory.restore();
    }

    async getDirectoryWithChildren(id: number): Promise<DirectoryTypes.Serialized> {
        let directory: Directory = await this.model.findByPk(id);
        if ( ! directory ) throw new Error('Directory does not exist');

        let childDirectories: Directory[] = await this.getChildDirectories(directory.get('id'));

        let serializedData: DirectoryTypes.Serialized = directory.serialize();
        serializedData.children = childDirectories.map((childDirectory: Directory) => childDirectory.serialize());

        return serializedData;
    }
}


export default DirectoryRepository;