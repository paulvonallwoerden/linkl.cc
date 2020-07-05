import * as Router from '@koa/router';
import { Context, Next } from 'koa';

import { UrlService } from './url.service';

export class RedirectController extends Router {
    public constructor(private readonly urlService: UrlService) {
        super({});

        this.forwardUrl = this.forwardUrl.bind(this);
        this.get('/:alias', this.forwardUrl);
    }

    private async forwardUrl(context: Context, next: Next): Promise<void> {
        const { alias } = context.params;
        if (typeof alias !== 'string') {
            return next();
        }

        const url = await this.urlService.getByAlias(alias);
        if (url === undefined || url === null) {
            return next();
        }

        context.redirect(url.url);
        await this.urlService.incrementViewCounter(alias);
    }
}
