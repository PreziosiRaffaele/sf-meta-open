import { getObjectId } from '../metadataUtils.js';
import { Metadata } from '../Metadata.js';

export class PageLayout extends Metadata {
  public async getUrl(): Promise<string> {
    const splitObjectNameLayoutName = this.metadataApiName.split('-');
    const objectName = splitObjectNameLayoutName[0];
    const layoutName = splitObjectNameLayoutName[1];

    const objIdPromise = getObjectId(this.conn, objectName);
    const layoutPromise = this.conn.tooling
      .sobject('Layout')
      .find({ Name: decodeURIComponent(layoutName) })
      .execute();

    const [objectId, layoutRecords] = await Promise.all([objIdPromise, layoutPromise]);

    if (layoutRecords.length === 0 || layoutRecords[0].Id === undefined) {
      throw new Error(`Layout not found for ${layoutName}`);
    }

    return `lightning/setup/ObjectManager/${objectId}/PageLayouts/${layoutRecords[0].Id}/view`;
  }
}
