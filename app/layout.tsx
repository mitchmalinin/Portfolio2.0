{/*
                                 ,---.
                                /    |
                               /     |
                              /      |
                             /       |
                        ___,'        |
                      <  -'          :
                       \`-.__..--'\`\`-,_\_
                          |o/ <o>\` :,.)_\`>
                          :/ \`     ||/)
                          (_.).__,-\` |\\
                          /( \`.\`\`   \`| :
                          \\'`-.)  \`  ; ;
                          | \`       /-<
                          |     \`  /   \`.
          ,-_-..____     /|  \`    :__..-'\\
         /,'-.__\\\\  \`\`-./ :\`      ;       \\
         \`\\ \`\\  \`\\\\  \\ :  (   \`  /  ,   \`. \\
           \\\` \\   \\\\   |  | \`   :  :     .\\ \\
            \\ \`\\_  ))  :  ;     |  |      ): :
           (\`-.-'\\ ||  |\\ \\   \` ;  ;       | |
            \\-_   \`;;._   ( \`  /  /_       | |
             \`-.-.// ,'\`-._\\__/_,'         ; |
                \\:: :     /     \`     ,   /  |
                 || |    (        ,' /   /   |
                 ||                ,'   / SSt|

███╗░░░███╗██████╗░░░░░██╗░░░░░░░██╗███████╗██████╗░██████╗░
████╗░████║██╔══██╗░░░░██║░░██╗░░██║╚════██║██╔══██╗██╔══██╗
██╔████╔██║██████╔╝░░░░╚██╗████╗██╔╝░░███╔═╝██████╔╝██║░░██║
██║╚██╔╝██║██╔══██╗░░░░░████╔═████║░██╔══╝░░██╔══██╗██║░░██║
██║░╚═╝░██║██║░░██║██╗░░╚██╔╝░╚██╔╝░███████╗██║░░██║██████╔╝
╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝░░░╚═╝░░░╚═╝░░╚══════╝╚═╝░░╚═╝╚═════╝░

*/}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '[Mr.Wzrd]',
  description: 'AI Alchemist, Vibe Dev, Mr.Wzrd',
  openGraph: {
    title: '[Mr.Wzrd]',
    description: 'AI Alchemist, Vibe Dev, Mr.Wzrd',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mr.Wzrd - AI Alchemist, Vibe Dev',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '[Mr.Wzrd]',
    description: 'AI Alchemist, Vibe Dev, Mr.Wzrd',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-[1600px] mx-auto">
          {children}
        </div>
      </body>
    </html>
  )
}
