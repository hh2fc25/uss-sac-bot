import SACBot from './components/SACBot';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-900">USS | Servicio al Cliente</h1>
        <p className="text-gray-600 mt-2">Asistente virtual con inteligencia artificial para ayudarte en lo que necesites</p>
      </header>

      <section>
        <SACBot />
      </section>
    </main>
  );
}