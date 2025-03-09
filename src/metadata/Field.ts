import * as path from 'node:path';
import {
  getObjectId,
  isStandardField,
  getObjectFieldDeveloperName,
  isCustomMetadata,
  isPlatformEvent,
} from '../metadataUtils.js';
import { Metadata } from '../Metadata.js';

export class Field extends Metadata {
  public async getUrl(): Promise<string> {
    let url: string;
    const arrayPath = this.pathParsed.dir.split(path.sep);
    const objectFolderName = arrayPath[arrayPath.length - 2];

    if (isStandardField(this.metadataApiName)) {
      // For standard fields, we can use developerName as Id
      if (this.metadataApiName.endsWith('Id')) {
        this.metadataApiName = this.metadataApiName.substring(0, this.metadataApiName.length - 2);
      }
      url = `lightning/setup/ObjectManager/${objectFolderName}/FieldsAndRelationships/${this.metadataApiName}/view`;
    } else {
      this.metadataApiName = getObjectFieldDeveloperName(this.metadataApiName);
      const objectId = await getObjectId(this.conn, objectFolderName);

      const fieldRecords = await this.conn.tooling
        .sobject('CustomField')
        .find({ DeveloperName: this.metadataApiName, TableEnumOrId: objectId })
        .execute();

      if (fieldRecords.length === 0 || fieldRecords[0].Id === undefined) {
        throw new Error(`Field not found for ${this.metadataApiName}`);
      }

      if (isCustomMetadata(objectFolderName)) {
        url = `lightning/setup/CustomMetadata/page?address=%2F${fieldRecords[0].Id}%3Fsetupid%3DCustomMetadata`;
      } else if (isPlatformEvent(objectFolderName)) {
        url = `lightning/setup/EventObjects/page?address=%2F${fieldRecords[0].Id}%3Fsetupid%3DEventObjects`;
      } else {
        url = `lightning/setup/ObjectManager/${objectId}/FieldsAndRelationships/${fieldRecords[0].Id}/view`;
      }
    }
    return url;
  }
}
