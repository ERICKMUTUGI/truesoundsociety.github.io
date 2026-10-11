const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

toggle?.addEventListener('click', () => nav.classList.toggle('open'));

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

document.getElementById('year').textContent = new Date().getFullYear();


/* Keep the original TSS artwork, but replace only its outer black background with white. */
function whitenLogoBackground(img) {
  if (img.dataset.whiteBgProcessed === 'true') return;
  img.dataset.whiteBgProcessed = 'true';

  const process = () => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);

      const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = image.data;
      const w = canvas.width;
      const h = canvas.height;
      const visited = new Uint8Array(w * h);
      const queue = new Int32Array(w * h);
      let head = 0, tail = 0;

      const isDark = (p) => data[p] < 90 && data[p + 1] < 90 && data[p + 2] < 90;

      const add = (x, y) => {
        const i = y * w + x;
        if (!visited[i] && isDark(i * 4)) {
          visited[i] = 1;
          queue[tail++] = i;
        }
      };

      for (let x = 0; x < w; x++) { add(x, 0); add(x, h - 1); }
      for (let y = 0; y < h; y++) { add(0, y); add(w - 1, y); }

      while (head < tail) {
        const i = queue[head++];
        const x = i % w;
        const y = (i / w) | 0;
        const p = i * 4;

        data[p] = 255;
        data[p + 1] = 255;
        data[p + 2] = 255;
        data[p + 3] = 255;

        if (x > 0) add(x - 1, y);
        if (x < w - 1) add(x + 1, y);
        if (y > 0) add(x, y - 1);
        if (y < h - 1) add(x, y + 1);
      }

      ctx.putImageData(image, 0, 0);
      img.src = canvas.toDataURL('image/png');
    } catch (error) {
      console.warn('TSS logo background adjustment skipped:', error);
    }
  };

  if (img.complete && img.naturalWidth) process();
  else img.addEventListener('load', process, { once: true });
}

document.querySelectorAll('img[src="tss-logo.jpg"]').forEach(whitenLogoBackground);


