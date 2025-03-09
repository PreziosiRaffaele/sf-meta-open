import * as path from 'node:path';
import { Connection } from '@salesforce/core';

export abstract class Metadata {
  protected extension: string;
  protected pathParsed: path.ParsedPath;
  protected metadataApiName: string;
  protected conn: Connection;

  public constructor(conn: Connection, extension: string, pathParsed: path.ParsedPath) {
    this.conn = conn;
    this.extension = extension;
    this.pathParsed = pathParsed;
    this.metadataApiName = pathParsed.base.substring(0, pathParsed.base.length - (extension.length + 1));
  }

  // eslint-disable-next-line @typescript-eslint/require-await, class-methods-use-this
  public async getUrl(): Promise<string> {
    // This method should be implemented by subclasses
    throw new Error('Method not implemented');
  }
}
