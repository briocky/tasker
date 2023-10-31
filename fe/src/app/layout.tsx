import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import theme from './theme';
import {ReduxProvider} from '@/redux/provider'
import {ThemeProvider} from '@mui/material/styles'
import Navbar from "@/components/navbar/navbar";
import Copyright from "@/components/copyright/copyright";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Tasker',
  description: 'Task management app',
}

export default function RootLayout({children}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
      <body className={inter.className}>
      <ReduxProvider>
        <ThemeProvider theme={theme}>
          <Navbar/>
          {children}
          <Copyright />
        </ThemeProvider>
      </ReduxProvider>
      </body>
      </html>
  )
}
