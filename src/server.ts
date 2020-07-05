import * as cors from '@koa/cors';
import { config as loadDotEnvFile } from 'dotenv';
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as koaHelmet from 'koa-helmet';
import * as sslify from 'koa-sslify';
import * as staticFiles from 'koa-static';
import { join as pathJoin } from 'path';
import { createConnection } from 'typeorm';
import { createLogger, format as loggerFormat, transports as loggerTransports } from 'winston';

import { loadConfig } from './config';
import { RedirectController } from './redirect.controller';
import { UrlController } from './url.controller';
import { UrlEntity } from './url.entity';
import { UrlService } from './url.service';

async function bootstrap(): Promise<void> {
    loadDotEnvFile({ path: pathJoin(__dirname, '../../.env') });
    const config = loadConfig();
    const logger = createLogger({
        format: loggerFormat.combine(loggerFormat.json()),
        transports: new loggerTransports.Console(),
    });

    const connection = await createConnection({
        type: 'mysql',
        entities: [UrlEntity],
        synchronize: true,
        host: config.MYSQL_HOST,
        port: config.MYSQL_PORT,
        database: config.MYSQL_DATABASE,
        username: config.MYSQL_USER,
        password: config.MYSQL_PASSWORD,
        extra: {
            socketPath: config.MYSQL_SOCKETPATH,
        },
    });
    const urlRepository = connection.getRepository(UrlEntity);
    const urlService = new UrlService(urlRepository);

    const app = new Koa();
    app.use(bodyParser({ enableTypes: ['json'], jsonLimit: '10kb' }));
    app.use(sslify.default({ resolver: sslify.xForwardedProtoResolver }));
    app.use(cors());
    app.use(koaHelmet());
    app.use(new UrlController(urlService).routes());
    app.use(new RedirectController(urlService).routes());
    app.use(staticFiles(pathJoin(__dirname, '../public/'), { extensions: ['js', 'html'] }));
    app.listen(config.PORT, () => {
        logger.info(`Server successfully started on port ${config.PORT}.`);
    });
}

bootstrap();
