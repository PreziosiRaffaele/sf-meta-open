import { Metadata } from '../Metadata.js';

export class ApexTrigger extends Metadata {
  public async getUrl(): Promise<string> {
    const records = await this.conn.tooling.sobject('ApexTrigger').find({ Name: this.metadataApiName }).execute();

    if (records.length === 0 || records[0].Id === undefined) {
      throw new Error(`ApexTrigger not found for ${this.metadataApiName}`);
    }

    return `lightning/setup/ApexTriggers/page?address=%2F${records[0].Id}`;
  }
}
