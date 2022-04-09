[![npm-version](https://img.shields.io/npm/v/next-locales.svg)](https://www.npmjs.com/package/next-locales)
[![npm-download](https://img.shields.io/npm/dt/next-locales.svg)](https://www.npmjs.com/package/next-locales)

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

## Configuration

Create a file in the root path of your Next.js project called: `.i18nrc.json`.<br>
This file stores the basic configuration needed for this library to run.

```json
{
  "localesDir": "./src/locales",
  "locales": ["en", "pl"],
  "defaultLocale": "en"
}
```

In the next step, edit your `next.config.js` file, importing in it high order function `withLocalesConfig` from this library.

Let it look something like this:

```javascript
const { withLocalesConfig } = require('next-locales/server');

module.exports = withLocalesConfig({
  // your custom Next.js config
});
```

## Pages integration

Now we will go to the `pages` directory. You may be using the `src` directory, then the path might look like this: `src/pages`. Here are all the pages on which Next.js works.

In this directory, edit the `_app.jsx` or `_app.tsx` file (if your project uses TypeScript). If such a file does not exist in your project, create it.

This is how it should look like in the simplest form:

```typescript
import { AppProps as CustomAppProps } from 'next/app';
import { withLocales } from 'next-locales';

const CustomApp = ({ Component, pageProps }: CustomAppProps) => (
  <Component {...pageProps} />
);

export default withLocales(CustomApp);
```

### Moving pages (Important!)

Now it's time to create a directory inside `pages` or `src/pages`.<br>
Such directory must be named **`[locale]`**.

Next, move all files and directories **except** for files such as: `_app.jsx`, `_document.jsx`, `_error.jsx`, `404.jsx` or `500.jsx` (or `.tsx` in the TypeScript case) that you previously had in the pages directory to this created directory.

The `index.jsx` file (for the home page) should also be moved.

### New index.jsx page

Since your home page has been moved to the new `[locale]` directory, you should create a new file `index.jsx` with the content as below:

```typescript
import { createInitialIndexPage } from 'next-locales';

export default createInitialIndexPage();
```

This is needed to properly export the Next.js project with this library.

## Translation files

You translation files should be located at `localesDir` set in the `.i18nrc` file. This library supports two types of translations that you can use - `JSON` and `Yaml`.

Each language added to the `locales` configuration array should have its file here with the same name. For example, `pl.json` and` en.json` (`pl.yml` and `en.yml` if you prefer Yaml).

### Example of Yaml translations

en.yml

```yml
testing:
  welcome: Hello {{ name }}!
  userinfo:
    age: Age
    gender: Gender
```

pl.yml

```yml
testing:
  welcome: Cześć {{ name }}!
  userinfo:
    age: Wiek
    gender: Płeć
```

As you can see above - you can use placeholders.<br>
This library implements `Mustache` template system (https://github.com/janl/mustache.js) which enables this functionality.

## Using translation in components

For translations to work, you need to import high order functions - `withLocalesStaticProps` and `withLocalesStaticPaths` in each file where you want to use translation.

```typescript
import {
  withLocalesStaticProps,
  withLocalesStaticPaths,
} from 'next-locales/server';

const ExamplePage = () => <div>This is an example page</div>;

export const getStaticProps = withLocalesStaticProps();
export const getStaticPaths = withLocalesStaticPaths();

export default ExamplePage;
```

If you need a custom `getStaticProps` or g`etStaticPaths` function, just pass the function as the first HOC parameter. Like that:

```typescript
export const getStaticProps = withLocalesStaticProps(async ({ params }) => {
  const additionalProp = 'Hello World!';

  return {
    props: {
      additionalProp,
    },
  };
});

export const getStaticPaths = withLocalesStaticPaths(() => ({
  paths: ['/example', '/hello/world'],
  fallback: false,
}));
```

If the implementation of `getStaticProps` and `getStaticPaths` is fine - you are ready to use your translations!

All you need at this point is to use the `useTranslation` hook.

Full example:

```typescript
import {
  withLocalesStaticProps,
  withLocalesStaticPaths,
} from 'next-locales/server';

const ExamplePage = () => {
  const { t } = useTranslation();

  return <div>{t('testing.welcome', { name: 'Guest' })}</div>;
};

export const getStaticProps = withLocalesStaticProps();
export const getStaticPaths = withLocalesStaticPaths();

export default ExamplePage;
```

The useTranslation hook returns the `t` function. It takes a translation key as the first parameter, and an object for replacing placeholders as the second optional parameter.

## Setting the lang attribute

To set the `lang` attribute for the `<html>` tag, create a custom document `_document.jsx` file:

```javascript
import { Html, Head, Main, NextScript } from 'next/document';
import { getLangAttrValue } from 'next-locales/server';

const CustomDocument = ({ __NEXT_DATA__ }) => (
  <Html lang={getLangAttrValue(__NEXT_DATA__)}>
    <Head />
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default CustomDocument;
```

## Acknowledgments

Thanks to Adriano Raiano (https://github.com/adrai) for sharing the library `next-language-detector` (https://github.com/adrai/next-language-detector) which is used in this project.
