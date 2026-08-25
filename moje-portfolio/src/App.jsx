import React from 'react';
import './index.css';

function App() {
  return (
    <div className="min-h-screen p-4 md:p-8 font-serif text-stone-900">
      
      {/* Główny kontener - stara gazeta */}
      <div className="max-w-5xl mx-auto shadow-2xl relative overflow-hidden paper-texture">
        
        {/* Margines wewnętrzny i obramowanie */}
        <div className="m-4 md:m-8 border-4 border-double border-stone-800 p-4 md:p-8 relative z-10">
          
          {/* Nagłówek Gazety */}
          <header className="border-b-4 border-stone-800 pb-6 mb-8 text-center">
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 font-gothic text-stone-900 drop-shadow-sm">
              Kacper Z.
            </h1>
            <div className="flex flex-col md:flex-row justify-between items-center border-y-2 border-stone-800 py-2 text-xs md:text-sm uppercase tracking-widest font-bold">
              <span>Gdańsk, Wrzesień 2026</span>
              <span>Teczka Kandydata — Grafika Komputerowa PJATK</span>
            </div>
          </header>

          {/* Wstęp - Southern Gothic Vibe */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold uppercase border-b-2 border-stone-800 pb-2 mb-4 font-gothic">
              Rozdział I: Prolog
            </h2>
            <div className="columns-1 md:columns-2 gap-8 text-justify font-medium leading-relaxed">
              <p className="mb-4">
                <span className="float-left text-6xl font-black mr-2 leading-none font-gothic mt-1">Z</span>
                amknięte w kadrach i na papierze. Fotografia to nie tylko łapanie światła, to wyrywanie momentów z mroku. Moja twórczość balansuje między surowością a nostalgią. Szukam tekstur, głębi i historii tam, gdzie inni widzą tylko codzienność.
              </p>
              <p className="mb-4">
                Przed Tobą zbiór moich prac – od klasycznej fotografii po tradycyjny rysunek. To wizytówka przygotowana specjalnie na rozmowę kwalifikacyjną, ale też surowy zapis mojej perspektywy. Znajdziesz tu eksperymenty, cienie i kadry, które nie proszą o uwagę, a same ją kradną.
              </p>
            </div>
          </section>

          {/* Sekcja: Fotografia */}
          <section className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-grow border-t-2 border-stone-800"></div>
              <h2 className="text-4xl font-bold uppercase font-gothic text-center">Fotografia</h2>
              <div className="flex-grow border-t-2 border-stone-800"></div>
            </div>
            
            {/* Vintage Grid na zdjęcia */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Zdjecie 1 (pionowe) */}
              <div className="flex flex-col group cursor-pointer">
                <div className="border-2 border-stone-800 p-2 bg-[#d8cbb0]">
                  <div className="aspect-[3/4] bg-stone-300 sepia-img overflow-hidden">
                    {/* Wklej tutaj ścieżkę do swojego zdjęcia */}
                    <img src="https://placehold.co/600x800/2c2925/d8cbb0?text=KADR+1" alt="Fotografia 1" className="w-full h-full object-cover" />
                  </div>
                </div>
                <p className="text-center text-sm font-bold uppercase mt-2 tracking-widest border-b border-stone-800 pb-1">Brak Sygnału</p>
              </div>

              {/* Zdjecie 2 (wyróżnione poziome) */}
              <div className="flex flex-col group cursor-pointer md:col-span-2">
                <div className="border-2 border-stone-800 p-2 bg-[#d8cbb0] h-full">
                  <div className="aspect-video bg-stone-300 sepia-img overflow-hidden h-full">
                     <img src="https://placehold.co/1200x800/2c2925/d8cbb0?text=KADR+2" alt="Fotografia 2" className="w-full h-full object-cover" />
                  </div>
                </div>
                <p className="text-center text-sm font-bold uppercase mt-2 tracking-widest border-b border-stone-800 pb-1">Rozdarte światło</p>
              </div>
            </div>
          </section>

          {/* Sekcja: Tradycyjny Rysunek */}
          <section className="mb-8">
             <div className="flex items-center gap-4 mb-6">
              <div className="flex-grow border-t-2 border-stone-800"></div>
              <h2 className="text-4xl font-bold uppercase font-gothic text-center">Tradycyjny Rysunek</h2>
              <div className="flex-grow border-t-2 border-stone-800"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border-4 border-stone-800 p-1 bg-stone-900">
                <div className="aspect-square bg-stone-300 sepia-img overflow-hidden">
                   <img src="https://placehold.co/800x800/2c2925/d8cbb0?text=SZKIC+1" alt="Szkic 1" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-3xl font-bold uppercase font-gothic mb-4 border-b-2 border-stone-800 inline-block w-fit pb-1">Studium Formy</h3>
                <p className="text-justify font-medium leading-relaxed">
                  Ołówek, węgiel i szorstki papier. Zanim cyfrowe piksele zajęły miejsce na ekranie, fundamentem zawsze była linia prowadzona ręką. Szukam brudu, niedoskonałości, surowego charakteru postaci i przestrzeni.
                </p>
              </div>
            </div>
          </section>

          {/* Stopka */}
          <footer className="border-t-4 border-stone-800 pt-6 mt-12 text-center text-sm font-bold uppercase tracking-widest flex flex-col md:flex-row justify-between">
            <span>© 2026 Kacper Z.</span>
            <span>Wszelkie prawa zastrzeżone</span>
          </footer>

        </div>
      </div>
    </div>
  );
}

export default App;
