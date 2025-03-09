# sf-meta-open

[![NPM](https://img.shields.io/npm/v/sf-meta-open.svg?label=sf-meta-open)](https://www.npmjs.com/package/sf-meta-open) [![Downloads/week](https://img.shields.io/npm/dw/sf-meta-open.svg)](https://npmjs.org/package/sf-meta-open) [![License](https://img.shields.io/badge/License-BSD%203--Clause-brightgreen.svg)](https://raw.githubusercontent.com/salesforcecli/sf-meta-go/main/LICENSE.txt)

A Salesforce CLI plugin that allows you to quickly open metadata files in the browser. This plugin provides a convenient way to navigate from your local metadata files directly to their corresponding web interface in Salesforce, improving developer productivity.

## Install

```bash
sf plugins install sf-meta-open@latest
```

## Usage

```bash
sf meta open --metadata <path-to-metadata-file> --targetusername <your-org>
```

Or use the alias for brevity:

```bash
sf meta open -f <path-to-metadata-file> -o <your-org>
```

## About

This plugin analyzes a local Salesforce metadata file and opens its corresponding record directly in the browser. It automatically:

1. Determines the metadata type based on the file extension
2. Constructs the correct URL for viewing that specific metadata
3. Opens your default browser to that URL

## Commands

<!-- commands -->

- [`sf meta open`](#sf-meta-open)

## `sf meta open`

Open Salesforce metadata in your browser.

```
USAGE
  $ sf meta open -f <filepath> -o <orgname>

FLAGS
  -f, --metadata=<path>       (required) Path to the metadata file you want to open in Salesforce
  -o, --targetusername=<org>  (required) Username or alias of the target Salesforce org

DESCRIPTION
  Open Salesforce metadata in your browser.

  This command takes a local metadata file path and opens its corresponding record in the Salesforce web interface using your default browser.

EXAMPLES
  Open an Apex class:
    $ sf meta open --metadata force-app/main/default/classes/MyClass.cls --targetusername my-org

  Open a custom object:
    $ sf meta open -f force-app/main/default/objects/MyObject__c/MyObject__c.object-meta.xml -o my-org
```
