import { https } from 'firebase-functions'
import { traverse, asyncCall, use } from 'object-call-utils'

export const api = https.onCall(([path, args], context) =>
  import('./api').then((api) =>
    use(traverse(api, path), (fun) =>
      fun
        ? asyncCall(() => fun.apply(context, args)).then(
            (ok) => ({ ok }),
            (error) => ({ error: JSON.stringify(error) }),
          )
        : Promise.resolve({ error: 'Endpoint not found' }),
    ),
  ),
)
