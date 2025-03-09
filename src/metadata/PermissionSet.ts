import { Metadata } from '../Metadata.js';

export class PermissionSet extends Metadata {
  public async getUrl(): Promise<string> {
    const records = await this.conn.tooling.sobject('PermissionSet').find({ Name: this.metadataApiName }).execute();

    if (records.length === 0 || records[0].Id === undefined) {
      throw new Error(`PermissionSet not found for ${this.metadataApiName}`);
    }

    return `lightning/setup/PermSets/page?address=%2F${records[0].Id}`;
  }
}
