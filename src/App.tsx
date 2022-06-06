import { useState } from "react";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from './pages/Signup';


export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  accessToken: string;
}

export function App() {
  const [user, setUser] = useState<User | null>(null);

  if (user) {
    return <Home loggedUser={user} />
  }

  return window.location.pathname === '/signup'
    ? (<Signup signInUser={setUser} />)
    : (<Login signInUser={setUser} />)
}