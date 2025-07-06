import type { ReactNode } from 'react';
import PrivateLayoutClient from './clientLayout';

interface PrivateLayoutProps {
    children: ReactNode;
}


export default function PrivateLayout({ children }: PrivateLayoutProps) {
    return (
        <>
            <PrivateLayoutClient>{children}</PrivateLayoutClient>
        </>
    );
}
