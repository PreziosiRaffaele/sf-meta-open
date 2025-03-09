import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages, Connection } from '@salesforce/core';
import { go } from '../../OpenMetadataHandler.js';

Messages.importMessagesDirectoryFromMetaUrl(import.meta.url);
const messages = Messages.loadMessages('sf-meta-open', 'meta.open');

export type MetaOpenResult = {
  isSuccess: boolean;
  error?: string;
  url?: string;
};

export default class MetaOpen extends SfCommand<MetaOpenResult> {
  public static readonly summary = messages.getMessage('summary');
  public static readonly description = messages.getMessage('description');
  public static readonly examples = messages.getMessages('examples');

  public static readonly flags = {
    metadata: Flags.file({
      summary: messages.getMessage('flags.metadata.summary'),
      char: 'f',
      required: true,
      exists: true,
    }),
    targetusername: Flags.requiredOrg({
      summary: messages.getMessage('flags.targetusername.summary'),
      char: 'o',
      required: true,
    }),
  };

  public async run(): Promise<MetaOpenResult> {
    const { flags } = await this.parse(MetaOpen);

    try {
      // eslint-disable-next-line sf-plugin/get-connection-with-version
      const conn: Connection = flags.targetusername.getConnection();
      const url = await go(conn, flags.metadata);
      this.log(`Successfully navigated to Metadata: ${url}`);
      return {
        isSuccess: true,
        url,
      };
    } catch (exception) {
      const err = exception instanceof Error ? exception.message : String(exception);
      this.log(`Error to open Metadata: ${err}`);
      return {
        isSuccess: false,
        error: err,
      };
    }
  }
}
