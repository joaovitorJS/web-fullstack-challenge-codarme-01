import { useState } from "react";

import { Home } from "./pages/Home";
import { Login, User } from "./pages/Login";
import { Signup } from './pages/Signup';


export function App() {
  const [user, setUser] = useState({} as User);

  if (user.id) {
    return <Home />
  }

  return window.location.pathname === '/signup'
    ? (<Signup signInUser={setUser} />)
    : (<Login signInUser={setUser} />)
}