import { Metadata } from '../Metadata.js';

export class GlobalValueSet extends Metadata {
  public async getUrl(): Promise<string> {
    const records = await this.conn.tooling
      .sobject('GlobalValueSet')
      .find({ DeveloperName: this.metadataApiName })
      .execute();

    if (records.length === 0 || records[0].Id === undefined) {
      throw new Error(`GlobalValueSet not found for ${this.metadataApiName}`);
    }
    return `lightning/setup/Picklists/page?address=%2F${records[0].Id}`;
  }
}
