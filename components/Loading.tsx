import { Spinner } from 'phosphor-react';

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100/70 dark:bg-gray-700 w-screen h-screen top-0 left-0 fixed z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500">
                <span className="sr-only">
                    <Spinner className="h-8 w-8 text-blue-500" />
                </span>
            </div>
        </div>
    );
}
