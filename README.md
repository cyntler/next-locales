# next-locales

Internationalization support for Next.js with static HTML export.

## Installation

To install the library simply add the module.<br>
You can use npm:

```
npm i next-locales
```

or i.e. Yarn if you prefer:

```
yarn add next-locales
```

## Usage

First, create a file in the root path of your Next.js project called: `.i18nrc.json`.<br>
This file stores the basic configuration needed for this library to run.

```json
{
  "localesDir": "./src/locales",
  "locales": ["en", "pl"],
  "defaultLocale": "en"
}
```
