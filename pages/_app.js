import '../styles/globals.css'
import Navbar from '../components/Navbar'
import { useFetchUser } from '@/lib/authContext'
import { AuthProvider } from '../lib/authContext';

function MyApp({ Component, pageProps }) {
  return <AuthProvider>
    <Navbar />
    <Component {...pageProps} />
  </AuthProvider>
}
export default MyApp