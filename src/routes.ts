import { Router } from 'https://deno.land/x/oak/mod.ts'

const router = new Router()

router
.get('/user', async (ctx) => {
  const username = ctx.request.url.searchParams.get('username');
  const fields_param = ctx.request.url.searchParams.get('fields');
  if (!username){
     return ctx.response.body = 'Usuário inválido'
  }
  let fields: Array<string> = []
    if (fields_param){
      fields = fields_param.split(',').map((field)=> field.trim());
    }
    const result = await fetch(`https://api.github.com/users/${username}`);
    if (result.status === 200){
      const data = await result.json()
      return ctx.response.body = fields.length > 0 ? 
      fields.map((key:string) => ({[key]:data[key]||'unknown property'})) 
      : 
      data;
    }
    return ctx.response.body = 'Ooops!'
})
.post('/user', async (ctx) => {
  const {value} = await ctx.request.body();
  if (!value['username']){
    return ctx.response.body = 'Unknown username'
  }
  let fields:Array<string> = [];
  if (value['fields']){
    fields = value['fields'].split(',').map((field:string) => field.trim());
  }
  const result = await fetch(`https://api.github.com/users/${value['username']}`);
  if (result.status === 200){
    const data = await result.json()
    return ctx.response.body = fields.length > 0 ? 
    fields.map((key:string) => ({[key]:data[key]||'unknown property'})) 
    : 
    data;
  }
    return ctx.response.body = 'Ooops!'
})

export default router;