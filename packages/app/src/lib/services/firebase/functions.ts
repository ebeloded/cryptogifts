import { getFunctions, connectFunctionsEmulator } from 'firebase/functions'
import { app } from './app'
export { httpsCallable } from 'firebase/functions'

export const functions = getFunctions(app)

connectFunctionsEmulator(functions, 'localhost', 5001)
