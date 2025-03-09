import { Metadata } from '../Metadata.js';

export class ApexClass extends Metadata {
  public async getUrl(): Promise<string> {
    const records = await this.conn.tooling.sobject('ApexClass').find({ Name: this.metadataApiName }).execute();

    if (records.length === 0 || records[0].Id === undefined) {
      throw new Error(`ApexClass not found for ${this.metadataApiName}`);
    }

    return `lightning/setup/ApexClasses/page?address=%2F${records[0].Id}`;
  }
}
