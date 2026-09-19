/* ==========================================================================
   CONTENIDO DEL PORTAFOLIO
   Todo lo que se ve en la rejilla y en las cifras sale de este archivo.
   Para agregar un proyecto no hay que tocar el HTML: copia un bloque,
   cambia los datos y guarda la imagen en la carpeta img/.
   El orden de la lista es el orden en que aparecen en la rejilla.

   Campos de cada proyecto
   - id:           nombre corto, sin espacios ni tildes.
   - titulo:       nombre que se lee en la tarjeta y en el modal.
   - servicio:     "video" | "grafico".
   - sector:       "moda" | "lifestyle" | "inmobiliario" | "ganaderia" | "maternidad".
   - kicker:       tipo de pieza, en pocas palabras.
   - portada:      imagen de la tarjeta (WebP exportado de Canva).
   - alt:          descripción real de la portada, para lectores de pantalla.
   - aspecto:      proporción de la pieza: "4/5" carrusel, "9/16" reel, "16/9" presentación.

   Solo piezas gráficas
   - canvaId:      ID del diseño en Canva (la parte que empieza con "DA" en la URL).
   - canvaPublico: false mientras el diseño siga privado. Cuando lo compartas en
                   Canva como "Cualquier persona con el enlace puede ver", cámbialo
                   a true y el modal mostrará el embed de Canva.
   - canvaUrl:     opcional. Si Canva te da un enlace con código
                   (…/design/DAxxxx/abc123/view), pégalo aquí completo.
   - paginas:      páginas exportadas de Canva que se ven en el modal mientras
                   el diseño no sea público.
   - descripcion:  texto del modal.

   Solo reels
   - video:        ruta del MP4 exportado de Canva, por ejemplo "videos/moda-1.mp4".
                   Mientras esté vacío, la tarjeta muestra la portada sin botón de play.
   - vistas:       opcional, por ejemplo "51,8 mil".
   ========================================================================== */

