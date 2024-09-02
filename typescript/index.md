# TypeScript


* Initialize project
#+begin_src shell
npx create-next-app@latest
#+end_src


* UUID
#+begin_src typescript
npm install @types/uuid uuid;

import {v4 as UUID} from 'uuid';

let uuid = UUID();
#+end_src

* request
#+begin_src typescript
const response = await fetch("http://localhost:8080", {
  method: "POST",
  body: jsonRPCBody,
  Headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  },
});
#+end_src

