import { Tweet } from '../../components/Tweet';
import { TweetForm } from '../../components/TweetForm';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { User } from '../../App';

type Tweet = {
  id: string;
  text: string;
  user: {
    name: string;
    username: string;
  };
}

type HomeProps = {
  loggedUser: User;
}

export function Home({ loggedUser }: HomeProps) {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const token = loggedUser.accessToken;

  async function getData() {
    const res = await axios.get<Tweet[]>('http://localhost:3030/tweets', {
      headers: {
        'authorization': `Bearer ${token}`
      }
    });

    setTweets(res.data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <TweetForm avatar='./src/avatar.svg' />
      <div>
        {tweets.length > 0 && tweets.map(tweet => (
          <Tweet
            name={tweet.user.name}
            username={tweet.user.username}
            avatar='./src/avatar.svg'
            key={tweet.id}
          >
            {tweet.text}
          </Tweet>
        ))
        }
      </div>
    </>
  );
}
