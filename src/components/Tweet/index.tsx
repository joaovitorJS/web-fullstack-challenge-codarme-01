import { ReactNode } from "react";
import { HeartIcon } from "@heroicons/react/outline";

type TweetProps = {
  name: string;
  username: string;
  avatar: string;
  children: ReactNode;
}

export function Tweet({
  name,
  username,
  avatar,
  children
}: TweetProps) {
  return (
    <div className="flex space-x-3 p-4 border-b border-silver">
      <div>
        <img src={avatar} alt="Avatar Tweeter" />
      </div>
      <div className="space-y-1">
        <div className="font-bold text-sm flex space-x-1">
          <span>{name}</span>
          <span className="text-silver">@{username}</span>
        </div>

        <p>{children}</p>
        <div className="flex space-x-1 text-silver text-sm items-center">
          <HeartIcon className="w-6 stroke-1" />
          <span>1.2k</span>
        </div>
      </div>
    </div>
  );
}