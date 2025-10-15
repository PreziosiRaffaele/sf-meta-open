import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages, Connection } from '@salesforce/core';
import { open } from '../../OpenMetadataHandler.js';

Messages.importMessagesDirectoryFromMetaUrl(import.meta.url);
const messages = Messages.loadMessages('sf-meta-open', 'meta.open');

export type MetaOpenResult = {
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
    'api-version': Flags.orgApiVersion({
      summary: messages.getMessage('flags.api-version.summary'),
    }),
  };

  public async run(): Promise<MetaOpenResult> {
    const { flags } = await this.parse(MetaOpen);
    const conn: Connection = flags.targetusername.getConnection(flags['api-version']);
    const url = await open(conn, flags.metadata);
    this.log(`Successfully navigated to Metadata: ${url}`);
    return {
      url,
    };
  }
}
