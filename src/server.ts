import { Application } from 'https://deno.land/x/oak/mod.ts'

const port = 8000;

const app = new Application();

import router from './routes.ts';

app.use(router.routes())
app.use(router.allowedMethods());

await app.listen({ port })
