import { Metadata } from '../Metadata.js';

export class FlexiPage extends Metadata {
  public async getUrl(): Promise<string> {
    const records = await this.conn.tooling
      .sobject('FlexiPage')
      .find({ DeveloperName: this.metadataApiName })
      .execute();

    if (records.length === 0 || records[0].Id === undefined) {
      throw new Error(`FlexiPage not found for ${this.metadataApiName}`);
    }

    return `visualEditor/appBuilder.app?id=${records[0].Id}`;
  }
}
