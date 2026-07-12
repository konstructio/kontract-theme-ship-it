/* Ship It! — pixel sprite library. All colors from Civo DS tokens.
   Sprites are char-grid rows; spriteShadow() bakes them into a box-shadow
   string (one s×s square per pixel). Exposed as window.SHIPIT_SPRITES. */
window.SHIPIT_SPRITES = (function () {

  // rows: array of strings, colors: {char:hex}, s: pixel size, ox/oy: grid offset
  function shadow(rows, colors, s, ox, oy) {
    ox = ox || 0; oy = oy || 0;
    var out = [];
    for (var y = 0; y < rows.length; y++) {
      var r = rows[y];
      for (var x = 0; x < r.length; x++) {
        var ch = r[x];
        if (ch === '.' || ch === ' ') continue;
        var c = colors[ch];
        if (!c) continue;
        out.push(((ox + x) * s) + 'px ' + ((oy + y) * s) + 'px 0 0 ' + c);
      }
    }
    return out.join(',');
  }

  /* ── SPECIES bodies — canvas 22×26, body at (4,6), 14 wide ──
     shared torso box so suits fit every species.
     chars: h hair/fur/shell · s skin · k dark · p blush · u undersuit · b boot */
  var SPECIES = [
    { name: 'ENGINEER', oy: 6, colors: { h: '#57534d', s: '#ffd6a7', k: '#111518', p: '#ff9eba', u: '#4b5d6c', b: '#263237' },
      rows: [
        '...hhhhhhhh',
        '..hhhhhhhhhh',
        '..hhssssssshh',
        '..hsssssssssh',
        '..hsksssskssh',
        '..hspskksps',
        '...ssssssss',
        '....ssssss',
        '.....uuuu',
        '...uuuuuuuu',
        '..suuuuuuuus',
        '..suuuuuuuus',
        '...uuuuuuuu',
        '....uuuuuu',
        '....uu..uu',
        '....uu..uu',
        '...bbb..bbb',
        '...bbb..bbb'
      ] },
    { name: 'BOT', oy: 4, colors: { h: '#c3cdd5', s: '#c3cdd5', k: '#111518', g: '#00ff6f', d: '#263237', u: '#9fafbc', b: '#3b4954' },
      rows: [
        '.......g',
        '.......h',
        '..hhhhhhhhhh',
        '..hddddddddh',
        '..hdgddddgdh',
        '..hddddddddh',
        '..hdggggggdh',
        '..hhhhhhhhhh',
        '......hh',
        '.....uuuu',
        '...uuuuuuuu',
        '..suuuuuuuus',
        '..suuuuuuuus',
        '...uuuuuuuu',
        '....uuuuuu',
        '....uu..uu',
        '....uu..uu',
        '...bbb..bbb',
        '...bbb..bbb'
      ] },
    { name: 'SPACE CAT', oy: 4, colors: { h: '#ffd230', s: '#ffd230', k: '#111518', p: '#ff9eba', w: '#f3f5f7', u: '#4b5d6c', b: '#263237' },
      rows: [
        '...h......h',
        '...hh....hh',
        '..hhphhhhphh',
        '..hhhhhhhhhh',
        '..hhkhhhhkhh',
        '.whhhhkkhhhhw',
        '...hhhhhhhh',
        '....hhhhhh',
        '.....uuuu',
        '...uuuuuuuu',
        '..suuuuuuuus',
        '..suuuuuuuus',
        '...uuuuuuuu',
        '....uuuuuu',
        '....uu..uu',
        '....uu..uu',
        '...bbb..bbb',
        '...bbb..bbb'
      ] },
    { name: 'BLOB', oy: 4, colors: { h: '#7bf1a8', s: '#7bf1a8', k: '#111518', A: '#05df72', w: '#f3f5f7', u: '#4b5d6c', b: '#263237' },
      rows: [
        '......AA',
        '.......A',
        '....hhhhhh',
        '..hhhhhhhhhh',
        '..hhkwhhkwhh',
        '..hhkkhhkkhh',
        '..hhhhhhhhhh',
        '...hhhkkhhh',
        '.....uuuu',
        '...uuuuuuuu',
        '..suuuuuuuus',
        '..suuuuuuuus',
        '...uuuuuuuu',
        '....uuuuuu',
        '....uu..uu',
        '....uu..uu',
        '...bbb..bbb',
        '...bbb..bbb'
      ] }
  ];

  /* ── SUITS — overlay at (4,15): sleeves y1 full, hands peek y2 ──
     chars: c main · t trim/belt+emblem · B boots */
  var SUIT_ROWS = [
    '...cccccccc',
    '..cccctcccc',
    '...ccccccc',
    '...cccccccc',
    '....tttttt',
    '....cc..cc',
    '....cc..cc',
    '...BBB..BBB',
    '...BBB..BBB'
  ];
  var SUITS = [
    { name: 'CADET',     colors: { c: '#4b5d6c', t: '#00ff6f', B: '#263237' } },
    { name: 'AURORA',    colors: { c: '#0d542b', t: '#00ff6f', B: '#3b4954' } },
    { name: 'OCEAN',     colors: { c: '#0069a8', t: '#74d4ff', B: '#052f4a' } },
    { name: 'SUNSET',    colors: { c: '#f54900', t: '#ffd230', B: '#7e2a0c' } },
    { name: 'ROSE',      colors: { c: '#e60076', t: '#ff9eba', B: '#510523' } },
    { name: 'GOLD RUSH', colors: { c: '#e17100', t: '#fdc700', B: '#432004' }, minLevel: 4 }
  ];

  /* ── HELMETS — drawn over the head, canvas coords ── */
  var HELMETS = [
    { name: 'BARE HEAD', ox: 0, oy: 0, colors: {}, rows: [] },
    { name: 'BUBBLE', ox: 4, oy: 4, colors: { o: '#9fafbc', w: '#f3f5f7' },
      rows: [
        '....oooooo',
        '..oo......oo',
        '.o..........o',
        '.ow..........o',
        '.oww.........o',
        '.o...........o',
        '.o...........o',
        '.o...........o',
        '..oo........oo',
        '....oooooo.oo'
      ] },
    { name: 'VISOR', ox: 5, oy: 9, colors: { g: '#00ff6f', w: '#f3f5f7', k: '#111518' },
      rows: [
        'kggggggggggk',
        'kgwggggggggk'
      ] },
    { name: 'RETRO CAP', ox: 5, oy: 4, colors: { c: '#dc2626', w: '#f3f5f7', k: '#111518' },
      rows: [
        '...cccccc',
        '..cccwwccc',
        '.ccccwwcccc',
        'kccccccccccck'
      ] },
    { name: 'CROWN', ox: 6, oy: 3, colors: { y: '#fdc700', o: '#e17100' },
      rows: [
        'y..y..y..y',
        'yy.yy.yy.yy',
        'yyyyyyyyyyy',
        'oooooooooo'
      ], minLevel: 3 }
  ];

  /* ── CAPES — drawn first (behind body), canvas coords ── */
  var CAPE_ROWS = [
    '.cccccccccccc',
    'cccccccccccccc',
    'cccccccccccccc',
    'cccccccccccccc',
    'ccccccccccccccc',
    'ccccccccccccccc',
    'ccdcccccccdcccc',
    'cc.ccdcccc.cdcc',
    'c...c..c.....c'
  ];
  var CAPES = [
    { name: 'NO CAPE', rows: [], colors: {} },
    { name: 'HERO RED',  rows: CAPE_ROWS, colors: { c: '#e7000b', d: '#82181a' } },
    { name: 'AURORA',    rows: CAPE_ROWS, colors: { c: '#00a63e', d: '#0d542b' }, minLevel: 2 },
    { name: 'STARLIGHT', rows: [
        '.cccccccccccc',
        'ccccwccccccccc',
        'cccccccccwcccc',
        'ccwccccccccccc',
        'ccccccccwcccccc',
        'cccwccccccccccc',
        'ccdcccccwcdcccc',
        'cc.ccdcccc.cdcc',
        'c...c..c.....c'
      ], colors: { c: '#432dd7', d: '#1e1a4d', w: '#f3f5f7' }, minLevel: 5 }
  ];

  /* ── GADGETS — right hand, canvas coords ~(15,13) ── */
  var GADGETS = [
    { name: 'PIXEL WRENCH', ox: 15, oy: 13, colors: { m: '#c3cdd5', M: '#4b5d6c' },
      rows: [
        '.m.m',
        '.mmm',
        '..Mm',
        '..M',
        '..M',
        '..M'
      ] },
    { name: 'KUBECTL BLASTER', ox: 15, oy: 14, colors: { d: '#263237', g: '#00ff6f', w: '#f3f5f7' },
      rows: [
        '.dddd',
        '.dddg',
        '.dw',
        '.dd'
      ] },
    { name: 'HELM WHEEL', ox: 15, oy: 13, colors: { M: '#9fafbc', g: '#00ff6f', d: '#3b4954' },
      rows: [
        '.MMMM',
        'Mg..gM',
        'M.gg.M',
        'M.gg.M',
        'Mg..gM',
        '.MMMM'
      ] },
    { name: 'DEV FUEL', ox: 16, oy: 13, colors: { w: '#f3f5f7', a: '#bb4d00', s: '#9fafbc' },
      rows: [
        '.s.s',
        's.s',
        'wwww',
        'waaww',
        'wwww'
      ] },
    { name: 'GOLD KEYBOARD', ox: 14, oy: 15, colors: { y: '#fdc700', k: '#111518', o: '#e17100' },
      rows: [
        'yyyyyyy',
        'ykykyky',
        'yyyyyyy',
        'ooooooo'
      ], minLevel: 4 }
  ];

  /* ── PLANETS — 20×20 disc with dither shading + craters ──
     chars: a land · b land shade · o deep · c highlight */
  var PLANET_ROWS = [
    '.......aaaaaa',
    '.....aaccaaaaaa',
    '....acccaaaabbaa',
    '...accaaaaaabbbaa',
    '..acaaaaobbaaabaa.',
    '..aaaaaoobbaaaaaaa',
    '.aaaaaaoooaaaaabbaa',
    '.aabaaaaoaaaaaabbba',
    '.abbaaaaaaaabaabbaa',
    '.abbbaaaooaabbaaaaa',
    '.aabaaaooooaabaaaaa',
    '.aaaaaaaooaaaaaaoba',
    '.aaaobaaaaaaaaaooaa',
    '..aoobaaaabbaaaoaa',
    '..aaoaaaabbbbaaaaa',
    '...aaaaaabbaaaaaa',
    '....aaaaaaaaaaaa',
    '.....aaaaaaaaaa',
    '.......aaaaaa'
  ];
  var PLANET_LOOKS = [
    { name: 'MINT',  colors: { a: '#05df72', b: '#00a63e', o: '#0d542b', c: '#7bf1a8' } },
    { name: 'ICE',   colors: { a: '#74d4ff', b: '#00a6f4', o: '#024a70', c: '#dff2fe' } },
    { name: 'LAVA',  colors: { a: '#ff8904', b: '#e7000b', o: '#460809', c: '#ffd230' } },
    { name: 'CANDY', colors: { a: '#ff9eba', b: '#e60076', o: '#510523', c: '#ffe4e6' } },
    { name: 'DUSK',  colors: { a: '#7c86ff', b: '#432dd7', o: '#1e1a4d', c: '#a3b3ff' } }
  ];

  /* ── ROCKET — 13×22 ── */
  var ROCKET = {
    colors: { g: '#00ff6f', G: '#00a63e', w: '#f3f5f7', m: '#c3cdd5', d: '#263237', b: '#74d4ff', M: '#4b5d6c' },
    rows: [
      '......g',
      '.....ggg',
      '....ggggg',
      '....ggggg',
      '...wwwwwww',
      '...wwwwwww',
      '..wwwwwwwww',
      '..wwwGGGwww',
      '..wwGbbbGww',
      '..wwGbbbGww',
      '..wwwGGGwww',
      '..wwwwwwwww',
      '..wwwwwwwww',
      '..mwwwwwwwm',
      '..mwwwwwwwm',
      '.gmwwwwwwwmg',
      'ggmmwwwwwmmgg',
      'ggmmmmmmmmmgg',
      'gg.MMMMMMM.gg',
      '...M.M.M.M',
      '...M.M.M.M'
    ] };
  var FLAME_A = { colors: { y: '#ffd230', o: '#ff6900', r: '#e7000b' },
    rows: ['.oyyyo', 'oyyyyyo', '.oyyyo', '..oyo', '..rr', '...r'] };
  var FLAME_B = { colors: { y: '#ffd230', o: '#ff6900', r: '#e7000b' },
    rows: ['.oyyo', 'oyyyyo', 'oyyyyo', '.oyyo', '..oo', '..r'] };

  /* ── POD — app instance dome, 10×8 ── */
  var POD = {
    colors: { b: '#74d4ff', w: '#f3f5f7', M: '#4b5d6c', d: '#263237', g: '#00ff6f' },
    rows: [
      '...bbbb',
      '..bwwbbb',
      '.bwbbbbbb',
      '.bbbbbbbb',
      'MMMMMMMMMM',
      'MddddddddM',
      'MddgddddgM',
      'MMMMMMMMMM'
    ] };

  /* ── APP GRAPHIC ALTERNATES ── */
  var SAT = {
    colors: { g: '#00ff6f', G: '#00a63e', k: '#111518', w: '#f3f5f7', b: '#74d4ff', m: '#9fafbc' },
    rows: [
      '....w',
      '....k',
      'gg.kwwk.gg',
      'GG.wbbw.GG',
      'gg.kwwk.gg',
      '.....m'
    ] };
  var BEACON = {
    colors: { k: '#111518', w: '#f3f5f7', g: '#00ff6f', m: '#9fafbc', d: '#263237' },
    rows: [
      '.....g',
      '.....w',
      '....kkk',
      '..kkwwwkk',
      '.kwwwwwwwk',
      '.kwgggggwk',
      '.kwgggggwk',
      '.kwwwwwwwk',
      'kkkkkkkkkkk',
      '.kdddddddk',
      '..kkkkkkk'
    ] };
  var CONTAINERS = {
    colors: { k: '#111518', b: '#74d4ff', a: '#ffb86a', d: '#263237' },
    rows: [
      '.kkkkkkkk',
      '.kbdbdbbk',
      '.kbdbdbbk',
      '.kkkkkkkk',
      'kkkkkkkkkk',
      'kadadadaak',
      'kadadadaak',
      'kkkkkkkkkk'
    ] };

  /* ── PILLS — protein pill bottle, 6×8 ── */
  var PILLS = {
    colors: { k: '#111518', w: '#f3f5f7', g: '#00ff6f' },
    rows: [
      '..kk',
      '.kggk',
      '.kggk',
      'kwwwwk',
      'kwggwk',
      'kwggwk',
      'kwwwwk',
      'kkkkkk'
    ] };

  /* ── CRATE — code payload, 8×6 ── */
  var CRATE = {
    colors: { a: '#ffb86a', o: '#bb4d00', k: '#111518', g: '#00ff6f' },
    rows: [
      'kkkkkkkk',
      'kaaaaaak',
      'kaaggaak',
      'kaaggaak',
      'kaaaaaak',
      'kkkkkkkk'
    ] };

  /* ── STAR — celebration burst, 7×7 ── */
  var STAR = {
    colors: { g: '#00ff6f', w: '#f3f5f7' },
    rows: [
      '...g',
      '...g',
      '..ggg',
      'ggwwwgg',
      '..ggg',
      '...g',
      '...g'
    ] };

  /* ── COIN — 8×8 ── */
  var COIN = {
    colors: { y: '#fdc700', o: '#e17100', w: '#fef9c2' },
    rows: [
      '..yyyy',
      '.yyyyyy',
      'yywoyyyy',
      'yywoyyyy',
      'yywoyyyy',
      'yywoyyyy',
      '.yyyyyy',
      '..yyyy'
    ] };

  // Compose a hero into ordered layers of {bs (box-shadow), z}
  // hero: {species, helmet, suit, cape, gadget} — indices
  function heroLayers(hero, s) {
    var layers = [];
    var cape = CAPES[hero.cape] || CAPES[0];
    if (cape.rows.length) layers.push({ bs: shadow(cape.rows, cape.colors, s, 3, 14) });
    var sp = SPECIES[hero.species] || SPECIES[0];
    layers.push({ bs: shadow(sp.rows, sp.colors, s, 4, sp.oy) });
    var suit = SUITS[hero.suit] || SUITS[0];
    layers.push({ bs: shadow(SUIT_ROWS, suit.colors, s, 4, 15) });
    var hel = HELMETS[hero.helmet] || HELMETS[0];
    if (hel.rows.length) layers.push({ bs: shadow(hel.rows, hel.colors, s, hel.ox, hel.oy) });
    var gad = GADGETS[hero.gadget] || GADGETS[0];
    if (gad.rows.length) layers.push({ bs: shadow(gad.rows, gad.colors, s, gad.ox, gad.oy) });
    return layers;
  }

  function planetShadow(look, s) {
    var l = PLANET_LOOKS[look] || PLANET_LOOKS[0];
    return shadow(PLANET_ROWS, l.colors, s, 0, 0);
  }

  return {
    shadow: shadow,
    heroLayers: heroLayers,
    planetShadow: planetShadow,
    SPECIES: SPECIES, SUITS: SUITS, HELMETS: HELMETS, CAPES: CAPES, GADGETS: GADGETS, SUIT_ROWS: SUIT_ROWS,
    PLANET_LOOKS: PLANET_LOOKS, PLANET_ROWS: PLANET_ROWS,
    ROCKET: ROCKET, FLAME_A: FLAME_A, FLAME_B: FLAME_B,
    POD: POD, CRATE: CRATE, STAR: STAR, COIN: COIN,
    SAT: SAT, BEACON: BEACON, CONTAINERS: CONTAINERS, PILLS: PILLS,
    HERO_W: 22, HERO_H: 26
  };
})();
