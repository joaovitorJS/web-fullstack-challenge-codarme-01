import { Tweet } from '../../components/Tweet';
import { TweetForm } from '../../components/TweetForm';

export function Home() {
  return (
    <>
      <TweetForm avatar='./src/avatar.svg' />
      <div>
        <Tweet name='Elon Musk' username='elonmusk' avatar='./src/avatar.svg'>
          Let's make Twitter maximun fun!
        </Tweet>
        <Tweet name='João Vitor' username='jaovitooor' avatar='./src/avatar.svg'>
          Let's make Twitter maximun fun!
        </Tweet>
      </div>
    </>
  );
}
