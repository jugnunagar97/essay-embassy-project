import { Helmet } from 'react-helmet-async';

type NoIndexProps = {
  title?: string;
  follow?: 'follow' | 'nofollow';
};

export default function NoIndex({ title, follow = 'nofollow' }: NoIndexProps) {
  const content = `noindex, ${follow}`;

  return (
    <Helmet>
      <meta name="robots" content={content} />
      <meta name="googlebot" content={content} />
      {title ? <title>{title}</title> : null}
    </Helmet>
  );
}

