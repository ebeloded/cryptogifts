/// <reference types="@sveltejs/kit" />

declare global {
  interface Window {
    ethereum?: import('eip1193-provider').default
  }
}

export {}
