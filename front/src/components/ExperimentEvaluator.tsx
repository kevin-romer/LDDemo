import { useLDClient } from 'launchdarkly-react-client-sdk';
import { useEffect } from 'react';

export const ExperimentEvaluator = () => {
  const ldClient = useLDClient();

  useEffect(() => {
    ldClient?.variation('active-disasters', false);
  }, [ldClient]);

  return null;
};