import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AB4 Academy - Elite Baseball Training | Tampa, FL',
  description: 'AB4 Academy is an elite youth baseball development program in Tampa, Florida. Professional coaching, college preparation, and student-athlete development.',
  keywords: ['baseball', 'youth training', 'Tampa', 'Florida', 'hitting', 'pitching', 'fielding', 'college preparation', 'student-athlete'],
  openGraph: {
    title: 'AB4 Academy - Elite Baseball Training',
    description: 'Developing student-athletes through professional baseball training, academic support, and college preparation in Tampa, FL.',
  },
  icons: {
    icon: '/logo1.png',
    apple: '/logo1.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}