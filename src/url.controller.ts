import * as Joi from '@hapi/joi';
import * as Router from '@koa/router';
import { Context } from 'koa';

import { UrlResult } from './url.result';
import { UrlService } from './url.service';

const bodyValidationSchema = Joi.object({
    alias: Joi.string()
        .min(2)
        .max(32)
        .regex(/^[a-zA-Z0-9_-]*$/)
        .optional(),
    url: Joi.string().uri().max(512).required(),
});

export class UrlController extends Router {
    public constructor(private readonly urlService: UrlService) {
        super({ prefix: '/api' });

        this.createUrl = this.createUrl.bind(this);
        this.post('/url', this.createUrl);
    }

    private async createUrl(context: Context): Promise<UrlResult> {
        const { ip: remoteAddress, body } = context.request;
        try {
            await bodyValidationSchema.validateAsync(body);
        } catch (error) {
            if (!(error instanceof Joi.ValidationError)) {
                throw error;
            }

            context.status = 400;
            context.body = { error: 'validation', message: error.message };

            return;
        }

        try {
            if (body.alias === undefined) {
                const result = await this.urlService.createWithRandomAlias({
                    url: body.url,
                    createdByAddress: remoteAddress,
                });
                context.status = 200;
                context.body = result;

                return;
            }

            const result = await this.urlService.create({
                alias: body.alias,
                url: body.url,
                createdByAddress: remoteAddress,
            });
            context.status = 200;
            context.body = result;
        } catch (error) {
            context.status = 400;
            context.body = { error: 'alias_taken', message: 'The alias you tried to use, already exists.' };
        }
    }
}
