import { useEffect, useState } from 'react';
import './index.css';
import { brightnessBoost, descriptions } from './fotografia-data.js';
import authorPic from './assets/author-pic.jpg';

const thumbGlob = import.meta.glob('./assets/fotografia/thumbs/*', {
  eager: true,
  query: '?url',
  import: 'default',
});

const fullGlob = import.meta.glob('./assets/fotografia/full/*', {
  eager: true,
  query: '?url',
  import: 'default',
});

const photos = Object.entries(thumbGlob)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => {
    const name = path.split('/').pop();
    return {
      src,
      full: fullGlob[`./assets/fotografia/full/${name}`] ?? src,
      caption: descriptions[name] || name.replace(/\.[^.]+$/, '').replace(/_/g, ' '),
      brightness: brightnessBoost[name],
    };
  });

const drawingImage = {
  src: 'https://placehold.co/800x800/2c2925/d8cbb0?text=SZKIC+1',
  full: 'https://placehold.co/800x800/2c2925/d8cbb0?text=SZKIC+1',
  caption: 'Studium Formy',
};

const allImages = [...photos, drawingImage];

function Figure({ image, index, onClick }) {
  return (
    <div className="group relative cursor-pointer" onClick={() => onClick(index)}>
      <div className="relative border-2 border-stone-800 p-1.5 bg-[#d8cbb0] transition-transform duration-500 ease-out will-change-transform group-hover:scale-110 group-hover:z-30 group-hover:shadow-2xl">
        <div className="aspect-square bw-img overflow-hidden">
          <img
            src={image.src}
            alt={image.caption}
            loading="lazy"
            className="w-full h-full object-cover"
            style={image.brightness ? { filter: `grayscale(1) contrast(1.02) brightness(${image.brightness})` } : undefined}
          />
        </div>
        <p className="photo-caption absolute inset-x-1.5 bottom-1.5 px-2 py-1 text-center text-xs bg-[#eaddc4]/95 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {image.caption}
        </p>
      </div>
    </div>
  );
}

function Lightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    if (index === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [index, onClose, onPrev, onNext]);

  if (index === null) return null;
  const image = images[index];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-12"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Zamknij podgląd"
        className="absolute top-4 right-4 font-gothic text-2xl font-bold text-[#eaddc4] border-2 border-[#eaddc4] w-10 h-10 flex items-center justify-center hover:bg-[#eaddc4] hover:text-stone-900 transition-colors"
      >
        ✕
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label="Poprzednie zdjęcie"
            className="absolute left-4 md:left-8 text-4xl md:text-6xl text-[#eaddc4] hover:text-white transition-colors select-none"
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label="Następne zdjęcie"
            className="absolute right-4 md:right-8 text-4xl md:text-6xl text-[#eaddc4] hover:text-white transition-colors select-none"
          >
            ›
          </button>
        </>
      )}

      <figure
        className="max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-4 border-double border-[#eaddc4] bg-[#eaddc4] p-2 shadow-2xl">
          <img
            src={image.full}
            alt={image.caption}
            className="lightbox-img max-h-[80vh] max-w-[85vw] object-contain"
          />
        </div>
        <figcaption className="photo-caption mt-3 text-center text-sm text-[#eaddc4]">
          {image.caption}
          {images.length > 1 && <span className="ml-3 opacity-70">{index + 1} / {images.length}</span>}
        </figcaption>
      </figure>
    </div>
  );
}

