import { Metadata } from '../Metadata.js';

export class Profile extends Metadata {
  public async getUrl(): Promise<string> {
    const records = await this.conn.tooling.sobject('Profile').find({ Name: this.metadataApiName }).execute();

    if (records.length === 0 || records[0].Id === undefined) {
      throw new Error(`Profile not found for ${this.metadataApiName}`);
    }

    return `lightning/setup/EnhancedProfiles/page?address=%2F${records[0].Id}`;
  }
}
