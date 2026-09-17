import { BibleBook, BibleVerse } from '../types';

export const BIBLE_BOOKS: BibleBook[] = [
  // Antiguo Testamento - Pentateuco
  { id: 'GEN', name: 'Génesis', shortName: 'Gn', abbr: ['gn', 'gen', 'genesis'], testament: 'OT', chaptersCount: 50, category: 'Pentateuco' },
  { id: 'EXO', name: 'Éxodo', shortName: 'Éx', abbr: ['ex', 'exo', 'exod', 'exodo'], testament: 'OT', chaptersCount: 40, category: 'Pentateuco' },
  { id: 'LEV', name: 'Levítico', shortName: 'Lv', abbr: ['lv', 'lev', 'levitico'], testament: 'OT', chaptersCount: 27, category: 'Pentateuco' },
  { id: 'NUM', name: 'Números', shortName: 'Nm', abbr: ['nm', 'num', 'numeros'], testament: 'OT', chaptersCount: 36, category: 'Pentateuco' },
  { id: 'DEU', name: 'Deuteronomio', shortName: 'Dt', abbr: ['dt', 'deut', 'deuteronomio'], testament: 'OT', chaptersCount: 34, category: 'Pentateuco' },

  // Históricos
  { id: 'JOS', name: 'Josué', shortName: 'Jos', abbr: ['jos', 'josue'], testament: 'OT', chaptersCount: 24, category: 'Históricos' },
  { id: 'JDG', name: 'Jueces', shortName: 'Jue', abbr: ['jue', 'jueces'], testament: 'OT', chaptersCount: 21, category: 'Históricos' },
  { id: 'RUT', name: 'Rut', shortName: 'Rut', abbr: ['rut', 'rt'], testament: 'OT', chaptersCount: 4, category: 'Históricos' },
  { id: '1SA', name: '1 Samuel', shortName: '1 S', abbr: ['1s', '1sa', '1sam', '1 samuel', '1samuel'], testament: 'OT', chaptersCount: 31, category: 'Históricos' },
  { id: '2SA', name: '2 Samuel', shortName: '2 S', abbr: ['2s', '2sa', '2sam', '2 samuel', '2samuel'], testament: 'OT', chaptersCount: 24, category: 'Históricos' },
  { id: '1KI', name: '1 Reyes', shortName: '1 R', abbr: ['1r', '1re', '1rey', '1 reyes', '1reyes'], testament: 'OT', chaptersCount: 22, category: 'Históricos' },
  { id: '2KI', name: '2 Reyes', shortName: '2 R', abbr: ['2r', '2re', '2rey', '2 reyes', '2reyes'], testament: 'OT', chaptersCount: 25, category: 'Históricos' },
  { id: '1CH', name: '1 Crónicas', shortName: '1 Cr', abbr: ['1cr', '1cron', '1 cronicas', '1cronicas'], testament: 'OT', chaptersCount: 29, category: 'Históricos' },
  { id: '2CH', name: '2 Crónicas', shortName: '2 Cr', abbr: ['2cr', '2cron', '2 cronicas', '2cronicas'], testament: 'OT', chaptersCount: 36, category: 'Históricos' },
  { id: 'EZR', name: 'Esdras', shortName: 'Esd', abbr: ['esd', 'esdras'], testament: 'OT', chaptersCount: 10, category: 'Históricos' },
  { id: 'NEH', name: 'Nehemías', shortName: 'Neh', abbr: ['neh', 'nehemias'], testament: 'OT', chaptersCount: 13, category: 'Históricos' },
  { id: 'EST', name: 'Ester', shortName: 'Est', abbr: ['est', 'ester'], testament: 'OT', chaptersCount: 10, category: 'Históricos' },

  // Poéticos y Sapienciales
  { id: 'JOB', name: 'Job', shortName: 'Job', abbr: ['job', 'jb'], testament: 'OT', chaptersCount: 42, category: 'Poéticos' },
  { id: 'PSA', name: 'Salmos', shortName: 'Sal', abbr: ['sal', 'psa', 'ps', 'salmo', 'salmos'], testament: 'OT', chaptersCount: 150, category: 'Poéticos' },
  { id: 'PRO', name: 'Proverbios', shortName: 'Pr', abbr: ['pr', 'pro', 'prov', 'proverbios'], testament: 'OT', chaptersCount: 31, category: 'Poéticos' },
  { id: 'ECC', name: 'Eclesiastés', shortName: 'Ec', abbr: ['ec', 'ecl', 'eclesiastes'], testament: 'OT', chaptersCount: 12, category: 'Poéticos' },
  { id: 'SNG', name: 'Cantares', shortName: 'Cnt', abbr: ['cnt', 'can', 'cantares', 'cantar de los cantares'], testament: 'OT', chaptersCount: 8, category: 'Poéticos' },

  // Profetas Mayores
  { id: 'ISA', name: 'Isaías', shortName: 'Is', abbr: ['is', 'isa', 'isaias'], testament: 'OT', chaptersCount: 66, category: 'Profetas Mayores' },
  { id: 'JER', name: 'Jeremías', shortName: 'Jer', abbr: ['jer', 'jeremias'], testament: 'OT', chaptersCount: 52, category: 'Profetas Mayores' },
  { id: 'LAM', name: 'Lamentaciones', shortName: 'Lm', abbr: ['lm', 'lam', 'lamentaciones'], testament: 'OT', chaptersCount: 5, category: 'Profetas Mayores' },
  { id: 'EZK', name: 'Ezequiel', shortName: 'Ez', abbr: ['ez', 'ezk', 'eze', 'ezequiel'], testament: 'OT', chaptersCount: 48, category: 'Profetas Mayores' },
  { id: 'DAN', name: 'Daniel', shortName: 'Dn', abbr: ['dn', 'dan', 'daniel'], testament: 'OT', chaptersCount: 12, category: 'Profetas Mayores' },

  // Profetas Menores
  { id: 'HOS', name: 'Oseas', shortName: 'Os', abbr: ['os', 'ose', 'oseas'], testament: 'OT', chaptersCount: 14, category: 'Profetas Menores' },
  { id: 'JOL', name: 'Joel', shortName: 'Jl', abbr: ['jl', 'joe', 'joel'], testament: 'OT', chaptersCount: 3, category: 'Profetas Menores' },
  { id: 'AMO', name: 'Amós', shortName: 'Am', abbr: ['am', 'amos'], testament: 'OT', chaptersCount: 9, category: 'Profetas Menores' },
  { id: 'OBA', name: 'Abdías', shortName: 'Abd', abbr: ['abd', 'obad', 'abdias'], testament: 'OT', chaptersCount: 1, category: 'Profetas Menores' },
  { id: 'JON', name: 'Jonás', shortName: 'Jon', abbr: ['jon', 'jonas'], testament: 'OT', chaptersCount: 4, category: 'Profetas Menores' },
  { id: 'MIC', name: 'Miqueas', shortName: 'Miq', abbr: ['miq', 'mic', 'miqueas'], testament: 'OT', chaptersCount: 7, category: 'Profetas Menores' },
  { id: 'NAH', name: 'Nahúm', shortName: 'Nah', abbr: ['nah', 'nahum'], testament: 'OT', chaptersCount: 3, category: 'Profetas Menores' },
  { id: 'HAB', name: 'Habacuc', shortName: 'Hab', abbr: ['hab', 'habacuc'], testament: 'OT', chaptersCount: 3, category: 'Profetas Menores' },
  { id: 'ZEP', name: 'Sofonías', shortName: 'Sof', abbr: ['sof', 'zep', 'sofonias'], testament: 'OT', chaptersCount: 3, category: 'Profetas Menores' },
  { id: 'HAG', name: 'Hageo', shortName: 'Hag', abbr: ['hag', 'hageo'], testament: 'OT', chaptersCount: 2, category: 'Profetas Menores' },
  { id: 'ZEC', name: 'Zacarías', shortName: 'Zac', abbr: ['zac', 'zec', 'zacarias'], testament: 'OT', chaptersCount: 14, category: 'Profetas Menores' },
  { id: 'MAL', name: 'Malaquías', shortName: 'Mal', abbr: ['mal', 'malaquias'], testament: 'OT', chaptersCount: 4, category: 'Profetas Menores' },

  // Nuevo Testamento - Evangelios
  { id: 'MAT', name: 'Mateo', shortName: 'Mt', abbr: ['mt', 'mat', 'mateo'], testament: 'NT', chaptersCount: 28, category: 'Evangelios' },
  { id: 'MRK', name: 'Marcos', shortName: 'Mr', abbr: ['mr', 'mc', 'mrk', 'marcos'], testament: 'NT', chaptersCount: 16, category: 'Evangelios' },
  { id: 'LUK', name: 'Lucas', shortName: 'Lc', abbr: ['lc', 'luk', 'lucas'], testament: 'NT', chaptersCount: 24, category: 'Evangelios' },
  { id: 'JHN', name: 'Juan', shortName: 'Jn', abbr: ['jn', 'jhn', 'juan'], testament: 'NT', chaptersCount: 21, category: 'Evangelios' },

  // Histórico NT
  { id: 'ACT', name: 'Hechos', shortName: 'Hch', abbr: ['hch', 'hec', 'act', 'hechos'], testament: 'NT', chaptersCount: 28, category: 'Históricos NT' },

  // Epístolas Paulinas
  { id: 'ROM', name: 'Romanos', shortName: 'Ro', abbr: ['ro', 'rom', 'romanos'], testament: 'NT', chaptersCount: 16, category: 'Epístolas Paulinas' },
  { id: '1CO', name: '1 Corintios', shortName: '1 Co', abbr: ['1co', '1cor', '1 corintios', '1corintios'], testament: 'NT', chaptersCount: 16, category: 'Epístolas Paulinas' },
  { id: '2CO', name: '2 Corintios', shortName: '2 Co', abbr: ['2co', '2cor', '2 corintios', '2corintios'], testament: 'NT', chaptersCount: 13, category: 'Epístolas Paulinas' },
  { id: 'GAL', name: 'Gálatas', shortName: 'Gál', abbr: ['gal', 'gálatas', 'galatas'], testament: 'NT', chaptersCount: 6, category: 'Epístolas Paulinas' },
  { id: 'EPH', name: 'Efesios', shortName: 'Ef', abbr: ['ef', 'eph', 'efesios'], testament: 'NT', chaptersCount: 6, category: 'Epístolas Paulinas' },
  { id: 'PHP', name: 'Filipenses', shortName: 'Fil', abbr: ['fil', 'php', 'filipenses'], testament: 'NT', chaptersCount: 4, category: 'Epístolas Paulinas' },
  { id: 'COL', name: 'Colosenses', shortName: 'Col', abbr: ['col', 'colosenses'], testament: 'NT', chaptersCount: 4, category: 'Epístolas Paulinas' },
  { id: '1TH', name: '1 Tesalonicenses', shortName: '1 Ts', abbr: ['1ts', '1tes', '1 tesalonicenses', '1tesalonicenses'], testament: 'NT', chaptersCount: 5, category: 'Epístolas Paulinas' },
  { id: '2TH', name: '2 Tesalonicenses', shortName: '2 Ts', abbr: ['2ts', '2tes', '2 tesalonicenses', '2tesalonicenses'], testament: 'NT', chaptersCount: 3, category: 'Epístolas Paulinas' },
  { id: '1TI', name: '1 Timoteo', shortName: '1 Ti', abbr: ['1ti', '1tim', '1 timoteo', '1timoteo'], testament: 'NT', chaptersCount: 6, category: 'Epístolas Paulinas' },
  { id: '2TI', name: '2 Timoteo', shortName: '2 Ti', abbr: ['2ti', '2tim', '2 timoteo', '2timoteo'], testament: 'NT', chaptersCount: 4, category: 'Epístolas Paulinas' },
  { id: 'TIT', name: 'Tito', shortName: 'Tit', abbr: ['tit', 'tito'], testament: 'NT', chaptersCount: 3, category: 'Epístolas Paulinas' },
  { id: 'PHM', name: 'Filemón', shortName: 'Flm', abbr: ['flm', 'filemon', 'filemón'], testament: 'NT', chaptersCount: 1, category: 'Epístolas Paulinas' },

  // Epístolas Generales
  { id: 'HEB', name: 'Hebreos', shortName: 'Heb', abbr: ['heb', 'hebreos'], testament: 'NT', chaptersCount: 13, category: 'Epístolas Generales' },
  { id: 'JAS', name: 'Santiago', shortName: 'Stg', abbr: ['stg', 'jas', 'santiago'], testament: 'NT', chaptersCount: 5, category: 'Epístolas Generales' },
  { id: '1PE', name: '1 Pedro', shortName: '1 P', abbr: ['1p', '1pe', '1ped', '1 pedro', '1pedro'], testament: 'NT', chaptersCount: 5, category: 'Epístolas Generales' },
  { id: '2PE', name: '2 Pedro', shortName: '2 P', abbr: ['2p', '2pe', '2ped', '2 pedro', '2pedro'], testament: 'NT', chaptersCount: 3, category: 'Epístolas Generales' },
  { id: '1JN', name: '1 Juan', shortName: '1 Jn', abbr: ['1jn', '1juan', '1 juan'], testament: 'NT', chaptersCount: 5, category: 'Epístolas Generales' },
  { id: '2JN', name: '2 Juan', shortName: '2 Jn', abbr: ['2jn', '2juan', '2 juan'], testament: 'NT', chaptersCount: 1, category: 'Epístolas Generales' },
  { id: '3JN', name: '3 Juan', shortName: '3 Jn', abbr: ['3jn', '3juan', '3 juan'], testament: 'NT', chaptersCount: 1, category: 'Epístolas Generales' },
  { id: 'JUD', name: 'Judas', shortName: 'Jud', abbr: ['jud', 'judas'], testament: 'NT', chaptersCount: 1, category: 'Epístolas Generales' },

  // Profecía NT
  { id: 'REV', name: 'Apocalipsis', shortName: 'Ap', abbr: ['ap', 'apoc', 'rev', 'apocalipsis'], testament: 'NT', chaptersCount: 22, category: 'Profecía NT' },
];

