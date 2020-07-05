import * as env from 'env-var';

export function loadConfig(): {
    PORT: number;
    MYSQL_SOCKETPATH?: string;
    MYSQL_HOST?: string;
    MYSQL_PORT?: number;
    MYSQL_USER: string;
    MYSQL_PASSWORD: string;
    MYSQL_DATABASE: string;
} {
    return {
        PORT: env.get('APP_PORT').default(3000).asIntPositive(),
        MYSQL_SOCKETPATH: env.get('MYSQL_SOCKETPATH').asString(),
        MYSQL_HOST: env.get('MYSQL_HOST').asString(),
        MYSQL_PORT: env.get('MYSQL_PORT').asIntPositive(),
        MYSQL_USER: env.get('MYSQL_USER').asString(),
        MYSQL_PASSWORD: env.get('MYSQL_PASSWORD').asString(),
        MYSQL_DATABASE: env.get('MYSQL_DATABASE').asString(),
    };
}