// English / Kiswahili language switch. English is the default.
(() => {
  const translations = {
    "Home": "Mwanzo",
    "About": "Kuhusu",
    "Founders": "Waanzilishi",
    "Our Focus": "Mambo Tunayozingatia",
    "Vision & Mission": "Maono na Dhamira",
    "Articles": "Makala",
    "Get Involved": "Shiriki",
    "Contact": "Wasiliana",
    "A PURPOSE-DRIVEN DIGITAL COMMUNITY": "JAMII YA KIDIJITALI YENYE LENGO",
    "Consume with care.": "Tumia kwa uangalifu.",
    "Produce with purpose.": "Zalisha kwa kusudi.",
    "True SOUND Society™ is a holistic community built around one powerful idea: what we consume influences what we produce, and what we produce shapes the world around us.": "True SOUND Society™ ni jamii jumuishi inayojengwa juu ya wazo moja muhimu: tunachotumia huathiri tunachozalisha, na tunachozalisha huunda ulimwengu unaotuzunguka.",
    "Discover TSS": "Ijue TSS",
    "Read Our Articles": "Soma Makala Zetu",
    "WHO WE ARE": "SISI NI NANI",
    "More than a name. A way of thinking.": "Zaidi ya jina. Ni namna ya kufikiri.",
    "True SOUND Society™ (TSS) is a purpose-driven digital community and initiative promoting conscious consumption and responsible production.": "True SOUND Society™ (TSS) ni jamii na mpango wa kidijitali wenye lengo, unaohamasisha matumizi yenye ufahamu na uzalishaji wenye uwajibikaji.",
    "We connect everyday choices with the outcomes they create — in agriculture, information, media, technology, business, culture, healthy living and community life.": "Tunaunganisha maamuzi ya kila siku na matokeo yake katika kilimo, taarifa, vyombo vya habari, teknolojia, biashara, utamaduni, maisha yenye afya na shughuli za jamii.",
    "TSS encourages people to question what they consume, understand its influence, and become intentional about what they produce, share and support.": "TSS inahimiza watu kuchunguza wanachotumia, kuelewa athari zake, na kufanya maamuzi ya makusudi kuhusu wanachozalisha, kushiriki na kuunga mkono.",
    "FOUNDERS": "WAANZILISHI",
    "The people behind True SOUND Society™.": "Watu walio nyuma ya True SOUND Society™.",
    "True SOUND Society™ was established through a shared commitment to conscious consumption, purposeful production and meaningful community action.": "True SOUND Society™ ilianzishwa kutokana na dhamira ya pamoja ya matumizi yenye ufahamu, uzalishaji wenye kusudi na hatua zenye maana katika jamii.",
    "FOUNDER": "MWANZILISHI",
    "Founder, True SOUND Society™": "Mwanzilishi, True SOUND Society™",
    "Njiru Erick Mutugi founded True SOUND Society™ as a platform for meaningful communication, learning and purposeful action.": "Njiru Erick Mutugi alianzisha True SOUND Society™ kama jukwaa la mawasiliano yenye maana, kujifunza na kuchukua hatua zenye kusudi.",
    "CO-FOUNDER": "MWANZILISHI MSHIRIKA",
    "Co-Founder, True SOUND Society™": "Mwanzilishi Mshirika, True SOUND Society™",
    "Divina Auma is a Co-Founder of True SOUND Society™, contributing to the development of the community and its purpose-driven vision.": "Divina Auma ni Mwanzilishi Mshirika wa True SOUND Society™, akichangia maendeleo ya jamii hii na maono yake yenye kusudi.",
    "The idea behind TSS grew from a simple conviction: the things people consume — food, information, media, ideas, technology and culture — influence what they eventually produce and contribute to society.": "Wazo la TSS lilitokana na imani rahisi: vitu ambavyo watu hutumia — chakula, taarifa, vyombo vya habari, mawazo, teknolojia na utamaduni — huathiri wanachozalisha baadaye na mchango wao kwa jamii.",
    "Through TSS, the founders seek to build a community that encourages conscious consumption, purposeful production and practical solutions across different areas of life.": "Kupitia TSS, waanzilishi wanalenga kujenga jamii inayohimiza matumizi yenye ufahamu, uzalishaji wenye kusudi na suluhisho za vitendo katika nyanja mbalimbali za maisha.",
    "OUR FOCUS": "MAMBO TUNAYOZINGATIA",
    "Connecting consumption to production.": "Kuunganisha matumizi na uzalishaji.",
    "Our work can grow wherever responsible consumption and purposeful production meet.": "Kazi yetu inaweza kukua popote matumizi yenye uwajibikaji yanapokutana na uzalishaji wenye kusudi.",
    "Agriculture": "Kilimo",
    "Supporting informed food choices, productive farming, agribusiness and sustainable agricultural thinking.": "Kusaidia uchaguzi wa chakula wenye ufahamu, kilimo chenye tija, biashara ya kilimo na fikra endelevu za kilimo.",
    "Healthy Living": "Maisha Yenye Afya",
    "Encouraging people to become more conscious of what they eat, watch, hear, read and repeatedly consume.": "Kuhimiza watu kuwa makini zaidi na wanachokula, kutazama, kusikiliza, kusoma na kutumia mara kwa mara.",
    "Information & Media": "Taarifa na Vyombo vya Habari",
    "Promoting critical thinking, responsible information sharing and better digital content consumption.": "Kukuza fikra tunduizi, ushiriki wa taarifa kwa uwajibikaji na matumizi bora ya maudhui ya kidijitali.",
    "Technology": "Teknolojia",
    "Exploring technology as a tool for learning, productivity, connection and responsible innovation.": "Kuchunguza teknolojia kama nyenzo ya kujifunza, kuongeza tija, kuunganisha watu na kubuni kwa uwajibikaji.",
    "Community": "Jamii",
    "Creating conversations and initiatives that turn awareness into practical community action.": "Kuanzisha mazungumzo na mipango inayogeuza uelewa kuwa hatua za vitendo katika jamii.",
    "Responsible Production": "Uzalishaji Wenye Uwajibikaji",
    "Challenging individuals and organisations to produce value with purpose, integrity and long-term impact.": "Kuhimiza watu binafsi na mashirika kuzalisha thamani kwa kusudi, uadilifu na athari za muda mrefu.",
    "OUR VISION": "MAONO YETU",
    "A world of conscious consumers and purposeful producers.": "Ulimwengu wa watumiaji wenye ufahamu na wazalishaji wenye kusudi.",
    "We envision communities where people understand the relationship between what they consume and what they produce — and use that understanding to create better outcomes.": "Tunatamani jamii ambamo watu wanaelewa uhusiano kati ya wanachotumia na wanachozalisha, na kutumia uelewa huo kuleta matokeo bora.",
    "OUR MISSION": "DHAMIRA YETU",
    "Inform. Connect. Inspire. Act.": "Toa taarifa. Unganisha. Ham प्रेरisha. Chukua hatua.",
    "To build a digital community that shares useful knowledge, stimulates responsible conversations, supports practical initiatives and inspires people to make better choices.": "Kujenga jamii ya kidijitali inayoshiriki maarifa yenye manufaa, kuendeleza mazungumzo yenye uwajibikaji, kusaidia mipango ya vitendo na kuhamasisha watu kufanya maamuzi bora.",
    "“Every production begins with consumption somewhere.”": "“Kila uzalishaji huanzia kwenye matumizi mahali fulani.”",
    "— The True SOUND Society™ perspective": "— Mtazamo wa True SOUND Society™",
    "GET INVOLVED": "SHIRIKI",
    "There is a place for you in TSS.": "Una nafasi yako katika TSS.",
    "Whether you are a farmer, creator, student, professional, entrepreneur or community member, your choices contribute to what the world produces.": "Iwe wewe ni mkulima, mbunifu, mwanafunzi, mtaalamu, mjasiriamali au mwanajamii, maamuzi yako huchangia kile ambacho dunia huzalisha.",
    "Join the conversation": "Jiunge na mazungumzo",
    "Share ideas that improve how we consume and produce.": "Shiriki mawazo yanayoboresha namna tunavyotumia na kuzalisha.",
    "Partner with TSS": "Shirikiana na TSS",
    "Work with us on initiatives that create practical value.": "Fanya kazi nasi katika mipango inayoleta thamani ya vitendo.",
    "Support an initiative": "Unga mkono mpango",
    "Help turn purposeful ideas into measurable community action.": "Saidia kugeuza mawazo yenye kusudi kuwa hatua za jamii zinazoweza kupimwa.",
    "CONTACT": "WASILIANA NASI",
    "Let us build purpose together.": "Tujenge kusudi pamoja.",
    "For questions, collaboration, community initiatives or partnership enquiries, contact True SOUND Society using the details below.": "Kwa maswali, ushirikiano, mipango ya jamii au maombi ya ubia, wasiliana na True SOUND Society kupitia maelezo yaliyo hapa chini.",
    "Email": "Barua pepe",
    "Phone": "Simu",
    "Organisation": "Shirika",
    "Founder": "Mwanzilishi",
    "Co-Founder": "Mwanzilishi Mshirika",
    "Location": "Mahali",
    "Follow True SOUND Society™": "Fuatilia True SOUND Society™",
    "© ": "© "
  };

  const selectors = [
    ['.nav a', ['Mwanzo','Kuhusu','Waanzilishi','Mambo Tunayozingatia','Maono na Dhamira','Makala','Shiriki','Wasiliana']],
    ['.eyebrow', ['JAMII YA KIDIJITALI YENYE LENGO']],
    ['.hero-copy h1', ['Tumia kwa uangalifu.','Zalisha kwa kusudi.']],
    ['.hero-text', ['True SOUND Society™ ni jamii jumuishi inayojengwa juu ya wazo moja muhimu: tunachotumia huathiri tunachozalisha, na tunachozalisha huunda ulimwengu unaotuzunguka.']],
    ['.hero-actions .btn-primary', ['Ijue TSS']],
    ['.hero-actions .btn-outline[href="#involve"]', ['Shiriki']],
    ['.hero-actions .btn-outline[href*="blogspot"]', ['Soma Makala Zetu']],
    ['#about .section-tag', ['SISI NI NANI']],
    ['#about h2', ['Zaidi ya jina. Ni namna ya kufikiri.']],
    ['#about .section-text p', [
      'True SOUND Society™ (TSS) ni jamii na mpango wa kidijitali wenye lengo, unaohamasisha matumizi yenye ufahamu na uzalishaji wenye uwajibikaji.',
      'Tunaunganisha maamuzi ya kila siku na matokeo yake katika kilimo, taarifa, vyombo vya habari, teknolojia, biashara, utamaduni, maisha yenye afya na shughuli za jamii.',
      'TSS inahimiza watu kuchunguza wanachotumia, kuelewa athari zake, na kufanya maamuzi ya makusudi kuhusu wanachozalisha, kushiriki na kuunga mkono.'
    ]],
    ['#founder .section-tag', ['WAANZILISHI','MWANZILISHI','MWANZILISHI MSHIRIKA']],
    ['#founder .section-heading h2', ['Watu walio nyuma ya True SOUND Society™.']],
    ['#founder .section-heading > p:last-child', ['True SOUND Society™ ilianzishwa kutokana na dhamira ya pamoja ya matumizi yenye ufahamu, uzalishaji wenye kusudi na hatua zenye maana katika jamii.']],
    ['#founder .founder-role', ['Mwanzilishi, True SOUND Society™','Mwanzilishi Mshirika, True SOUND Society™']],
    ['#founder .vision-box p:last-child', [
      'Njiru Erick Mutugi alianzisha True SOUND Society™ kama jukwaa la mawasiliano yenye maana, kujifunza na kuchukua hatua zenye kusudi.',
      'Divina Auma ni Mwanzilishi Mshirika wa True SOUND Society™, akichangia maendeleo ya jamii hii na maono yake yenye kusudi.'
    ]],
    ['#founder .section-text p', [
      'Wazo la TSS lilitokana na imani rahisi: vitu ambavyo watu hutumia — chakula, taarifa, vyombo vya habari, mawazo, teknolojia na utamaduni — huathiri wanachozalisha baadaye na mchango wao kwa jamii.',
      'Kupitia TSS, waanzilishi wanalenga kujenga jamii inayohimiza matumizi yenye ufahamu, uzalishaji wenye kusudi na suluhisho za vitendo katika nyanja mbalimbali za maisha.'
    ]],
    ['#focus .section-tag', ['MAMBO TUNAYOZINGATIA']],
    ['#focus .section-heading h2', ['Kuunganisha matumizi na uzalishaji.']],
    ['#focus .section-heading > p:last-child', ['Kazi yetu inaweza kukua popote matumizi yenye uwajibikaji yanapokutana na uzalishaji wenye kusudi.']],
    ['#focus .card h3', ['Kilimo','Maisha Yenye Afya','Taarifa na Vyombo vya Habari','Teknolojia','Jamii','Uzalishaji Wenye Uwajibikaji']],
    ['#focus .card p', [
      'Kusaidia uchaguzi wa chakula wenye ufahamu, kilimo chenye tija, biashara ya kilimo na fikra endelevu za kilimo.',
      'Kuhimiza watu kuwa makini zaidi na wanachokula, kutazama, kusikiliza, kusoma na kutumia mara kwa mara.',
      'Kukuza fikra tunduizi, ushiriki wa taarifa kwa uwajibikaji na matumizi bora ya maudhui ya kidijitali.',
      'Kuchunguza teknolojia kama nyenzo ya kujifunza, kuongeza tija, kuunganisha watu na kubuni kwa uwajibikaji.',
      'Kuanzisha mazungumzo na mipango inayogeuza uelewa kuwa hatua za vitendo katika jamii.',
      'Kuhimiza watu binafsi na mashirika kuzalisha thamani kwa kusudi, uadilifu na athari za muda mrefu.'
    ]],
    ['#vision .section-tag', ['MAONO YETU','DHAMIRA YETU']],
    ['#vision .vision-box h2', ['Ulimwengu wa watumiaji wenye ufahamu na wazalishaji wenye kusudi.','Toa taarifa. Unganisha. Hamasa. Chukua hatua.']],
    ['#vision .vision-box p:last-child', [
      'Tunatamani jamii ambamo watu wanaelewa uhusiano kati ya wanachotumia na wanachozalisha, na kutumia uelewa huo kuleta matokeo bora.',
      'Kujenga jamii ya kidijitali inayoshiriki maarifa yenye manufaa, kuendeleza mazungumzo yenye uwajibikaji, kusaidia mipango ya vitendo na kuhamasisha watu kufanya maamuzi bora.'
    ]],
    ['.quote-section blockquote', ['“Kila uzalishaji huanzia kwenye matumizi mahali fulani.”']],
    ['.quote-section .container > p', ['— Mtazamo wa True SOUND Society™']],
    ['#involve .section-tag', ['SHIRIKI']],
    ['#involve .section-heading h2', ['Una nafasi yako katika TSS.']],
    ['#involve .section-heading > p:last-child', ['Iwe wewe ni mkulima, mbunifu, mwanafunzi, mtaalamu, mjasiriamali au mwanajamii, maamuzi yako huchangia kile ambacho dunia huzalisha.']],
    ['.involve-item strong', ['Jiunge na mazungumzo','Shirikiana na TSS','Unga mkono mpango']],
    ['.involve-item span', ['Shiriki mawazo yanayoboresha namna tunavyotumia na kuzalisha.','Fanya kazi nasi katika mipango inayoleta thamani ya vitendo.','Saidia kugeuza mawazo yenye kusudi kuwa hatua za jamii zinazoweza kupimwa.']],
    ['#contact .section-tag', ['WASILIANA NASI']],
    ['#contact h2', ['Tujenge kusudi pamoja.']],
    ['#contact .contact-grid > div:first-child p:last-child', ['Kwa maswali, ushirikiano, mipango ya jamii au maombi ya ubia, wasiliana na True SOUND Society kupitia maelezo yaliyo hapa chini.']],
    ['.contact-card span', ['Barua pepe','Simu','Shirika','Mwanzilishi','Mwanzilishi Mshirika','Mahali']],
    ['.social-heading strong', ['Fuatilia True SOUND Society™']]
  ];

  const style = document.createElement('style');
  style.textContent = '.language-switch{display:flex;align-items:center;gap:4px;flex-shrink:0}.language-switch button{border:1px solid #07571e;border-radius:7px;background:#fff;color:#07571e;padding:6px 9px;font:600 .78rem inherit;cursor:pointer}.language-switch button[aria-pressed="true"]{background:#07571e;color:#fff}.nav-wrap{flex-wrap:wrap}@media(max-width:850px){.language-switch{margin-left:auto;margin-right:6px}.nav-wrap{gap:10px}}';
  document.head.appendChild(style);

  const navWrap = document.querySelector('.nav-wrap');
  if (!navWrap) return;
  const switcher = document.createElement('div');
  switcher.className = 'language-switch';
  switcher.setAttribute('aria-label', 'Choose language');
  switcher.innerHTML = '<button type="button" data-lang="en" aria-pressed="true">EN</button><button type="button" data-lang="sw" aria-pressed="false">SW</button>';
  const menuButton = navWrap.querySelector('.menu-toggle');
  navWrap.insertBefore(switcher, menuButton);

  const originals = new Map();
  const capture = () => {
    selectors.forEach(([selector]) => {
      document.querySelectorAll(selector).forEach((el, index) => {
        const key = selector + '::' + index;
        if (!originals.has(key)) originals.set(key, {el, html: el.innerHTML, text: el.textContent});
      });
    });
  };
  capture();

  function setLanguage(lang) {
    selectors.forEach(([selector, swValues]) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el, index) => {
        const original = originals.get(selector + '::' + index);
        if (!original) return;
        if (lang === 'en') {
          if (selector === '.hero-copy h1') {
            el.innerHTML = '<span>' + 'Produce with purpose.' + '</span>';
            // Restore the first line and keep the original line break.
            el.innerHTML = 'Consume with care.<br><span>Produce with purpose.</span>';
          } else {
            el.textContent = original.text;
          }
        } else {
          const value = swValues[index];
          if (value === undefined) return;
          if (selector === '.hero-copy h1') el.innerHTML = 'Tumia kwa uangalifu.<br><span>Zalisha kwa kusudi.</span>';
          else el.textContent = value;
        }
      });
    });
    document.documentElement.lang = lang === 'sw' ? 'sw' : 'en';
    switcher.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === lang)));
  }
  switcher.addEventListener('click', event => {
    const button = event.target.closest('button[data-lang]');
    if (button) setLanguage(button.dataset.lang);
  });
})();
