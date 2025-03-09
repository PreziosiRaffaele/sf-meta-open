import { Metadata } from '../Metadata.js';

export class ApprovalProcess extends Metadata {
  public async getUrl(): Promise<string> {
    const res = await this.conn.query(
      `SELECT Id FROM ProcessDefinition WHERE DeveloperName = '${
        this.metadataApiName.split('.')[1]
      }' AND Type = 'Approval'`
    );

    if (res.records.length === 0 || res.records[0].Id === undefined) {
      throw new Error(`Approval process not found for ${this.metadataApiName}`);
    }

    return `lightning/setup/ApprovalProcesses/page?address=%2F${res.records[0].Id}`;
  }
}
