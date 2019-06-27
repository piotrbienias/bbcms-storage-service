/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

'use strict';

import { Model, DataTypes, ModelCtor } from 'sequelize';
import { Directory } from '@storage/models/directory';
import { File as FileTypes } from '@storage/utils/types';


export class File extends Model {
    public id!: number;
    public url!: string;
    public name!: string;
    public directory!: number;
    public size!: number;
    public mimeType!: string;

    public readonly createdAt!: Date;
    public readonly deletedAt!: Date;

    public readonly Directory!: Directory;

    public serialize(): Partial<FileTypes.Serialized> {
        let keys = ['id', 'url', 'name', 'size', 'mimeType'],
            user: Partial<FileTypes.Serialized> = {};

        keys.forEach((key: string) => {
            user[key] = this.get(key);
        });

        user.directory = this.Directory ? this.Directory.serialize() : this.get('directory');

        user.isDeleted = !!this.get('deletedAt');

        return user;
    }

    static associate(models: { [key: string]: ModelCtor<Model> }): void {
        File.belongsTo(models.Directory, { foreignKey: 'directory' });
    }
}


export default sequelize => {

    File.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            comment: 'URL pointing to the file on the server'
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        directory: {
            field: 'directoryId',
            type: DataTypes.INTEGER,
            references: {
                model: sequelize.models.Directory,
                key: 'id'
            },
            allowNull: true
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        mimeType: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'bb_files',
        timestamps: true,
        paranoid: true
    });

    return File;
}