window.PORTAFOLIO = {
  /* Reels automáticos desde Cloudinary.
     - cloud: el "Cloud name" que aparece en el panel de tu cuenta de Cloudinary.
     - etiqueta: todo video con esta etiqueta (tag) aparece solo en la rejilla.
     - sectorPorDefecto: se usa si el video no dice a qué sector pertenece.
     Déjalo con cloud: '' para apagarlo. */
  cloudinary: {
    cloud: 'yg834b3e',
    etiqueta: 'portafolio',
    sectorPorDefecto: 'lifestyle'
  },

  sectores: {
    moda:         { nombre: 'Moda',                 corto: 'Moda' },
    lifestyle:    { nombre: 'Lifestyle y comercio', corto: 'Lifestyle' },
    inmobiliario: { nombre: 'Inmobiliario',         corto: 'Inmobiliario' },
    ganaderia:    { nombre: 'Ganadería',            corto: 'Ganadería' },
    maternidad:   { nombre: 'Maternidad',           corto: 'Maternidad' }
  },

  proyectos: [
    {
      id: 'reel-inmobiliario-2',
      titulo: 'No solo firmas',
      servicio: 'video',
      sector: 'inmobiliario',
      kicker: 'Reel',
      portada: 'img/reel-inmobiliario-2.webp',
      alt: 'Reel inmobiliario: asesora con billetes en la mano, con el texto «NO solo firmas».',
      aspecto: '9/16',
      video: ''
    },
    {
      id: 'hostcare',
      titulo: 'Host Care',
      servicio: 'grafico',
      sector: 'lifestyle',
      kicker: 'Branding de servicio',
      portada: 'img/hostcare-portada.webp',
      alt: 'Portada del carrusel Host Care: jabón verde con el logo hc y el texto «Why choose Host Care».',
      canvaId: 'DAHLBJBQK8E',
      canvaPublico: false,
      aspecto: '4/5',
      descripcion: 'Identidad y piezas de contenido para una marca de aseo para anfitriones de alojamientos. Fotografía de producto cálida y natural, pensada para transmitir tranquilidad y atención al detalle.',
      paginas: [
        { src: 'img/hostcare-1.webp', alt: 'Jabón verde con el logo hc, con el texto «Why choose Host Care».' },
        { src: 'img/hostcare-2.webp', alt: 'Mujer con camiseta de Host Care limpiando una cocina, con los textos «Fast response» y «Reliable service».' },
        { src: 'img/hostcare-3.webp', alt: 'Frasco de vidrio con esponjas naturales y hojas, con el texto «Attention to detail».' },
        { src: 'img/hostcare-4.webp', alt: 'Atomizador de vidrio verde entre hojas de salvia, con el texto «Stress-free experience».' },
        { src: 'img/hostcare-5.webp', alt: 'Mujer de Host Care tendiendo una cama, con el texto «Book your service via DM».' }
      ]
    },
    {
      id: 'reel-vistas-wagyu',
      titulo: 'No vale lo que vale',
      servicio: 'video',
      sector: 'ganaderia',
      kicker: 'Reel',
      portada: 'img/reel-vistas-wagyu.webp',
      alt: 'Reel de ganadería: presentadora en el potrero junto al ganado, con el texto «y si piensas que no vale lo que vale».',
      aspecto: '3/4',
      vistas: '51,8 mil',
      video: 'videos/reel-vistas-wagyu.mp4'
    },
    {
      id: 'reel-infantil-2',
      titulo: '¡Hola amigos!',
      servicio: 'video',
      sector: 'maternidad',
      kicker: 'Reel',
      portada: 'img/reel-infantil-2.webp',
      alt: 'Reel infantil: niña entrando al Museum of Ice Cream, con el texto «¡Hola amigos!».',
      aspecto: '9/16',
      video: 'videos/yulianaoolaamigos.mp4'
    },
    {
      id: 'elhueco',
      titulo: 'Manual para habitar El Hueco',
      servicio: 'grafico',
      sector: 'lifestyle',
      kicker: 'Guía de barrio',
      portada: 'img/elhueco-portada.webp',
      alt: 'Portada del carrusel sobre El Hueco: mujer caminando entre locales, con el texto «Si nunca has venido al Hueco, empieza por acá».',
      canvaId: 'DAHKK5yag3Q',
      canvaPublico: false,
      aspecto: '4/5',
      descripcion: 'Segunda parte de una guía editorial sobre El Hueco, zona comercial emblemática de Medellín: contenido de calle, fotografía documental y tipografía urbana para enseñar a moverse por el sector sin pena de preguntar.',
      paginas: [
        { src: 'img/elhueco-1.webp', alt: 'Mujer caminando por El Hueco, con el texto «Si nunca has venido al Hueco, empieza por acá».' },
        { src: 'img/elhueco-2.webp', alt: 'Fondo verde con el texto «Lo difícil no es querer venir, sino no saber por dónde empezar».' },
        { src: 'img/elhueco-3.webp', alt: 'El metro de Medellín pasando, con el texto «Estamos pensados como ese primer punto de llegada».' },
        { src: 'img/elhueco-4.webp', alt: 'Edificio con un mural en El Hueco, con el texto «Desde aquí puedes entrar al movimiento del Hueco sin sentirte tan perdido».' },
        { src: 'img/elhueco-5.webp', alt: 'Fondo verde con el texto «Si no conoces el Hueco, este puede ser tu nuevo punto clave».' }
      ]
    },
    {
      id: 'reel-moda-3',
      titulo: 'Desde mi casa',
      servicio: 'video',
      sector: 'moda',
      kicker: 'Reel',
      portada: 'img/reel-moda-3.webp',
      alt: 'Reel de moda: mujer con top blanco y botas blancas frente a un espejo, con el texto «desde mi casa».',
      aspecto: '9/16',
      video: ''
    },
    {
      id: 'mama',
      titulo: 'De mamá a mamá',
      servicio: 'grafico',
      sector: 'maternidad',
      kicker: 'Contenido de maternidad',
      portada: 'img/mama-portada.webp',
      alt: 'Portada del carrusel De mamá a mamá: dos mamás lactando a sus bebés dentro de un carro.',
      canvaId: 'DAHPv0XkuPw',
      canvaPublico: false,
      aspecto: '4/5',
      descripcion: 'Serie íntima sobre la maternidad temprana: lactancia, descanso y la red de apoyo alrededor de una mamá primeriza. Fotografía natural, con texto que acompaña sin sobreexplicar.',
      paginas: [
        { src: 'img/mama-1.webp', alt: 'Dos mamás lactando a sus bebés en un carro, con el título «De mamá a mamá».' },
        { src: 'img/mama-2.webp', alt: 'Mamá lactando a su bebé, con el texto «La lactancia también se aprende».' },
        { src: 'img/mama-3.webp', alt: 'Pantalla de un monitor de bebé, con el texto «Habrá días en los que no alcances a hacerlo todo».' },
        { src: 'img/mama-4.webp', alt: 'Mamá tomándose una foto frente al espejo, con el texto «Tu cuerpo cambió para poder crear vida».' },
        { src: 'img/mama-5.webp', alt: 'Papá cargando al bebé, con el texto «Si tienes una red que te cuida y te ayuda, agradécela».' },
        { src: 'img/mama-6.webp', alt: 'Mamá abrazando a su hija dormida, con el texto «No busques hacerlo perfecto».' },
        { src: 'img/mama-7.webp', alt: 'Monitor de bebé en la noche, con el texto «Las rutinas de sueño no son solo para ellos».' }
      ]
    },
    {
      id: 'reel-lifestyle-1',
      titulo: 'Vela en casa',
      servicio: 'video',
      sector: 'lifestyle',
      kicker: 'Reel',
      portada: 'img/reel-lifestyle-1.webp',
      alt: 'Reel lifestyle: mujer sosteniendo una vela en su casa, con el texto «hay cosas».',
      aspecto: '9/16',
      video: ''
    },
    {
      id: 'reel-vistas-semana40',
      titulo: 'La semana 40',
      servicio: 'video',
      sector: 'maternidad',
      kicker: 'Reel',
      portada: 'img/reel-vistas-semana40.webp',
      alt: 'Reel de maternidad: mujer hablando a cámara con una taza en la mano, con el texto «La semana 40».',
      aspecto: '3/4',
      vistas: '48,8 mil',
      video: ''
    },
    {
      id: 'wagyu',
      titulo: 'Wagyu',
      servicio: 'grafico',
      sector: 'ganaderia',
      kicker: 'Editorial + ficha técnica',
      portada: 'img/wagyu-portada.webp',
      alt: 'Portada del carrusel Wagyu: textura de carne marmoleada con el texto «Datos de la carne más saludable, jugosa, cara y rica del mundo».',
      canvaId: 'DAHLD-chF10',
      canvaPublico: false,
      aspecto: '4/5',
      descripcion: 'Serie editorial sobre la carne Wagyu: de dónde viene, por qué cuesta lo que cuesta y cómo se traduce ese valor en piezas que explican con datos lo que la hace especial, desde el marmoleo hasta la trazabilidad completa del animal.',
      paginas: [
        { src: 'img/wagyu-1.webp', alt: 'Carne Wagyu marmoleada con el texto «Datos de la carne más saludable, jugosa, cara y rica del mundo».' },
        { src: 'img/wagyu-2.webp', alt: 'Ficha técnica Wagyu: origen Japón, raza japonesa, crecimiento lento y rendimiento del canal moderado, con la foto de un toro negro.' },
        { src: 'img/wagyu-3.webp', alt: 'Ficha técnica Wagyu: marmoleo muy alto, carne extremadamente tierna, sabor rico y mantequilloso, ideal para carne ultrapremium.' },
        { src: 'img/wagyu-4.webp', alt: 'Ficha técnica Wagyu: corte marmoleado y valores por 100 gramos: 290 calorías, 25 g de proteína, 22 g de grasa y 2,7 mg de hierro.' }
      ]
    },
    {
      id: 'reel-moda-2',
      titulo: 'Prenda nueva',
      servicio: 'video',
      sector: 'moda',
      kicker: 'Reel',
      portada: 'img/reel-moda-2.webp',
      alt: 'Reel de moda: mujer mostrando una prenda negra, con el texto «en Orange».',
      aspecto: '9/16',
      video: ''
    },
    {
      id: 'reel-recetas-2',
      titulo: 'Receta práctica',
      servicio: 'video',
      sector: 'lifestyle',
      kicker: 'Reel',
      portada: 'img/reel-recetas-2.webp',
      alt: 'Reel de receta: mujer en la cocina mostrando un lomo de cerdo tajado sobre una tabla, con el texto «Receta práctica».',
      aspecto: '9/16',
      video: ''
    },
    {
      id: 'reset',
      titulo: 'Reset',
      servicio: 'grafico',
      sector: 'lifestyle',
      kicker: 'Campaña de lavandería',
      portada: 'img/reset-portada.webp',
      alt: 'Portada del carrusel Reset: agua en calma con el texto «A reset feels like this».',
      canvaId: 'DAHKspL-6og',
      canvaPublico: false,
      aspecto: '4/5',
      descripcion: 'Campaña conceptual para un servicio de lavandería: el orden como una forma de descanso. Fotografía en tonos cielo y una narrativa corta, casi de poema, para una categoría que suele ser puramente funcional.',
      paginas: [
        { src: 'img/reset-1.webp', alt: 'Agua en calma con el texto «A reset feels like this».' },
        { src: 'img/reset-2.webp', alt: 'Tela blanca colgada frente al mar, con el texto «A space that feels lighter».' },
        { src: 'img/reset-3.webp', alt: 'Mano tocando una tela blanca contra el cielo, con el texto «Calm, clean and in order».' },
        { src: 'img/reset-4.webp', alt: 'Tela blanca movida por el viento, con el texto «Ready for what comes next».' }
      ]
    },
    {
      id: 'reel-inmobiliario-1',
      titulo: 'Terraza con vista',
      servicio: 'video',
      sector: 'inmobiliario',
      kicker: 'Reel',
      portada: 'img/reel-inmobiliario-1.webp',
      alt: 'Reel inmobiliario: asesora vestida de blanco presentando una terraza con vista a la montaña.',
      aspecto: '9/16',
      video: ''
    },
    {
      id: 'reel-moda-1',
      titulo: 'Recorrido por la tienda',
      servicio: 'video',
      sector: 'moda',
      kicker: 'Reel',
      portada: 'img/reel-moda-1.webp',
      alt: 'Reel de moda: mujer organizando prendas en una tienda de ropa, con el texto «desde».',
      aspecto: '9/16',
      video: ''
    },
    {
      id: 'reel-vistas-parto',
      titulo: 'Verdades incómodas sobre el parto',
      servicio: 'video',
      sector: 'maternidad',
      kicker: 'Reel',
      portada: 'img/reel-vistas-parto.webp',
      alt: 'Reel de maternidad: mujer hablando a cámara, con el texto «Verdades incómodas sobre el parto».',
      aspecto: '3/4',
      vistas: '19,2 mil',
      video: ''
    },
    {
      id: 'reel-lifestyle-3',
      titulo: 'Café en casa',
      servicio: 'video',
      sector: 'lifestyle',
      kicker: 'Reel',
      portada: 'img/reel-lifestyle-3.webp',
      alt: 'Reel lifestyle: mujer tomando de una taza junto a su perro, con el texto «hasta romperme».',
      aspecto: '9/16',
      video: ''
    },
    {
      id: 'reel-infantil-1',
      titulo: 'Salida al centro comercial',
      servicio: 'video',
      sector: 'maternidad',
      kicker: 'Reel',
      portada: 'img/reel-infantil-1.webp',
      alt: 'Reel infantil: niña caminando frente a un centro comercial, con el texto «una clase de».',
      aspecto: '16/9',
      video: 'videos/slime.mp4'
    },
    {
      id: 'reel-ganaderia-3',
      titulo: 'Más de lo que crees',
      servicio: 'video',
      sector: 'ganaderia',
      kicker: 'Reel',
      portada: 'img/reel-ganaderia-3.webp',
      alt: 'Reel de ganadería: presentadora con gorra en la finca, con el texto «más de lo que crees».',
      aspecto: '9/16',
      video: ''
    },
    {
      id: 'reel-moda-4',
      titulo: 'Que realzan tu figura',
      servicio: 'video',
      sector: 'moda',
      kicker: 'Reel',
      portada: 'img/reel-moda-4.webp',
      alt: 'Reel de moda: detalle de unos leggings negros, con el texto «que realzan tu figura».',
      aspecto: '9/16',
      video: ''
    },
    {
      id: 'reel-inmobiliario-3',
      titulo: 'Conjunto residencial',
      servicio: 'video',
      sector: 'inmobiliario',
      kicker: 'Reel',
      portada: 'img/reel-inmobiliario-3.webp',
      alt: 'Reel inmobiliario: asesora caminando por un conjunto residencial, con el texto «nosotros».',
      aspecto: '9/16',
      video: ''
    },
    {
      id: 'reel-recetas-1',
      titulo: 'Listo en minutos',
      servicio: 'video',
      sector: 'lifestyle',
      kicker: 'Reel',
      portada: 'img/reel-recetas-1.webp',
      alt: 'Reel de receta: mujer comiendo un sándwich en la cocina, con el texto «lo tienes listo en menos de».',
      aspecto: '9/16',
      video: ''
    },
    {
      id: 'reel-lifestyle-2',
      titulo: 'La taza rota',
      servicio: 'video',
      sector: 'lifestyle',
      kicker: 'Reel',
      portada: 'img/reel-lifestyle-2.webp',
      alt: 'Reel lifestyle: mujer mirando los pedazos de una taza rota sobre la mesa.',
      aspecto: '9/16',
      video: ''
    },
    {
      id: 'reel-infantil-3',
      titulo: 'Cuidados del bebé',
      servicio: 'video',
      sector: 'maternidad',
      kicker: 'Reel',
      portada: 'img/reel-infantil-3.webp',
      alt: 'Reel infantil: mamá cuidando a su bebé acostado, con el texto «no existe una».',
      aspecto: '9/16',
      video: 'videos/rutinabebe.mp4'
    },
    {
      id: 'reel-moda-5',
      titulo: 'Look en el showroom',
      servicio: 'video',
      sector: 'moda',
      kicker: 'Reel',
      portada: 'img/reel-moda-5.webp',
      alt: 'Reel de moda: mujer con enterizo negro sentada en un showroom, con el texto «de pedir ropa».',
      aspecto: '9/16',
      video: ''
    },
    {
      id: 'reel-ganaderia-2',
      titulo: 'Ni idea de dónde vienen',
      servicio: 'video',
      sector: 'ganaderia',
      kicker: 'Reel',
      portada: 'img/reel-ganaderia-2.webp',
      alt: 'Reel de ganadería: presentadora en el potrero con ganado Wagyu al fondo, con el texto «ni idea de dónde vienen».',
      aspecto: '9/16',
      video: 'videos/dondevienen.mp4'
    },
    {
      id: 'reel-inmobiliario-4',
      titulo: 'Recorrido por apartamento',
      servicio: 'video',
      sector: 'inmobiliario',
      kicker: 'Reel',
      portada: 'img/reel-inmobiliario-4.webp',
      alt: 'Reel inmobiliario: hombre mostrando un apartamento con claraboya, con el texto «diferente con».',
      aspecto: '9/16',
      video: ''
    }
  ],

  /* Vistas tomadas de la diapositiva «miles de visualizaciones» de tu portafolio en Canva. */
  cifras: [
    {
      vistas: '81,4',
      unidad: 'mil vistas',
      titulo: 'Jamón de lomo de cerdo',
      sector: 'lifestyle',
      portada: 'img/reel-vistas-cerdo.webp',
      alt: 'Reel de receta: lomo de cerdo cortado en tajadas sobre una tabla, con el texto «Jamón de lomo de cerdo».'
    },
    {
      vistas: '51,8',
      unidad: 'mil vistas',
      titulo: 'No vale lo que vale',
      sector: 'ganaderia',
      portada: 'img/reel-vistas-wagyu.webp',
      alt: 'Reel de ganadería: presentadora en el potrero junto al ganado, con el texto «y si piensas que no vale lo que vale».'
    },
    {
      vistas: '48,8',
      unidad: 'mil vistas',
      titulo: 'La semana 40',
      sector: 'maternidad',
      portada: 'img/reel-vistas-semana40.webp',
      alt: 'Reel de maternidad: mujer hablando a cámara con una taza en la mano, con el texto «La semana 40».'
    },
    {
      vistas: '19,2',
      unidad: 'mil vistas',
      titulo: 'Verdades incómodas sobre el parto',
      sector: 'maternidad',
      portada: 'img/reel-vistas-parto.webp',
      alt: 'Reel de maternidad: mujer hablando a cámara, con el texto «Verdades incómodas sobre el parto».'
    }
  ]
};
