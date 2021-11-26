import { getFunctions } from 'firebase/functions'
import { app } from './app'
export { httpsCallable, connectFunctionsEmulator } from 'firebase/functions'

export const functions = getFunctions(app)
