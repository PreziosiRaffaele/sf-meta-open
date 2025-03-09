import { Metadata } from '../Metadata.js';

export class ValidationRule extends Metadata {
  public async getUrl(): Promise<string> {
    const records = await this.conn.tooling
      .sobject('ValidationRule')
      .find({ ValidationName: this.metadataApiName })
      .execute();

    if (records.length === 0 || records[0].Id === undefined) {
      throw new Error(`ValidationRule not found for ${this.metadataApiName}`);
    }

    return `lightning/setup/ObjectManager/${records[0].EntityDefinitionId}/ValidationRules/${records[0].Id}/view`;
  }
}
