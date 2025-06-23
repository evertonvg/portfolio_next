import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Home (Pública)</h1>
      <p>
        Bem-vindo! Vá para{' '}
        <a href="/login" className="underline text-blue-600">
          Login
        </a>{' '}
        ou{' '}
        <a href="/dashboard" className="underline text-red-600">
          Dashboard
        </a>
        <Button>Click me</Button>
      </p>
    </div>
  );
}
