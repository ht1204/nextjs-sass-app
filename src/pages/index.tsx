import { useEffect } from 'react';
import { NextPage } from 'next';
import { Container } from '@material-ui/core';
import useSWR from 'swr';
import { secureLoader } from 'lib/api';
import useAPIPost from 'lib/utils/hooks/useAPIPost';
import { SubscribeHero } from '../components/SubscribeHero/SubscribeHero';
import { SubscriptionList, EmailSubscription } from '../components/SubscriptionList/SubscriptionList';
import constants from 'lib/utils/constants/constants';


const IndexPage: NextPage = () => {
    const { URL } = constants;
    const subscribe = useAPIPost<void, { email: string }>(URL);

    const { data } = useSWR<EmailSubscription[]>(URL, secureLoader(), { revalidateOnFocus: true });
  
    useEffect(() => {
      if (subscribe.posted) {
        subscribe.reset();
      }
    }, [subscribe.posted]);

    const handleSubmit = (email) : void => {
        subscribe.post({ email });
    };
  
    return (
      <Container maxWidth='lg'>
        <SubscribeHero 
            onSubmit={email => handleSubmit(email)} 
            hasError={!!subscribe.error} 
        />
          <SubscriptionList subscriptions={data || []} />
      </Container>
    )
};

export default IndexPage;
