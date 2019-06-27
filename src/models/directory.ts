/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

'use strict';

import { Model, DataTypes, ModelCtor } from 'sequelize';
import { Directory as DirectoryTypes } from '@storage/utils/types';



/**
 * Directory sequelize model representation
 */
export class Directory extends Model {
    public id!: number;
    public name!: string;
    public parent!: number;

    public readonly createdAt!: Date;
    public readonly deletedAt!: Date;

    public readonly Parent: Directory;

    /**
     * Serialize Directory model instance
     */
    public serialize(): DirectoryTypes.Serialized {
        let directory: DirectoryTypes.Serialized =  {
            id: this.get('id'),
            name: this.get('name'),
            createdAt: this.get('createdAt'),
            isDeleted: !!this.get('deletedAt')
        };

        directory.parent = this.Parent ? this.Parent.serialize() : this.get('parent');

        return directory;
    }

    /**
     * Associate Directory model with other models:
     * - relation to itself representing parent directory
     *
     * @param models
     */
    static associate(models: { [key: string]: ModelCtor<Model> }): void {
        Directory.hasOne(models.Directory, { as: 'Parent', foreignKey: 'parentId' })
    }
}


export default sequelize => {

    Directory.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        parent: {
            field: 'parentId',
            type: DataTypes.INTEGER,
            references: {
                model: sequelize.models.Directory,
                key: 'id'
            },
            allowNull: true,
            validate: {
                doesExist: async (id: number) => {
                    let directory = await Directory.findByPk(id);
                    if ( ! directory ) throw new Error('Directory does not exist');
                }
            }
        }
    }, {
        sequelize,
        tableName: 'bb_directories',
        timestamps: true,
        paranoid: true,
        scopes: {
            withParent: (): object => {
                return {
                    include: sequelize.models.Directory,
                    as: 'Parent'
                }
            }
        }
    });

    return Directory;
};