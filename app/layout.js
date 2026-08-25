import { Anton, Work_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
});

const workSans = Work_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const metadata = {
  title: 'Matt Nguyen — 1-on-1 coaching for skinny-fat men',
  description: 'Become lean, confident, and unrecognizable in 3-6 months. 1-on-1 coaching with Matt Nguyen.',
  icons: {
    icon: '/logo_matt_face.jpg',
    apple: '/logo_matt_face.jpg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${workSans.variable} ${ibmPlexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
