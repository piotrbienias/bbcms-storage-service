/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

'use strict';

import { Service, Inject } from 'typedi';
import { Request, Response } from 'express';
import BaseRouter from '@utils/lib/api/baseRouter';
import ApiResponse from '@utils/lib/api/response';

import DirectoryRepositoryInterface from '@storage/interfaces/directory';
import { DirectoryRepositoryImpl } from '@storage/repositories/directory';
import { Directory } from "@storage/models/directory";



@Service()
class DirectoryRouter extends BaseRouter {

    @Inject(DirectoryRepositoryImpl)
    repository: DirectoryRepositoryInterface;

    constructor() {
        super();

        this.router.get('/root',        this.getRootDirectories);
    }

    getRootDirectories = async (req: Request, res: Response): Promise<Response> => {
        let directories: Directory[] = await this.repository.getRootDirectories();
        let mappedDirectories = directories.map((directory: Directory) => {
            return directory.serialize();
        });

        return ApiResponse.data(res, mappedDirectories);
    }
}


export default DirectoryRouter;