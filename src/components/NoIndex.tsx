import { Helmet } from 'react-helmet-async';

export default function NoIndex({ title }: { title?: string }) {
  return (
    <Helmet>
      <meta name="robots" content="noindex, nofollow" />
      {title ? <title>{title}</title> : null}
    </Helmet>
  );
}

