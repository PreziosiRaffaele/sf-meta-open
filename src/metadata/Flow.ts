import { Metadata } from '../Metadata.js';

export class Flow extends Metadata {
  public async getUrl(): Promise<string> {
    const records = await this.conn.tooling
      .sobject('FlowDefinition')
      .find({ DeveloperName: this.metadataApiName })
      .execute();

    if (records.length === 0 || records[0].Id === undefined) {
      throw new Error(`Flow not found for ${this.metadataApiName}`);
    }

    return `builder_platform_interaction/flowBuilder.app?flowDefId=${records[0].Id}`;
  }
}
