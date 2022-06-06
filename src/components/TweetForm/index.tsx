import { ChangeEvent, ReactEventHandler, useState } from "react";

type TweetFormProps = {
  avatar: string;
}

const MAX_TWEET_CHAR = 140;

export function TweetForm({ avatar }: TweetFormProps) {
  const [text, setText] = useState('');

  function changeText(event: ChangeEvent<HTMLTextAreaElement>) {
    setText(event.target.value);
  }

  return (
    <div className="border-b border-silver p-4 space-y-6">
      <header className="flex space-x-5">
        <img src={avatar} alt="" className="w-7" />
        <h1 className="font-bold text-xl">Página Inicial</h1>
      </header>

      <form className="pl-12 text-lg flex flex-col">
        <textarea
          name="text"
          value={text}
          className="bg-transparent outline-none disabled:opacity-40"
          placeholder="O que está acontecendo?"
          onChange={changeText}
        />

        <div className="flex justify-end items-center space-x-3">
          <span className="text-sm">
            <span>{text.length}</span>
            /
            <span className="text-birdBlue">{MAX_TWEET_CHAR}</span>
          </span>
          <button
            className="bg-birdBlue px-5 py-2 rounded-full disabled:opacity-50"
            disabled={text.length > MAX_TWEET_CHAR}
          >
            Tweet
          </button>
        </div>
      </form>
    </div>
  );
}