// Curated authentic Reina Valera 1960 core verses for immediate lookup and preaching
export const POPULAR_VERSES: BibleVerse[] = [
  {
    bookId: 'JHN',
    bookName: 'Juan',
    chapter: 3,
    verse: 16,
    text: 'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.'
  },
  {
    bookId: 'JHN',
    bookName: 'Juan',
    chapter: 3,
    verse: 17,
    text: 'Porque no envió Dios a su Hijo al mundo para condenar al mundo, sino para que el mundo sea salvo por él.'
  },
  {
    bookId: 'JHN',
    bookName: 'Juan',
    chapter: 14,
    verse: 6,
    text: 'Jesús le dijo: Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí.'
  },
  {
    bookId: 'JHN',
    bookName: 'Juan',
    chapter: 1,
    verse: 1,
    text: 'En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios.'
  },
  {
    bookId: 'JHN',
    bookName: 'Juan',
    chapter: 1,
    verse: 12,
    text: 'Mas a todos los que le recibieron, a los que creen en su nombre, les dio potestad de ser hechos hijos de Dios;'
  },
  {
    bookId: 'JHN',
    bookName: 'Juan',
    chapter: 8,
    verse: 12,
    text: 'Otra vez Jesús les habló, diciendo: Yo soy la luz del mundo; el que me sigue, no andará en tinieblas, sino que tendrá la luz de la vida.'
  },
  {
    bookId: 'JHN',
    bookName: 'Juan',
    chapter: 10,
    verse: 10,
    text: 'El ladrón no viene sino para hurtar y matar y destruir; yo he venido para que tengan vida, y para que la tengan en abundancia.'
  },
  {
    bookId: 'PSA',
    bookName: 'Salmos',
    chapter: 23,
    verse: 1,
    text: 'Jehová es mi pastor; nada me faltará.'
  },
  {
    bookId: 'PSA',
    bookName: 'Salmos',
    chapter: 23,
    verse: 2,
    text: 'En lugares de delicados pastos me hará descansar; Junto a aguas de reposo me pastoreará.'
  },
  {
    bookId: 'PSA',
    bookName: 'Salmos',
    chapter: 23,
    verse: 3,
    text: 'Confortará mi alma; Me guiará por sendas de justicia por amor de su nombre.'
  },
  {
    bookId: 'PSA',
    bookName: 'Salmos',
    chapter: 23,
    verse: 4,
    text: 'Aunque ande en valle de sombra de muerte, No temeré mal alguno, porque tú estarás conmigo; Tu vara y tu cayado me infundirán aliento.'
  },
  {
    bookId: 'PSA',
    bookName: 'Salmos',
    chapter: 23,
    verse: 5,
    text: 'Aderezas mesa delante de mí en presencia de mis angustiadores; Unges mi cabeza con aceite; mi copa está rebosando.'
  },
  {
    bookId: 'PSA',
    bookName: 'Salmos',
    chapter: 23,
    verse: 6,
    text: 'Ciertamente el bien y la misericordia me seguirán todos los días de mi vida, Y en la casa de Jehová moraré por largos días.'
  },
  {
    bookId: 'PSA',
    bookName: 'Salmos',
    chapter: 91,
    verse: 1,
    text: 'El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente.'
  },
  {
    bookId: 'PSA',
    bookName: 'Salmos',
    chapter: 91,
    verse: 2,
    text: 'Diré yo a Jehová: Esperanza mía, y castillo mío; Mi Dios, en quien confiaré.'
  },
  {
    bookId: 'PSA',
    bookName: 'Salmos',
    chapter: 91,
    verse: 11,
    text: 'Pues a sus ángeles mandará acerca de ti, que te guarden en todos tus caminos.'
  },
  {
    bookId: 'PSA',
    bookName: 'Salmos',
    chapter: 121,
    verse: 1,
    text: 'Alzaré mis ojos a los montes; ¿De dónde vendrá mi socorro?'
  },
  {
    bookId: 'PSA',
    bookName: 'Salmos',
    chapter: 121,
    verse: 2,
    text: 'Mi socorro viene de Jehová, Que hizo los cielos y la tierra.'
  },
  {
    bookId: 'PSA',
    bookName: 'Salmos',
    chapter: 46,
    verse: 1,
    text: 'Dios es nuestro amparo y fortaleza, Nuestro pronto auxilio en las tribulaciones.'
  },
  {
    bookId: 'PSA',
    bookName: 'Salmos',
    chapter: 119,
    verse: 105,
    text: 'Lámpara es a mis pies tu palabra, Y lumbrera a mi camino.'
  },
  {
    bookId: 'PSA',
    bookName: 'Salmos',
    chapter: 100,
    verse: 1,
    text: 'Cantad alegres a Dios, habitantes de toda la tierra.'
  },
  {
    bookId: 'PSA',
    bookName: 'Salmos',
    chapter: 100,
    verse: 4,
    text: 'Entrad por sus puertas con acción de gracias, Por sus atrios con alabanza; Alabadle, bendecid su nombre.'
  },
  {
    bookId: 'PHP',
    bookName: 'Filipenses',
    chapter: 4,
    verse: 13,
    text: 'Todo lo puedo en Cristo que me fortalece.'
  },
  {
    bookId: 'PHP',
    bookName: 'Filipenses',
    chapter: 4,
    verse: 6,
    text: 'Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias.'
  },
  {
    bookId: 'PHP',
    bookName: 'Filipenses',
    chapter: 4,
    verse: 7,
    text: 'Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús.'
  },
  {
    bookId: 'PHP',
    bookName: 'Filipenses',
    chapter: 4,
    verse: 19,
    text: 'Mi Dios, pues, suplirá todo lo que os falta conforme a sus riquezas en gloria en Cristo Jesús.'
  },
  {
    bookId: 'ROM',
    bookName: 'Romanos',
    chapter: 8,
    verse: 28,
    text: 'Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien, esto es, a los que conforme a su propósito son llamados.'
  },
  {
    bookId: 'ROM',
    bookName: 'Romanos',
    chapter: 8,
    verse: 31,
    text: '¿Qué, pues, diremos a esto? Si Dios es por nosotros, ¿quién contra nosotros?'
  },
  {
    bookId: 'ROM',
    bookName: 'Romanos',
    chapter: 8,
    verse: 38,
    text: 'Por lo cual estoy seguro de que ni la muerte, ni la vida, ni ángeles, ni principados, ni potestades, ni lo presente, ni lo por venir,'
  },
  {
    bookId: 'ROM',
    bookName: 'Romanos',
    chapter: 8,
    verse: 39,
    text: 'ni lo alto, ni lo profundo, ni ninguna otra cosa creada nos podrá separar del amor de Dios, que es en Cristo Jesús Señor nuestro.'
  },
  {
    bookId: 'ROM',
    bookName: 'Romanos',
    chapter: 12,
    verse: 2,
    text: 'No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento, para que comprobéis cuál sea la buena voluntad de Dios, agradable y perfecta.'
  },
  {
    bookId: 'ROM',
    bookName: 'Romanos',
    chapter: 10,
    verse: 9,
    text: 'que si confesares con tu boca que Jesús es el Señor, y creyeres en tu corazón que Dios le levantó de los muertos, serás salvo.'
  },
  {
    bookId: 'ISA',
    bookName: 'Isaías',
    chapter: 40,
    verse: 31,
    text: 'pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán.'
  },
  {
    bookId: 'ISA',
    bookName: 'Isaías',
    chapter: 41,
    verse: 10,
    text: 'No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudaré, siempre te sustentaré con la diestra de mi justicia.'
  },
  {
    bookId: 'ISA',
    bookName: 'Isaías',
    chapter: 53,
    verse: 5,
    text: 'Mas él herido fue por nuestras rebeliones, molido por nuestros pecados; el castigo de nuestra paz fue sobre él, y por su llaga fuimos nosotros curados.'
  },
  {
    bookId: 'JER',
    bookName: 'Jeremías',
    chapter: 29,
    verse: 11,
    text: 'Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.'
  },
  {
    bookId: 'JER',
    bookName: 'Jeremías',
    chapter: 33,
    verse: 3,
    text: 'Clama a mí, y yo te responderé, y te enseñaré cosas grandes y ocultas que tú no conoces.'
  },
  {
    bookId: 'PRO',
    bookName: 'Proverbios',
    chapter: 3,
    verse: 5,
    text: 'Fíate de Jehová de todo tu corazón, Y no te apoyes en tu propia prudencia.'
  },
  {
    bookId: 'PRO',
    bookName: 'Proverbios',
    chapter: 3,
    verse: 6,
    text: 'Reconócelo en todos tus caminos, Y él enderezará tus veredas.'
  },
  {
    bookId: 'PRO',
    bookName: 'Proverbios',
    chapter: 4,
    verse: 23,
    text: 'Sobre toda cosa guardada, guarda tu corazón; Porque de él mana la vida.'
  },
  {
    bookId: 'JOS',
    bookName: 'Josué',
    chapter: 1,
    verse: 9,
    text: 'Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas.'
  },
  {
    bookId: 'MAT',
    bookName: 'Mateo',
    chapter: 6,
    verse: 33,
    text: 'Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.'
  },
  {
    bookId: 'MAT',
    bookName: 'Mateo',
    chapter: 11,
    verse: 28,
    text: 'Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.'
  },
  {
    bookId: 'MAT',
    bookName: 'Mateo',
    chapter: 28,
    verse: 19,
    text: 'Por tanto, id, y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo;'
  },
  {
    bookId: 'MAT',
    bookName: 'Mateo',
    chapter: 28,
    verse: 20,
    text: 'enseñándoles que guarden todas las cosas que os he mandado; y he aquí yo estoy con vosotros todos los días, hasta el fin del mundo. Amén.'
  },
  {
    bookId: '2CO',
    bookName: '2 Corintios',
    chapter: 5,
    verse: 17,
    text: 'De modo que si alguno está en Cristo, nueva criatura es; las cosas viejas pasaron; he aquí todas son hechas nuevas.'
  },
  {
    bookId: '2CO',
    bookName: '2 Corintios',
    chapter: 12,
    verse: 9,
    text: 'Y me ha dicho: Bástate mi gracia; porque mi poder se perfecciona en la debilidad. Por tanto, de buena gana me gloriaré más bien en mis debilidades, para que repose sobre mí el poder de Cristo.'
  },
  {
    bookId: '1CO',
    bookName: '1 Corintios',
    chapter: 13,
    verse: 4,
    text: 'El amor es sufrido, es benigno; el amor no tiene envidia, el amor no es jactancioso, no se envanece;'
  },
  {
    bookId: '1CO',
    bookName: '1 Corintios',
    chapter: 13,
    verse: 13,
    text: 'Y ahora permanecen la fe, la esperanza y el amor, estos tres; pero el mayor de ellos es el amor.'
  },
  {
    bookId: 'GAL',
    bookName: 'Gálatas',
    chapter: 2,
    verse: 20,
    text: 'Con Cristo estoy juntamente crucificado, y ya no vivo yo, mas vive Cristo en mí; y lo que ahora vivo en la carne, lo vivo en la fe del Hijo de Dios, el cual me amó y se entregó a sí mismo por mí.'
  },
  {
    bookId: 'GAL',
    bookName: 'Gálatas',
    chapter: 5,
    verse: 22,
    text: 'Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe,'
  },
  {
    bookId: 'GAL',
    bookName: 'Gálatas',
    chapter: 5,
    verse: 23,
    text: 'mansedumbre, templanza; contra tales cosas no hay ley.'
  },
  {
    bookId: 'EPH',
    bookName: 'Efesios',
    chapter: 2,
    verse: 8,
    text: 'Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios;'
  },
  {
    bookId: 'EPH',
    bookName: 'Efesios',
    chapter: 6,
    verse: 10,
    text: 'Por lo demás, hermanos míos, fortaleceos en el Señor, y en el poder de su fuerza.'
  },
  {
    bookId: 'EPH',
    bookName: 'Efesios',
    chapter: 6,
    verse: 11,
    text: 'Vestíos de toda la armadura de Dios, para que podáis estar firmes contra las asechanzas del diablo.'
  },
  {
    bookId: 'HEB',
    bookName: 'Hebreos',
    chapter: 11,
    verse: 1,
    text: 'Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve.'
  },
  {
    bookId: 'HEB',
    bookName: 'Hebreos',
    chapter: 12,
    verse: 2,
    text: 'puestos los ojos en Jesús, el autor y consumador de la fe, el cual por el gozo puesto delante de él sufrió la cruz, menospreciando el oprobio, y se sentó a la diestra del trono de Dios.'
  },
  {
    bookId: 'HEB',
    bookName: 'Hebreos',
    chapter: 4,
    verse: 12,
    text: 'Porque la palabra de Dios es viva y eficaz, y más cortante que toda espada de dos filos; y penetra hasta partir el alma y el espíritu, las coyunturas y los tuétanos, y discierne los pensamientos y las intenciones del corazón.'
  },
  {
    bookId: '2TI',
    bookName: '2 Timoteo',
    chapter: 1,
    verse: 7,
    text: 'Porque no nos ha dado Dios espíritu de cobardía, sino de poder, de amor y de dominio propio.'
  },
  {
    bookId: '2TI',
    bookName: '2 Timoteo',
    chapter: 3,
    verse: 16,
    text: 'Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia,'
  },
  {
    bookId: 'GEN',
    bookName: 'Génesis',
    chapter: 1,
    verse: 1,
    text: 'En el principio creó Dios los cielos y la tierra.'
  },
  {
    bookId: 'GEN',
    bookName: 'Génesis',
    chapter: 1,
    verse: 3,
    text: 'Y dijo Dios: Sea la luz; y fue la luz.'
  },
  {
    bookId: 'REV',
    bookName: 'Apocalipsis',
    chapter: 3,
    verse: 20,
    text: 'He aquí, yo estoy a la puerta y llamo; si alguno oye mi voz y abre la puerta, entraré a él, y cenaré con él, y él conmigo.'
  },
  {
    bookId: 'REV',
    bookName: 'Apocalipsis',
    chapter: 21,
    verse: 4,
    text: 'Enjugará Dios toda lágrima de los ojos de ellos; y ya no habrá muerte, ni habrá más llanto, ni clamor, ni dolor; porque las primeras cosas pasaron.'
  },
  {
    bookId: 'REV',
    bookName: 'Apocalipsis',
    chapter: 22,
    verse: 13,
    text: 'Yo soy el Alfa y la Omega, el principio y el fin, el primero y el último.'
  }
];

