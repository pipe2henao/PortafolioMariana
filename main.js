/* ==========================================================================
   Portafolio de Mariana Arenas
   Rejilla filtrable, reels con clic para reproducir y modal de proyecto.
   Los datos viven en work.js.
   ========================================================================== */
(() => {
  'use strict';

  const datos = window.PORTAFOLIO;
  if (!datos) return;

  const WHATSAPP = 'https://wa.me/573234019955';
  const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)');
  const comportamiento = () => (movimientoReducido.matches ? 'auto' : 'smooth');

  /* ---------- utilidades ---------- */
  const $ = (selector, raiz = document) => raiz.querySelector(selector);

  // Crea nodos sin usar innerHTML: el contenido de work.js se inserta como texto.
  function el(tag, attrs = {}, hijos = []) {
    const nodo = document.createElement(tag);
    for (const [clave, valor] of Object.entries(attrs)) {
      if (valor === false || valor == null) continue;
      if (clave === 'class') nodo.className = valor;
      else if (clave === 'text') nodo.textContent = valor;
      else nodo.setAttribute(clave, valor === true ? '' : valor);
    }
    for (const hijo of [].concat(hijos)) {
      if (hijo != null) nodo.append(hijo);
    }
    return nodo;
  }

  const proporcion = (aspecto) => {
    const [ancho, alto] = String(aspecto || '4/5').split('/').map(Number);
    return ancho > 0 && alto > 0 ? ancho / alto : 0.8;
  };

  const sector = (clave) => datos.sectores[clave] || { nombre: clave, corto: clave };

  const tipoPieza = (p) => {
    if (p.servicio === 'video') return 'Reel';
    const r = proporcion(p.aspecto);
    if (r > 1.2) return 'Presentación';
    if (r > 0.7 && r < 0.9) return 'Carrusel';
    return 'Pieza gráfica';
  };

  const enlaceWhatsApp = (texto) => `${WHATSAPP}?text=${encodeURIComponent(texto)}`;

  /* ==========================================================================
     REJILLA
     ========================================================================== */
  const rejilla = $('#rejilla');
  const proyectos = datos.proyectos || [];

  function crearPie(p) {
    return el('span', { class: 'tarjeta__pie' }, [
      el('span', { class: 'tarjeta__titulo', text: p.titulo }),
      el('span', { class: 'tarjeta__detalle', text: `${tipoPieza(p)} · ${sector(p.sector).corto}` }),
      p.vistas ? el('span', { class: 'tarjeta__vistas', text: `${p.vistas} vistas` }) : null
    ]);
  }

  function crearTarjeta(p) {
    const li = el('li', { class: `tarjeta tarjeta--${p.servicio}` });
    li.style.setProperty('--a', proporcion(p.aspecto).toFixed(4));

    const media = el('span', { class: 'tarjeta__media' }, [
      el('img', { src: p.portada, alt: p.alt || p.titulo, loading: 'lazy', decoding: 'async' })
    ]);

    if (p.servicio === 'grafico') {
      const boton = el('button', {
        type: 'button',
        class: 'tarjeta__boton',
        'aria-haspopup': 'dialog',
        'aria-label': `${p.titulo}: ver ${tipoPieza(p).toLowerCase()} completo`
      }, [media, crearPie(p)]);
      boton.addEventListener('click', () => abrirModal(p, boton));
      li.append(boton);
    } else if (p.video) {
      media.append(el('span', { class: 'tarjeta__play', 'aria-hidden': 'true' }));
      const boton = el('button', {
        type: 'button',
        class: 'tarjeta__boton',
        'aria-pressed': 'false',
        'aria-label': `Reproducir reel: ${p.titulo}`
      }, [media, crearPie(p)]);
      boton.addEventListener('click', () => alternarVideo(p, boton, media));
      li.append(boton);
    } else {
      li.append(el('figure', { class: 'tarjeta__boton tarjeta__boton--estatica' }, [
        media,
        el('figcaption', {}, [crearPie(p)])
      ]));
    }
    return li;
  }

  const tarjetas = proyectos.map((p) => ({ p, li: crearTarjeta(p) }));
  rejilla.replaceChildren(...tarjetas.map((t) => t.li));

  if (proyectos.some((p) => p.servicio === 'video' && p.video)) {
    $('#trabajo-ayuda').textContent = 'Toca un carrusel para verlo completo o un reel para oírlo.';
  }

  /* ==========================================================================
     REELS: póster y clic para reproducir con sonido
     ========================================================================== */
  let videoActivo = null;

  const observadorVideo = 'IntersectionObserver' in window
    ? new IntersectionObserver((entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting && videoActivo && entrada.target.contains(videoActivo.boton)) {
            detenerVideo();
          }
        }
      }, { threshold: 0.2 })
    : null;

  function detenerVideo() {
    if (!videoActivo) return;
    const { video, boton, p } = videoActivo;
    video.pause();
    boton.setAttribute('aria-pressed', 'false');
    boton.setAttribute('aria-label', `Reproducir reel: ${p.titulo}`);
    boton.closest('.tarjeta').classList.remove('is-playing');
    if (observadorVideo) observadorVideo.unobserve(boton.closest('.tarjeta'));
    videoActivo = null;
  }

  function alternarVideo(p, boton, media) {
    if (videoActivo && videoActivo.boton === boton) {
      detenerVideo();
      return;
    }
    detenerVideo();

    const tarjeta = boton.closest('.tarjeta');
    let video = media.querySelector('video');
    if (!video) {
      video = el('video', { src: p.video, poster: p.portada, playsinline: true, loop: true, preload: 'auto' });
      video.addEventListener('error', () => {
        tarjeta.classList.add('sin-video');
        if (videoActivo && videoActivo.video === video) detenerVideo();
      });
      media.append(video);
    }

    video.muted = false;
    videoActivo = { video, boton, p };
    tarjeta.classList.add('is-playing');
    boton.setAttribute('aria-pressed', 'true');
    boton.setAttribute('aria-label', `Pausar reel: ${p.titulo}`);
    if (observadorVideo) observadorVideo.observe(tarjeta);

    const promesa = video.play();
    if (promesa && promesa.catch) promesa.catch(() => detenerVideo());
  }

  /* ==========================================================================
     FILTROS: servicio y sector
     ========================================================================== */
  const SERVICIOS = [['todo', 'Todo'], ['video', 'Edición de video'], ['grafico', 'Piezas gráficas']];
  const SECTORES = [['todos', 'Todos'], ...Object.entries(datos.sectores).map(([clave, s]) => [clave, s.nombre])];
  const estado = { servicio: 'todo', sector: 'todos' };

  const coincide = (p, servicio, clave) =>
    (servicio === 'todo' || p.servicio === servicio) && (clave === 'todos' || p.sector === clave);

  function crearGrupo(clave, etiqueta, opciones) {
    const botones = opciones.map(([valor, nombre]) => {
      const contador = el('span', { class: 'chip__n' });
      const icono = clave === 'servicio' && valor !== 'todo'
        ? el('span', { class: `chip__icono chip__icono--${valor}`, 'aria-hidden': 'true' })
        : null;
      const boton = el('button', { type: 'button', class: 'chip', 'aria-pressed': 'false' }, [
        icono, el('span', { text: nombre }), contador
      ]);
      boton.addEventListener('click', () => {
        estado[clave] = valor;
        aplicarFiltros();
      });
      return { valor, boton, contador };
    });
    const nodo = el('div', { class: 'filtros__grupo', role: 'group', 'aria-label': etiqueta }, botones.map((b) => b.boton));
    return { nodo, botones };
  }

  const grupoServicio = crearGrupo('servicio', 'Servicio', SERVICIOS);
  const grupoSector = crearGrupo('sector', 'Sector', SECTORES);
  $('#filtros').replaceChildren(grupoServicio.nodo, grupoSector.nodo);

  function actualizarGrupo(grupo, clave, contar) {
    for (const { valor, boton, contador } of grupo.botones) {
      const total = contar(valor);
      contador.textContent = total;
      boton.setAttribute('aria-pressed', String(estado[clave] === valor));
      boton.disabled = total === 0 && estado[clave] !== valor;
    }
  }

  function aplicarFiltros() {
    // Si la combinación quedó vacía, se vuelve a todos los sectores.
    if (!proyectos.some((p) => coincide(p, estado.servicio, estado.sector))) estado.sector = 'todos';

    let visibles = 0;
    for (const { p, li } of tarjetas) {
      const visible = coincide(p, estado.servicio, estado.sector);
      li.hidden = !visible;
      if (visible) visibles += 1;
    }
    if (videoActivo && videoActivo.boton.closest('.tarjeta').hidden) detenerVideo();

    actualizarGrupo(grupoServicio, 'servicio',
      (valor) => proyectos.filter((p) => coincide(p, valor, estado.sector)).length);
    actualizarGrupo(grupoSector, 'sector',
      (valor) => proyectos.filter((p) => coincide(p, estado.servicio, valor)).length);

    $('#filtros-estado').textContent = `${visibles} ${visibles === 1 ? 'pieza' : 'piezas'} en la rejilla`;
    $('#rejilla-vacia').hidden = visibles > 0;
    guardarEnUrl();
  }

  // Los filtros quedan en la URL: ?servicio=video&sector=moda se puede compartir.
  function guardarEnUrl() {
    try {
      const url = new URL(window.location.href);
      if (estado.servicio === 'todo') url.searchParams.delete('servicio');
      else url.searchParams.set('servicio', estado.servicio);
      if (estado.sector === 'todos') url.searchParams.delete('sector');
      else url.searchParams.set('sector', estado.sector);
      history.replaceState(null, '', url);
    } catch (error) {
      /* file:// no siempre permite cambiar la URL; no pasa nada */
    }
  }

  const params = new URLSearchParams(window.location.search);
  if (SERVICIOS.some(([v]) => v === params.get('servicio'))) estado.servicio = params.get('servicio');
  if (SECTORES.some(([v]) => v === params.get('sector'))) estado.sector = params.get('sector');
  aplicarFiltros();

  // Botones de servicio de la portada: filtran sin recargar y bajan a la rejilla.
  document.querySelectorAll('[data-ver-servicio]').forEach((enlace) => {
    enlace.addEventListener('click', (evento) => {
      evento.preventDefault();
      estado.servicio = enlace.dataset.verServicio;
      estado.sector = 'todos';
      aplicarFiltros();
      const destino = $('#trabajo');
      destino.scrollIntoView({ behavior: comportamiento(), block: 'start' });
      destino.focus({ preventScroll: true });
    });
  });

  /* ==========================================================================
     MODAL DE PROYECTO
     El iframe de Canva solo se crea al abrir y se destruye al cerrar.
     ========================================================================== */
  const modal = $('#modal');
  const visor = $('#modal-visor');
  let origenModal = null;
  let limpiarVisor = null;
  let navegar = null;

  function urlsCanva(p) {
    if (!p.canvaPublico) return null;
    const base = (p.canvaUrl || (p.canvaId ? `https://www.canva.com/design/${p.canvaId}/view` : ''))
      .split('#')[0].split('?')[0];
    return base ? { ver: base, embed: `${base}?embed` } : null;
  }

  function montarEmbed(p, src) {
    const marco = el('iframe', {
      src,
      title: `${p.titulo}, diseño en Canva`,
      loading: 'lazy',
      allow: 'fullscreen',
      allowfullscreen: true
    });
    visor.replaceChildren(el('div', { class: 'visor' }, [el('div', { class: 'visor__embed' }, [marco])]));
    return () => visor.replaceChildren();
  }

  function montarCarrusel(p) {
    const paginas = p.paginas && p.paginas.length ? p.paginas : [{ src: p.portada, alt: p.alt }];
    const total = paginas.length;

    const pista = el('div', {
      class: 'visor__pista',
      tabindex: '0',
      role: 'region',
      'aria-roledescription': 'carrusel',
      'aria-label': `Páginas de ${p.titulo}`
    }, paginas.map((pagina, i) => el('figure', {
      class: 'visor__pagina',
      role: 'group',
      'aria-roledescription': 'página',
      'aria-label': `${i + 1} de ${total}`
    }, [el('img', { src: pagina.src, alt: pagina.alt || '', loading: i < 2 ? 'eager' : 'lazy', decoding: 'async' })])));

    const contador = el('p', { class: 'visor__contador', 'aria-live': 'polite' });
    const anterior = el('button', { type: 'button', class: 'visor__flecha', 'aria-label': 'Página anterior' },
      [el('span', { 'aria-hidden': 'true', text: '←' })]);
    const siguiente = el('button', { type: 'button', class: 'visor__flecha', 'aria-label': 'Página siguiente' },
      [el('span', { 'aria-hidden': 'true', text: '→' })]);

    visor.replaceChildren(el('div', { class: 'visor' }, [
      pista,
      total > 1 ? el('div', { class: 'visor__controles' }, [anterior, contador, siguiente]) : null
    ]));

    let actual = 0;
    const actualizar = () => {
      contador.textContent = `${actual + 1} / ${total}`;
      anterior.disabled = actual === 0;
      siguiente.disabled = actual === total - 1;
    };
    const ir = (indice) => {
      const destino = Math.max(0, Math.min(total - 1, indice));
      pista.scrollTo({ left: destino * pista.clientWidth, behavior: comportamiento() });
    };

    anterior.addEventListener('click', () => ir(actual - 1));
    siguiente.addEventListener('click', () => ir(actual + 1));
    navegar = (paso) => ir(actual + paso);

    const observador = new IntersectionObserver((entradas) => {
      for (const entrada of entradas) {
        if (entrada.isIntersecting) {
          actual = Array.prototype.indexOf.call(pista.children, entrada.target);
          actualizar();
        }
      }
    }, { root: pista, threshold: 0.6 });
    Array.from(pista.children).forEach((pagina) => observador.observe(pagina));
    actualizar();

    return () => {
      observador.disconnect();
      visor.replaceChildren();
    };
  }

  function abrirModal(p, origen) {
    detenerVideo();
    origenModal = origen;

    const s = sector(p.sector);
    const nPaginas = (p.paginas || []).length;
    $('#modal-kicker').textContent = p.kicker || tipoPieza(p);
    $('#modal-titulo').textContent = p.titulo;
    $('#modal-meta').textContent = nPaginas
      ? `${s.nombre} · ${nPaginas} ${nPaginas === 1 ? 'página' : 'páginas'}`
      : s.nombre;
    $('#modal-desc').textContent = p.descripcion || '';
    $('#modal-escribeme').href = enlaceWhatsApp(`Hola Mariana, vi «${p.titulo}» en tu portafolio y quiero algo así para mi marca.`);

    const canva = urlsCanva(p);
    const enlaceCanva = $('#modal-canva');
    enlaceCanva.hidden = !canva;
    if (canva) enlaceCanva.href = canva.ver;

    visor.style.setProperty('--ar', proporcion(p.aspecto).toFixed(4));
    visor.style.setProperty('--aspecto', String(p.aspecto || '4/5').replace('/', ' / '));
    navegar = null;
    limpiarVisor = canva ? montarEmbed(p, canva.embed) : montarCarrusel(p);

    if (typeof modal.showModal === 'function') modal.showModal();
    else modal.setAttribute('open', '');
  }

  function cerrarModal() {
    if (typeof modal.close === 'function') modal.close();
    else {
      modal.removeAttribute('open');
      modal.dispatchEvent(new Event('close'));
    }
  }

  modal.addEventListener('close', () => {
    if (limpiarVisor) limpiarVisor();
    limpiarVisor = null;
    navegar = null;
    if (origenModal && document.contains(origenModal)) origenModal.focus();
    origenModal = null;
  });

  // Clic en el fondo oscuro cierra el modal.
  modal.addEventListener('click', (evento) => {
    if (evento.target === modal) cerrarModal();
  });

  modal.addEventListener('keydown', (evento) => {
    if (!navegar) return;
    if (evento.key === 'ArrowRight') { evento.preventDefault(); navegar(1); }
    else if (evento.key === 'ArrowLeft') { evento.preventDefault(); navegar(-1); }
  });

  $('#modal-cerrar').addEventListener('click', cerrarModal);

  /* ==========================================================================
     CIFRAS
     ========================================================================== */
  const listaCifras = $('#cifras-lista');
  if (listaCifras && Array.isArray(datos.cifras)) {
    listaCifras.replaceChildren(...datos.cifras.map((c) => el('li', { class: 'cifra' }, [
      el('figure', { class: 'cifra__img' }, [
        el('img', { src: c.portada, alt: c.alt || c.titulo, loading: 'lazy', decoding: 'async' })
      ]),
      el('div', { class: 'cifra__texto' }, [
        el('p', { class: 'cifra__numero' }, [c.vistas, el('span', { class: 'cifra__unidad', text: c.unidad || 'mil vistas' })]),
        el('p', { class: 'cifra__pie' }, [
          el('span', { class: 'cifra__titulo', text: c.titulo }),
          el('span', { class: 'cifra__sector', text: `Reel · ${sector(c.sector).nombre}` })
        ])
      ])
    ])));
  }
})();
