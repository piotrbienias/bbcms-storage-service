/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

'use strict';

require('module-alias/register');

import 'reflect-metadata';

import * as dotenv from 'dotenv';

dotenv.config();

import './config/models';

import express from 'express';
import { Container } from 'typedi';

import DirectoryRouter from '@storage/routers/directory';
import FileRouter from '@storage/routers/file';


const directoryRouter   = Container.get(DirectoryRouter);
const fileRouter        = Container.get(FileRouter);


const app = express();

// Global middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/storage/directories',         directoryRouter.getRouter());
app.use('/storage/files',               fileRouter.getRouter());


app.listen(process.env.PORT, () => {
    console.log(`Storage service listening on port ${process.env.PORT}`);
});