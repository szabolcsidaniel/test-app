import { Reflector } from '@nestjs/core';
import {BadRequestException, INestApplication, ValidationError, ValidationPipe} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../src/app.module';
import * as dotenv from "dotenv";

export class TestEnvironment {
    private app: INestApplication;
    private moduleRef: TestingModule;

    async prepareEnvironment() {

        dotenv.config();

        if (!this.moduleRef) {
            this.moduleRef = await Test.createTestingModule({
                imports: [AppModule],
                providers: [],
            }).compile();
        }

        if (!this.app) {
            this.app = this.moduleRef.createNestApplication();

            const reflector = this.app.get(Reflector);
            this.app.useGlobalPipes(new ValidationPipe({
                exceptionFactory: (validationErrors: ValidationError[] = []) => {
                    return new BadRequestException(
                        validationErrors.map((error) => ({
                            field: error.property,
                            error: Object.values(error.constraints).join(', '),
                        })),
                    );
                },
            }),);

            await this.app.init();
        }
    }

    public get App(): INestApplication {
        if (!this.app) throw new Error('App not initialized');

        return this.app;
    }
}

export const test = new TestEnvironment();
