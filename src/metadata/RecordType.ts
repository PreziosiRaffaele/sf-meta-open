import * as path from 'node:path';
import { getObjectId } from '../metadataUtils.js';
import { Metadata } from '../Metadata.js';

export class RecordType extends Metadata {
  public async getUrl(): Promise<string> {
    const arrayPath = this.pathParsed.dir.split(path.sep);
    const objectFolderName = arrayPath[arrayPath.length - 2];

    const objIdPromise = getObjectId(this.conn, objectFolderName);
    const recordTypePromise = this.conn.query(
      `SELECT Id, DeveloperName FROM RecordType WHERE DeveloperName = '${this.metadataApiName}'`
    );

    const [objectId, recordTypeResult] = await Promise.all([objIdPromise, recordTypePromise]);

    if (recordTypeResult.records.length === 0 || recordTypeResult.records[0].Id === undefined) {
      throw new Error(`RecordType not found for ${this.metadataApiName}`);
    }

    return `lightning/setup/ObjectManager/${objectId}/RecordTypes/${recordTypeResult.records[0].Id}/view`;
  }
}