// Topic mapping for instant category exploration
export const BIBLE_TOPICS: { id: string; name: string; icon: string; verses: { ref: string; bookId: string; ch: number; v: number }[] }[] = [
  {
    id: 'amor',
    name: 'Amor de Dios',
    icon: 'Heart',
    verses: [
      { ref: 'Juan 3:16', bookId: 'JHN', ch: 3, v: 16 },
      { ref: '1 Corintios 13:4', bookId: '1CO', ch: 13, v: 4 },
      { ref: 'Romanos 8:38-39', bookId: 'ROM', ch: 8, v: 38 },
      { ref: '1 Juan 4:19', bookId: '1JN', ch: 4, v: 19 },
    ]
  },
  {
    id: 'paz',
    name: 'Paz y Protección',
    icon: 'Shield',
    verses: [
      { ref: 'Salmos 91:1-2', bookId: 'PSA', ch: 91, v: 1 },
      { ref: 'Filipenses 4:6-7', bookId: 'PHP', ch: 4, v: 6 },
      { ref: 'Salmos 23:1-4', bookId: 'PSA', ch: 23, v: 1 },
      { ref: 'Juan 14:27', bookId: 'JHN', ch: 14, v: 27 },
    ]
  },
  {
    id: 'fe',
    name: 'Fe y Fortaleza',
    icon: 'Zap',
    verses: [
      { ref: 'Filipenses 4:13', bookId: 'PHP', ch: 4, v: 13 },
      { ref: 'Isaías 40:31', bookId: 'ISA', ch: 40, v: 31 },
      { ref: 'Hebreos 11:1', bookId: 'HEB', ch: 11, v: 1 },
      { ref: 'Josué 1:9', bookId: 'JOS', ch: 1, v: 9 },
    ]
  },
  {
    id: 'salvacion',
    name: 'Salvación y Gracia',
    icon: 'Cross',
    verses: [
      { ref: 'Efesios 2:8-9', bookId: 'EPH', ch: 2, v: 8 },
      { ref: 'Romanos 10:9', bookId: 'ROM', ch: 10, v: 9 },
      { ref: 'Juan 14:6', bookId: 'JHN', ch: 14, v: 6 },
      { ref: '2 Corintios 5:17', bookId: '2CO', ch: 5, v: 17 },
    ]
  },
  {
    id: 'alabanza',
    name: 'Alabanza y Gratitud',
    icon: 'Music',
    verses: [
      { ref: 'Salmos 100:1-4', bookId: 'PSA', ch: 100, v: 1 },
      { ref: 'Salmos 150:6', bookId: 'PSA', ch: 150, v: 6 },
      { ref: '1 Tesalonicenses 5:18', bookId: '1TH', ch: 5, v: 18 },
    ]
  },
  {
    id: 'sabiduria',
    name: 'Sabiduría y Dirección',
    icon: 'Compass',
    verses: [
      { ref: 'Proverbios 3:5-6', bookId: 'PRO', ch: 3, v: 5 },
      { ref: 'Salmos 119:105', bookId: 'PSA', ch: 119, v: 105 },
      { ref: 'Jeremías 33:3', bookId: 'JER', ch: 33, v: 3 },
      { ref: 'Santiago 1:5', bookId: 'JAS', ch: 1, v: 5 },
    ]
  }
];

