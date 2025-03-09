import { getObjectId } from '../metadataUtils.js';
import { Metadata } from '../Metadata.js';

export class QuickAction extends Metadata {
  public async getUrl(): Promise<string> {
    const splitObjectNameLayoutName = this.metadataApiName.split('.');
    const objectName = splitObjectNameLayoutName[0];
    const quickActionName = splitObjectNameLayoutName[1];

    const objIdPromise = getObjectId(this.conn, objectName);
    const quickActionPromise = this.conn.tooling
      .sobject('QuickActionDefinition')
      .find({ DeveloperName: quickActionName })
      .execute();

    const [objectId, quickActionRecords] = await Promise.all([objIdPromise, quickActionPromise]);

    if (quickActionRecords.length === 0 || quickActionRecords[0].Id === undefined) {
      throw new Error(`QuickAction not found for ${quickActionName}`);
    }

    return `lightning/setup/ObjectManager/${objectId}/ButtonsLinksActions/${quickActionRecords[0].Id}/view`;
  }
}
