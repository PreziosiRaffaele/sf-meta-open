import { Metadata } from '../Metadata.js';

export class ExternalService extends Metadata {
  public async getUrl(): Promise<string> {
    const records = await this.conn.tooling
      .sobject('ExternalServiceRegistration')
      .find({ DeveloperName: this.metadataApiName })
      .execute();

    if (records.length === 0 || records[0].Id === undefined) {
      throw new Error(`External Service not found for ${this.metadataApiName}`);
    }

    return `lightning/setup/ExternalServices/${records[0].Id}/view`;
  }
}
