import { getCountries } from '@/contents/getCountries';
import RegisterForm from './RegisterPageClient';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Metadata } from 'next';

export const metadata = {
    title: 'Log Chat - Register',
    description: 'Faça login para acessar o painel da Minha Aplicação.',
    keywords: ['login', 'autenticação', 'painel', 'Minha Aplicação'],
    authors: [{ name: 'Everton Vargas', url: 'https://seusite.com' }],
    creator: 'Everton Vargas',
    publisher: 'Minha Empresa',
    metadataBase: new URL('https://minhaaplicacao.com'),
    applicationName: 'Minha Aplicação',
    category: 'website',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        title: 'Minha Aplicação - Login',
        description: 'Faça login para acessar o painel da Minha Aplicação.',
        url: 'https://minhaaplicacao.com/login',
        siteName: 'Minha Aplicação',
        images: [
            {
                url: 'https://img.freepik.com/vetores-gratis/fundo-futurista-gradiente-geometrico_23-2149116406.jpghttps://minhaaplicacao.com/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Minha Aplicação Logo',
            },
        ],
        locale: 'pt_BR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Minha Aplicação - Login',
        description: 'Faça login para acessar o painel da Minha Aplicação.',
        creator: '@seuTwitter',
        images: ['https://img.freepik.com/vetores-gratis/fundo-futurista-gradiente-geometrico_23-2149116406.jpg'],
    },
    icons: {
        icon: '/favicon.ico', // favicon padrão (16x16 ou 32x32 .ico)
        shortcut: '/favicon-16x16.png', // ícone para atalho (16x16 PNG)
        apple: '/apple-touch-icon.png', // ícone apple touch (180x180 PNG)
    },
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
};

export default async function RegisterPage() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect('/dashboard');
    }

    const countries = await getCountries();

    return <RegisterForm countries={countries} />;
}
