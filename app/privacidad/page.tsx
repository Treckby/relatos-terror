import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad | Relatos Oscuros',
}

export default function Privacidad() {
  return (
    <main className="min-h-screen bg-[#080604] pt-28 pb-20 px-6 max-w-2xl mx-auto">

      <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#7a1515] mb-3">
        Legal
      </p>
      <h1 className="text-4xl font-serif text-[#ede5d0] italic mb-10">
        Política de Privacidad
      </h1>

      <div className="flex flex-col gap-8 text-[#a89878] leading-relaxed">

        <section>
          <h2 className="font-serif text-xl text-[#ede5d0] mb-2">1. Información que recopilamos</h2>
          <p>
            Cuando creas una cuenta recopilamos tu correo electrónico, nombre de usuario y, opcionalmente,
            una biografía y foto de perfil. Si publicas un relato sin cuenta, podemos recopilar el seudónimo
            que ingreses voluntariamente. También guardamos el contenido que publicas (relatos, comentarios, likes).
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#ede5d0] mb-2">2. Cookies y almacenamiento local</h2>
          <p>
            Usamos almacenamiento local del navegador para guardar tus preferencias de lectura
            (tamaño de letra, tipo de fuente, modo claro/oscuro) y tu sesión de inicio de sesión.
            Esta información se guarda en tu dispositivo y no se comparte con terceros.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#ede5d0] mb-2">3. Publicidad (Google AdSense)</h2>
          <p>
            Este sitio utiliza Google AdSense para mostrar anuncios. Google puede usar cookies para
            mostrar anuncios basados en tus visitas anteriores a este u otros sitios web. Puedes
            inhabilitar la publicidad personalizada visitando{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#b8842a] underline hover:text-[#d4a848]"
            >
              Configuración de anuncios de Google
            </a>.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#ede5d0] mb-2">4. Cómo usamos tu información</h2>
          <p>
            Usamos tus datos únicamente para operar el sitio: mostrar tu perfil, permitir comentarios,
            likes, favoritos y la publicación de relatos. No vendemos ni compartimos tu información
            personal con terceros, salvo lo necesario para el funcionamiento de servicios como
            autenticación (Supabase) y publicidad (Google AdSense).
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#ede5d0] mb-2">5. derechos reservados jesworks</h2>
          <p>
            Puedes solicitar la eliminación de tu cuenta y datos asociados en cualquier momento
            escribiéndonos a <span className="text-[#ede5d0]">jesrodriguezalv@gmail.com</span>.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#ede5d0] mb-2">6. Cambios a esta política</h2>
          <p>
            Podemos actualizar esta política ocasionalmente. Te recomendamos revisarla
            periódicamente para estar al tanto de cualquier cambio.
          </p>
        </section>

        <p className="font-mono text-[10px] text-[#5c5040] mt-6">
          Última actualización: junio 2026
        </p>

      </div>

    </main>
  )
}