function App() {
  const [activeIndex, setActiveIndex] = useState(null);

  const open = (i) => setActiveIndex(i);
  const close = () => setActiveIndex(null);
  const next = () => setActiveIndex((i) => (i === null ? null : (i + 1) % allImages.length));
  const prev = () => setActiveIndex((i) => (i === null ? null : (i - 1 + allImages.length) % allImages.length));

  return (
    <div className="min-h-screen p-4 md:p-8 font-gothic text-stone-900">

      {/* Główny kontener - stara gazeta */}
      <div className="max-w-5xl mx-auto shadow-2xl relative overflow-hidden paper-texture">

        {/* Margines wewnętrzny i obramowanie */}
        <div className="m-4 md:m-8 border-4 border-double border-stone-800 p-4 md:p-8 relative z-10">

          {/* Nagłówek Gazety */}
          <header className="border-b-4 border-stone-800 pb-6 mb-8 text-center">
            <p className="text-xs uppercase tracking-[0.4em] mb-3 text-stone-700">
              Teczka Kandydata — Grafika Komputerowa PJATK
            </p>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 font-serif text-stone-900 drop-shadow-sm">
              Kacper Z.
            </h1>
            <div className="flex flex-col md:flex-row justify-between items-center border-y-2 border-stone-800 py-2 text-xs md:text-sm uppercase tracking-widest font-bold">
              <span>Gdańsk, Wrzesień 2026</span>
              <span className="hidden md:inline">— Nr 1 —</span>
              <span>Cena: spojrzenie</span>
            </div>
          </header>

          {/* Sekcja: O mnie */}
          <section className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-grow border-t-2 border-stone-800"></div>
              <h2 className="text-4xl font-bold uppercase font-serif text-center">O Autorze</h2>
              <div className="flex-grow border-t-2 border-stone-800"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1">
                <div className="border-4 border-stone-800 p-2 bg-[#d8cbb0]">
                  <div className="border-2 border-stone-800 p-1 bw-img">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={authorPic}
                        alt="Portret autora — Kacper Z."
                        className="w-full h-full object-cover object-[50%_22%]"
                      />
                    </div>
                  </div>
                </div>
                <p className="photo-caption text-center text-sm mt-2 border-b border-stone-800 pb-1">
                  Redaktor naczelny niniejszego wydania
                </p>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-3xl font-bold uppercase font-serif mb-4 border-b-2 border-stone-800 inline-block w-fit pb-1">
                  Kilka słów o mnie
                </h3>
                <p className="text-justify font-medium leading-relaxed mb-4">
                  Nazywam się Kacper i od lat szukam światła tam, gdzie inni widzą tylko cień.
                  Fotografia i rysunek to moje dwa języki — jeden łapie to, co ulotne,
                  drugi zatrzymuje to, co przemyślane. Pracuję w klimatach surowych, mrocznych,
                  przełamanych nostalgią i szorstką teksturą.
                </p>
                <p className="text-justify font-medium leading-relaxed">
                  Ta gazeta to moja teczka kandydata — zbiór kadrów i szkiców przygotowany na
                  rozmowę kwalifikacyjną na kierunek Grafika Komputerowa na PJATK. Liczę, że
                  znajdziesz tu nie tylko umiejętności, ale i charakter. Witaj w moim świecie.
                </p>
              </div>
            </div>
          </section>

          {/* Wstęp - Southern Gothic Vibe */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold uppercase border-b-2 border-stone-800 pb-2 mb-4 font-serif">
              Rozdział I: Prolog
            </h2>
            <div className="columns-1 md:columns-2 gap-8 text-justify font-medium leading-relaxed">
              <p className="mb-4">
                <span className="float-left text-6xl font-black mr-2 leading-none font-serif mt-1">Z</span>
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
              <h2 className="text-4xl font-bold uppercase font-serif text-center">Fotografia</h2>
              <div className="flex-grow border-t-2 border-stone-800"></div>
            </div>

            {/* Kompaktowa siatka zdjęć */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {photos.map((img, i) => (
                <Figure key={img.src} image={img} index={i} onClick={open} />
              ))}
            </div>
            <p className="text-center text-xs uppercase tracking-[0.3em] text-stone-700 mt-4">
              Kliknij zdjęcie, aby zobaczyć je w pełnych barwach
            </p>
          </section>

          {/* Sekcja: Tradycyjny Rysunek */}
          <section className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-grow border-t-2 border-stone-800"></div>
              <h2 className="text-4xl font-bold uppercase font-serif text-center">Tradycyjny Rysunek</h2>
              <div className="flex-grow border-t-2 border-stone-800"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border-4 border-stone-800 p-1 bg-stone-900">
                <div className="aspect-square bw-img overflow-hidden">
                  <img
                    src={drawingImage.src}
                    alt={drawingImage.caption}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => open(allImages.length - 1)}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-3xl font-bold uppercase font-serif mb-4 border-b-2 border-stone-800 inline-block w-fit pb-1">Studium Formy</h3>
                <p className="text-justify font-medium leading-relaxed">
                  Ołówek, węgiel i szorstki papier. Zanim cyfrowe piksele zajęły miejsce na ekranie, fundamentem zawsze była linia prowadzona ręką. Szukam brudu, niedoskonałości, surowego charakteru postaci i przestrzeni.
                </p>
              </div>
            </div>
          </section>

          {/* Stopka */}
          <footer className="border-t-4 border-stone-800 pt-6 mt-12 text-center text-sm font-bold uppercase tracking-widest flex flex-col md:flex-row justify-between">
            <span>© 2026 Kacper Z.</span>
            <span>Redaktor naczelny: Kacper Z.</span>
            <span>Str. 1</span>
          </footer>

        </div>
      </div>

      {/* Pełnoekranowy podgląd w oryginalnych kolorach */}
      <Lightbox images={allImages} index={activeIndex} onClose={close} onPrev={prev} onNext={next} />
    </div>
  );
}

export default App;