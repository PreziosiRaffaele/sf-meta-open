import { Metadata } from '../Metadata.js';

export class PermissionSetGroup extends Metadata {
  public async getUrl(): Promise<string> {
    const records = await this.conn.tooling
      .sobject('PermissionSetGroup')
      .find({ DeveloperName: this.metadataApiName })
      .execute();

    if (records.length === 0 || records[0].Id === undefined) {
      throw new Error(`PermissionSetGroup not found for ${this.metadataApiName}`);
    }

    return `lightning/setup/PermSetGroups/page?address=%2F${records[0].Id}`;
  }
}
