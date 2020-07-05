import { nanoid } from 'nanoid';

import { UrlRepository } from './url.repository';
import { UrlResult } from './url.result';

export class UrlService {
    public constructor(private readonly urlRepository: UrlRepository) {}

    public async create(values: { alias: string; url: string; createdByAddress: string }): Promise<UrlResult> {
        await this.urlRepository.insert(values);

        return { alias: values.alias, url: values.url };
    }

    public async createWithRandomAlias(url: { url: string; createdByAddress: string }): Promise<UrlResult> {
        return this.create({ ...url, alias: nanoid() });
    }

    public async incrementViewCounter(alias: string): Promise<void> {
        await this.urlRepository.increment({ alias }, 'views', 1);
    }

    public async getByAlias(alias: string): Promise<UrlResult> {
        return await this.urlRepository.findOne({ alias });
    }
}
