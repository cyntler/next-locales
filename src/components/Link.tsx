import React, { FunctionComponent } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';

interface LinkProps extends NextLinkProps {}

export const Link: FunctionComponent<LinkProps> = ({
  children,
  locale,
  href,
  ...rest
}) => {
  const { query, asPath, pathname } = useRouter();

  const finalLocale = locale || query.locale?.toString() || '';
  let hrefValue = href?.toString() || asPath;

  if (!hrefValue.includes('http')) {
    hrefValue = hrefValue.includes('[locale]')
      ? pathname.replace('[locale]', finalLocale)
      : `/${finalLocale}${href}`;
  }

  return (
    <NextLink locale={finalLocale} href={hrefValue} {...rest}>
      {children}
    </NextLink>
  );
};
