
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  
    <ClerkProvider appearance={{
        elements:{
          
        },
        variables:{
          colorText:'white',
          colorPrimary:'#0E78F9',
          colorBackground:'#1c1f2e',
          borderRadius:'10px',
          colorInputBackground:'#252a41',
          colorInputText:'#fff'
        }
      }} publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <App />
  </ClerkProvider>
  
)