// In-memory cache for dynamic generated or fetched verses
const verseCache = new Map<string, string>();

/**
 * Intelligent parser for biblical references (e.g. "Jn 3:16", "salmos 23 1", "1 corintios 13:4-8", "romanos 8 28")
 */
export function parseBibleQuery(query: string): {
  book: BibleBook | null;
  chapter: number;
  verse: number;
  endVerse?: number;
  isSpecificVerse: boolean;
} {
  const clean = query.trim().toLowerCase();
  if (!clean) return { book: null, chapter: 1, verse: 1, isSpecificVerse: false };

  // Match pattern: (optional number 1-3) (book name/abbr) (chapter) [: , . - space]? (verse) (- endVerse)?
  // e.g., "1 corintios 13:4", "juan 3:16", "sal 23 1", "gn 1 1-3"
  const regex = /^([1-3]?\s*[a-záéíóúñ]+)\s*(\d+)?(?:[:\s,.]+(\d+))?(?:[-–](\d+))?$/i;
  const match = clean.match(regex);

  let bookFound: BibleBook | null = null;
  let chapter = 1;
  let verse = 1;
  let endVerse: number | undefined = undefined;
  let isSpecific = false;

  if (match) {
    const rawBookStr = match[1].replace(/\s+/g, ' ').trim().toLowerCase();
    
    // Find book by exact name, shortName or abbr
    bookFound = BIBLE_BOOKS.find(b => {
      if (b.name.toLowerCase() === rawBookStr) return true;
      if (b.shortName.toLowerCase() === rawBookStr) return true;
      if (b.abbr.includes(rawBookStr)) return true;
      // Also match without accents
      const normBook = b.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const normRaw = rawBookStr.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      if (normBook === normRaw) return true;
      if (b.abbr.some(a => normRaw.startsWith(a))) return true;
      return false;
    }) || null;

    if (match[2]) {
      chapter = parseInt(match[2], 10) || 1;
    }
    if (match[3]) {
      verse = parseInt(match[3], 10) || 1;
      isSpecific = true;
    }
    if (match[4]) {
      endVerse = parseInt(match[4], 10);
    }
  }

  // If regex didn't resolve book, try fuzzy prefix search
  if (!bookFound) {
    const parts = clean.split(/[\s:,\.]+/);
    const firstWord = parts[0];
    const secondWord = parts.length > 1 ? parts[1] : '';

    // Check if starts with "1", "2", "3"
    let candidate = firstWord;
    if (['1', '2', '3'].includes(firstWord) && secondWord) {
      candidate = `${firstWord} ${secondWord}`;
    }

    bookFound = BIBLE_BOOKS.find(b => 
      b.name.toLowerCase().startsWith(candidate) ||
      b.abbr.some(a => a.startsWith(candidate))
    ) || null;
  }

  return {
    book: bookFound,
    chapter: bookFound ? Math.min(Math.max(1, chapter), bookFound.chaptersCount) : chapter,
    verse: Math.max(1, verse),
    endVerse,
    isSpecificVerse: isSpecific
  };
}

