import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Typed HTTP Utilities',
    description: (
      <>
        Complete <code>HttpStatusCode</code> and <code>HttpMethod</code> enums covering all standard HTTP codes,
        plus a typed error hierarchy — <code>ServerError</code>, <code>BadRequestError</code>,
        <code>InternalServerError</code> — ready to use in any Node.js application.
      </>
    ),
  },
  {
    title: 'Math & Collections',
    description: (
      <>
        Utilities for weighted distribution, rounding with precision, and collection helpers like{' '}
        <code>createMapFromArray</code>. Designed for reliability and ease of use in complex
        data-processing scenarios.
      </>
    ),
  },
  {
    title: 'Infrastructure & Logging',
    description: (
      <>
        Drop-in <code>PostgreSQL</code> client wrapper, a structured <code>logger()</code> factory,
        and database-specific error classes like <code>DatabaseConnectionError</code> to keep your
        infrastructure layer consistent and observable.
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
