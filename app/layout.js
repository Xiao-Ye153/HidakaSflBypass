import { Dela_Gothic_One, Zen_Kaku_Gothic_New } from 'next/font/google';
import './globals.css';

const display = Dela_Gothic_One({ weight: '400', subsets: ['latin'], variable: '--font-display' });
const body = Zen_Kaku_Gothic_New({ weight: ['400', '500', '700'], subsets: ['latin'], variable: '--font-body' });

export const metadata = {
  title: 'HidakaSfl — buka link sfl.gl',
  description: 'Tempel link sfl.gl, dapat link tujuannya.'
};

export const viewport = { themeColor: '#0d3470' };

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
