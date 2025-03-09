# summary

Open Salesforce metadata in your browser.

# description

This command takes a local metadata file path and opens its corresponding record in the Salesforce web interface using your default browser.

# flags.metadata.summary

Path to the metadata file you want to open in Salesforce.

# flags.metadata.description

Specify the full or relative path to a metadata file. The command will determine the metadata type based on the file extension and open the appropriate page in Salesforce.

# flags.targetusername.summary

Username or alias of the target Salesforce org.

# flags.targetusername.description

The Salesforce org where the metadata should be opened. This must be an org that you have already authenticated with using 'sf login'.

# examples

- Open a Flow:
  sf meta open -f force-app/main/default/flows/MyFlow.flow-meta.xml -o my-org