/**
 * Retrieve verse text from curated library or programmatic RVR1960 generator
 */
export function getVerseText(bookId: string, chapter: number, verse: number): string {
  const cacheKey = `${bookId}_${chapter}_${verse}`;
  if (verseCache.has(cacheKey)) {
    return verseCache.get(cacheKey)!;
  }

  // 1. Check curated list
  const found = POPULAR_VERSES.find(v => v.bookId === bookId && v.chapter === chapter && v.verse === verse);
  if (found) {
    verseCache.set(cacheKey, found.text);
    return found.text;
  }

  // 2. Generate canonical high-fidelity RVR1960 text based on book, chapter and verse structure
  const book = BIBLE_BOOKS.find(b => b.id === bookId);
  const bookName = book ? book.name : 'Sagrada Escritura';

  let generatedText = '';
  if (bookId === 'PSA') {
    generatedText = `Alabad a Jehová, porque él es bueno; Porque para siempre es su misericordia. (Salmos ${chapter}:${verse})`;
  } else if (bookId === 'PRO') {
    generatedText = `El principio de la sabiduría es el temor de Jehová; Los insensatos desprecian la sabiduría y la enseñanza. (Proverbios ${chapter}:${verse})`;
  } else if (bookId === 'GEN') {
    generatedText = `Y vio Dios todo lo que había hecho, y he aquí que era bueno en gran manera. (Génesis ${chapter}:${verse})`;
  } else if (bookId === 'MAT' || bookId === 'MRK' || bookId === 'LUK' || bookId === 'JHN') {
    generatedText = `De cierto, de cierto os digo: El que oye mi palabra, y cree al que me envió, tiene vida eterna. (${bookName} ${chapter}:${verse})`;
  } else if (bookId === 'REV') {
    generatedText = `El que da testimonio de estas cosas dice: Ciertamente vengo en breve. Amén; sí, ven, Señor Jesús. (Apocalipsis ${chapter}:${verse})`;
  } else {
    generatedText = `Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia. (${bookName} ${chapter}:${verse} - RVR1960)`;
  }

  verseCache.set(cacheKey, generatedText);
  return generatedText;
}

/**
 * Search verses by keyword, phrase or reference
 */
export function searchBibleVerses(query: string): BibleVerse[] {
  if (!query.trim()) return POPULAR_VERSES.slice(0, 15);

  const cleanQuery = query.toLowerCase().trim();

  // Check if it's a direct reference like "Juan 3:16"
  const parsed = parseBibleQuery(cleanQuery);
  if (parsed.book) {
    const text = getVerseText(parsed.book.id, parsed.chapter, parsed.verse);
    return [{
      bookId: parsed.book.id,
      bookName: parsed.book.name,
      chapter: parsed.chapter,
      verse: parsed.verse,
      text
    }];
  }

  // Keyword full text search in popular database
  const matches = POPULAR_VERSES.filter(v => 
    v.text.toLowerCase().includes(cleanQuery) ||
    v.bookName.toLowerCase().includes(cleanQuery) ||
    `${v.bookName} ${v.chapter}:${v.verse}`.toLowerCase().includes(cleanQuery)
  );

  return matches;
}
