import { getObjectId, isCustomMetadata, isPlatformEvent } from '../metadataUtils.js';
import { Metadata } from '../Metadata.js';

export class SObject extends Metadata {
  public async getUrl(): Promise<string> {
    const objectId = await getObjectId(this.conn, this.metadataApiName);
    if (isCustomMetadata(this.metadataApiName)) {
      return `lightning/setup/CustomMetadata/page?address=%2F${objectId}%3Fsetupid%3DCustomMetadata`;
    } else if (isPlatformEvent(this.metadataApiName)) {
      return `lightning/setup/EventObjects/page?address=%2F${objectId}%3Fsetupid%3DEventObjects`;
    } else {
      return `lightning/setup/ObjectManager/${objectId}/Details/view`;
    }
  }
}
