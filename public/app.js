const STORAGE_KEY = 'resume-builder-state-v1';
const SECTIONS = [
  { key: 'summary', label: 'О себе' },
  { key: 'experience', label: 'Опыт' },
  { key: 'education', label: 'Образование' },
  { key: 'skills', label: 'Навыки' },
  { key: 'projects', label: 'Проекты' },
  { key: 'certificates', label: 'Сертификаты' },
  { key: 'publications', label: 'Публикации' },
  { key: 'awards', label: 'Награды' },
  { key: 'volunteer', label: 'Волонтерство' },
  { key: 'hobbies', label: 'Интересы' },
  { key: 'references', label: 'Рекомендации' }
];

const PROFESSION_PRESETS = {
  it: {
    position: 'Frontend Developer',
    summary: 'Frontend Developer с 6+ годами опыта в создании web-продуктов, CRM-систем и пользовательских платформ. Отвечаю за UX-ориентированную разработку, оптимизацию производительности и внедрение современных инструментов в процессы команды.',
    about: 'Разрабатываю интерфейсы и продуктовые решения для цифровых сервисов. Умею связывать UX, архитектуру и техническую реализацию, чтобы продукт был удобным и масштабируемым.',
    skills: {
      professional: 'JavaScript, TypeScript, React, Next.js, Redux, Node.js, REST API, UX/UI, Agile',
      languages: 'Английский — B2, Русский — родной',
      technical: 'Git, Figma, Jira, Postman, Docker, CI/CD',
      soft: 'Командная работа, коммуникация, лидерство, приоритизация'
    }
  },
  design: {
    position: 'Product Designer',
    summary: 'Дизайнер продуктов с опытом проектирования интерфейсов, систем и пользовательских сценариев для SaaS и цифровых платформ.',
    about: 'Создаю понятные и эмоционально сильные интерфейсы, которые помогают пользователю быстрее достигать цели и улучшают бизнес-результаты.',
    skills: {
      professional: 'UX Research, Wireframing, Prototyping, Design Systems, Figma, User Flows, UX Writing',
      languages: 'Английский — B2, Русский — родной',
      technical: 'Figma, FigJam, Maze, Notion, After Effects, Adobe CC',
      soft: 'Коммуникация, исследование потребностей, дизайн-решения, итерация'
    }
  },
  manager: {
    position: 'Product Manager',
    summary: 'Product Manager с опытом запуска цифровых продуктов, управления приоритетами и выстраивания процессов между бизнесом, дизайном и разработкой.',
    about: 'Понимаю продукт с точки зрения пользователя и бизнеса: превращаю идеи в дорожную карту, структурирую приоритеты и веду команды к результату.',
    skills: {
      professional: 'Roadmap, Discovery, Stakeholder Management, Requirements, KPI, Agile, Prioritization',
      languages: 'Английский — B2, Русский — родной',
      technical: 'Jira, Confluence, Miro, Notion, SQL, Analytics',
      soft: 'Решение конфликтов, лидерство, коммуникация, работа с приоритетами'
    }
  },
  marketing: {
    position: 'Marketing Specialist',
    summary: 'Маркетолог с опытом запуска кампаний, анализа воронки и улучшения конверсии в цифровых каналах и e-commerce.',
    about: 'Сочетаю стратегию, аналитика и креатив, чтобы строить понятные кампании и повышать эффективность маркетинговых активностей.',
    skills: {
      professional: 'Performance Marketing, Brand Strategy, Content Marketing, CRM, SEO, Paid Media',
      languages: 'Английский — B2, Русский — родной',
      technical: 'Google Analytics, Meta Ads, Yandex Direct, CRM, Excel, Miro',
      soft: 'Аналитика, креатив, коммуникация, работа в команде'
    }
  },
  finance: {
    position: 'Financial Analyst',
    summary: 'Финансовый аналитик с опытом построения моделей, анализа показателей и поддержки решений по управлению денежными потоками и бюджетом.',
    about: 'Анализирую финансовую эффективность, строю модели и предлагаю решения, которые помогают бизнесу принимать более точные решения.',
    skills: {
      professional: 'Financial Modeling, Budgeting, Forecasting, Reporting, Risk Analysis, Excel',
      languages: 'Английский — B2, Русский — родной',
      technical: 'Excel, Power BI, SQL, 1C, SAP, Google Sheets',
      soft: 'Логика, аргументация, внимательность, работа с данными'
    }
  },
  teacher: {
    position: 'Teacher of Computer Science',
    summary: 'Преподаватель информатики и цифровых дисциплин с опытом обучения, методической работы и развития компетенций студентов.',
    about: 'Помогаю студентам осваивать цифровые компетенции, развиваю практический подход и уверенность в применении знаний на практике.',
    skills: {
      professional: 'Curriculum Design, Classroom Management, Lesson Planning, Coaching, Assessment',
      languages: 'Английский — B1, Русский — родной',
      technical: 'Python, Excel, Google Workspace, LMS, Digital Tools',
      soft: 'Вдохновляющая коммуникация, мотивация, эмпатия, наставничество'
    }
  }
};

const defaultState = {
  template: 'classic',
  profession: 'it',
  profile: {
    fullName: 'Александр Петров',
    position: 'Frontend Developer',
    birthDate: '1994-05-15',
    city: 'Москва',
    phone: '+7 (999) 123-45-67',
    email: 'alex.petrov@example.com',
    linkedin: 'linkedin.com/in/alex-petrov',
    github: 'github.com/alexpetrov',
    portfolio: 'alexpetrov.design',
    socials: 't.me/alexpetrov / behance.net/alex',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
  },
  summary: {
    about: 'Разрабатываю интерфейсы и продуктовые решения для цифровых сервисов. Умею связывать UX, архитектуру и техническую реализацию, чтобы продукт был удобным и масштабируемым.',
    summary: 'Frontend Developer с 6+ годами опыта в создании web-продуктов, CRM-систем и пользовательских платформ. Отвечаю за UX-ориентированную разработку, оптимизацию производительности и внедрение современных инструментов в процессы команды.',
    goal: 'Строить понятные и масштабируемые интерфейсы, которые помогают пользователям быстрее достигать результатов и повышают ценность продукта для бизнеса.'
  },
  experience: [
    {
      id: 1,
      position: 'Senior Frontend Engineer',
      company: 'ООО «Фокус»',
      period: '2021 — настоящее время',
      city: 'Москва',
      duties: 'Разработка интерфейсов SaaS-платформы для управления клиентскими данными.\nСогласование архитектуры UI и взаимодействие с продуктовым менеджментом.\nПовышение производительности и отказоустойчивости фронтенд-части.',
      achievements: 'Сокращение времени загрузки ключевых страниц на 38%.\nВнедрение дизайн-системы и улучшение скорости внедрения новых функций.',
      stack: 'React, TypeScript, Redux, Node.js, GraphQL, Jest'
    },
    {
      id: 2,
      position: 'Frontend Developer',
      company: 'ООО «ТехноПорт»',
      period: '2018 — 2021',
      city: 'Москва',
      duties: 'Разработка web-приложений и внутренних сервисов для команды продаж и поддержки.\nРабота с REST API и адаптация интерфейсов под user flow.',
      achievements: 'Запустил 3 внутренних продукта и увеличил engagement на 26%.\nАвтоматизировал рутинную сборку и тестирование.',
      stack: 'JavaScript, Vue, CSS Modules, Storybook'
    }
  ],
  education: [
    {
      id: 1,
      institution: 'Московский государственный университет',
      degree: 'Магистр',
      specialty: 'Прикладная математика и информатика',
      period: '2012 — 2018',
      city: 'Москва',
      details: 'Фокус на HCI, визуализации данных и программных интерфейсах.'
    }
  ],
  skills: {
    professional: 'JavaScript, TypeScript, React, Next.js, Redux, Node.js, REST API, UX/UI, Agile',
    languages: 'Английский — B2, Русский — родной',
    technical: 'Git, Figma, Jira, Postman, Docker, CI/CD',
    soft: 'Командная работа, коммуникация, лидерство, приоритизация'
  },
  projects: [{ title: 'Smart Dashboard', description: 'Платформа аналитики и контроля KPI для клиентов.' }, { title: 'Design System', description: 'Переиспользуемая UI-библиотека для команды.' }],
  certificates: ['Certified Frontend Developer — Coursera', 'Advanced React — Meta'],
  publications: ['Руководство по фронтенд-архитектуре для продукта'],
  awards: ['Лучший продуктовый инженер 2023'],
  volunteer: ['Помощь студентам в подготовке к хакатонам'],
  hobbies: ['Фотография, бег, путешествия'],
  references: ['Доступны по запросу'],
  extras: {
    projects: true,
    certificates: true,
    publications: false,
    awards: false,
    volunteer: false,
    hobbies: true,
    references: false
  },
  sectionOrder: ['summary', 'experience', 'education', 'skills', 'projects', 'certificates', 'hobbies'],
  design: {
    accentColor: '#2f6bff',
    font: 'sans',
    fontSize: 15,
    photoMode: 'right',
    layout: 'two',
    focus: 'skills'
  }
};

let state = loadState();

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (!saved) return structuredClone(defaultState);
    return {
      ...structuredClone(defaultState),
      ...saved,
      profile: { ...defaultState.profile, ...(saved.profile || {}) },
      summary: { ...defaultState.summary, ...(saved.summary || {}) },
      skills: { ...defaultState.skills, ...(saved.skills || {}) },
      design: { ...defaultState.design, ...(saved.design || {}) },
      extras: { ...defaultState.extras, ...(saved.extras || {}) },
      sectionOrder: Array.isArray(saved.sectionOrder) && saved.sectionOrder.length ? saved.sectionOrder : defaultState.sectionOrder,
      experience: saved.experience || defaultState.experience,
      education: saved.education || defaultState.education
    };
  } catch (error) {
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function buildSectionMarkup() {
  const jobs = [];
  const visibleKeys = state.sectionOrder.filter((key) => key && SECTIONS.some(section => section.key === key));

  visibleKeys.forEach((key) => {
    if (key === 'summary') {
      jobs.push(`
        <div class="section">
          <h3 class="section-title">О себе</h3>
          <div class="summary-block">${escapeHtml(state.summary.about || '')}</div>
        </div>
      `);
    }

    if (key === 'experience' && state.experience.length) {
      jobs.push(`
        <div class="section">
          <h3 class="section-title">Опыт работы</h3>
          ${state.experience.map(exp => `
            <div class="job">
              <div class="job-head"><div class="company">${escapeHtml(exp.company || '')}</div><div class="period">${escapeHtml(exp.period || '')}</div></div>
              <div class="role">${escapeHtml(exp.position || '')} · ${escapeHtml(exp.city || '')}</div>
              <ul class="list">${(exp.duties || '').split('\n').filter(Boolean).map(line => `<li>${escapeHtml(line)}</li>`).join('')}</ul>
              ${exp.achievements ? `<div style="margin-top:8px; font-weight:700;">Достижения</div><ul class="list">${(exp.achievements || '').split('\n').filter(Boolean).map(line => `<li>${escapeHtml(line)}</li>`).join('')}</ul>` : ''}
              ${exp.stack ? `<div class="chip-list">${exp.stack.split(',').map(item => `<span class="chip">${escapeHtml(item.trim())}</span>`).filter(Boolean).join('')}</div>` : ''}
            </div>
          `).join('')}
        </div>
      `);
    }

    if (key === 'education' && state.education.length) {
      jobs.push(`
        <div class="section">
          <h3 class="section-title">Образование</h3>
          ${state.education.map(edu => `
            <div class="edu">
              <div class="edu-head"><div class="company">${escapeHtml(edu.institution || '')}</div><div class="period">${escapeHtml(edu.period || '')}</div></div>
              <div class="role">${escapeHtml(edu.degree || '')} · ${escapeHtml(edu.specialty || '')}</div>
              <div>${escapeHtml(edu.city || '')}</div>
              ${edu.details ? `<div style="margin-top:8px; color:#475569;">${escapeHtml(edu.details)}</div>` : ''}
            </div>
          `).join('')}
        </div>
      `);
    }

    if (key === 'skills' && (state.skills.professional || state.skills.technical || state.skills.languages || state.skills.soft)) {
      jobs.push(`
        <div class="section">
          <h3 class="section-title">Навыки</h3>
          <div class="list">
            ${state.skills.professional ? `<div><strong>Профессиональные:</strong> ${escapeHtml(state.skills.professional)}</div>` : ''}
            ${state.skills.languages ? `<div><strong>Языки:</strong> ${escapeHtml(state.skills.languages)}</div>` : ''}
            ${state.skills.technical ? `<div><strong>Технические:</strong> ${escapeHtml(state.skills.technical)}</div>` : ''}
            ${state.skills.soft ? `<div><strong>Soft skills:</strong> ${escapeHtml(state.skills.soft)}</div>` : ''}
          </div>
        </div>
      `);
    }

    if (key === 'projects' && state.extras.projects && state.projects.length) {
      jobs.push(`
        <div class="section">
          <h3 class="section-title">Проекты</h3>
          ${state.projects.map(project => `
            <div class="project">
              <div class="company">${escapeHtml(project.title || '')}</div>
              <div style="color:#475569; margin-top:6px;">${escapeHtml(project.description || '')}</div>
            </div>
          `).join('')}
        </div>
      `);
    }

    if (key === 'certificates' && state.extras.certificates && state.certificates.length) {
      jobs.push(`
        <div class="section">
          <h3 class="section-title">Сертификаты</h3>
          <ul class="list">${state.certificates.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
        </div>
      `);
    }

    if (key === 'publications' && state.extras.publications && state.publications.length) {
      jobs.push(`
        <div class="section">
          <h3 class="section-title">Публикации</h3>
          <ul class="list">${state.publications.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
        </div>
      `);
    }

    if (key === 'awards' && state.extras.awards && state.awards.length) {
      jobs.push(`
        <div class="section">
          <h3 class="section-title">Награды</h3>
          <ul class="list">${state.awards.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
        </div>
      `);
    }

    if (key === 'volunteer' && state.extras.volunteer && state.volunteer.length) {
      jobs.push(`
        <div class="section">
          <h3 class="section-title">Волонтерство</h3>
          <ul class="list">${state.volunteer.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
        </div>
      `);
    }

    if (key === 'hobbies' && state.extras.hobbies && state.hobbies.length) {
      jobs.push(`
        <div class="section">
          <h3 class="section-title">Интересы</h3>
          <div class="chip-list">${state.hobbies.map(item => `<span class="chip">${escapeHtml(item)}</span>`).join('')}</div>
        </div>
      `);
    }

    if (key === 'references' && state.extras.references && state.references.length) {
      jobs.push(`
        <div class="section">
          <h3 class="section-title">Рекомендации</h3>
          <ul class="list">${state.references.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
        </div>
      `);
    }
  });

  return jobs.join('');
}

function renderSectionOrder() {
  const container = document.getElementById('sectionOrderList');
  if (!container) return;

  container.innerHTML = SECTIONS.map((section) => `
    <div class="toggle-item" draggable="true" data-section-order="${section.key}">
      <input type="checkbox" data-section-toggle="${section.key}" ${state.sectionOrder.includes(section.key) ? 'checked' : ''} />
      <span>${section.label}</span>
    </div>
  `).join('');

  container.querySelectorAll('[draggable="true"]').forEach((item) => {
    item.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', item.dataset.sectionOrder);
    });
    item.addEventListener('dragover', (event) => {
      event.preventDefault();
    });
    item.addEventListener('drop', (event) => {
      event.preventDefault();
      const source = event.dataTransfer.getData('text/plain');
      const target = item.dataset.sectionOrder;
      reorderSections(source, target);
    });
  });
}

function reorderSections(sourceKey, targetKey) {
  if (!sourceKey || !targetKey || sourceKey === targetKey) return;
  const order = [...state.sectionOrder];
  const sourceIndex = order.indexOf(sourceKey);
  const targetIndex = order.indexOf(targetKey);
  if (sourceIndex === -1 || targetIndex === -1) return;
  order.splice(sourceIndex, 1);
  order.splice(targetIndex, 0, sourceKey);
  state.sectionOrder = order;
  renderAll();
}

function applyProfessionPreset(profession) {
  const preset = PROFESSION_PRESETS[profession];
  if (!preset) return;

  state.profession = profession;
  state.profile.position = preset.position;
  state.summary.summary = preset.summary;
  state.summary.about = preset.about;
  state.skills = { ...state.skills, ...preset.skills };
  renderAll();
}

function setByPath(source, path, value) {
  const keys = path.split('.');
  let current = source;
  for (let i = 0; i < keys.length - 1; i += 1) {
    if (!current[keys[i]]) current[keys[i]] = {};
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
}

function escapeHtml(text = '') {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderExperienceList() {
  const container = document.getElementById('experienceList');
  container.innerHTML = state.experience.map((item, index) => `
    <div class="entry-card">
      <div class="entry-head"><span>Опыт ${index + 1}</span><button class="mini-btn" data-remove-experience="${item.id}">Удалить</button></div>
      <div class="field-grid">
        <div class="field"><label>Должность</label><input data-path="experience.${index}.position" value="${escapeHtml(item.position || '')}" /></div>
        <div class="field"><label>Компания</label><input data-path="experience.${index}.company" value="${escapeHtml(item.company || '')}" /></div>
        <div class="field"><label>Период</label><input data-path="experience.${index}.period" value="${escapeHtml(item.period || '')}" /></div>
        <div class="field"><label>Город</label><input data-path="experience.${index}.city" value="${escapeHtml(item.city || '')}" /></div>
        <div class="field full"><label>Обязанности</label><textarea data-path="experience.${index}.duties">${escapeHtml(item.duties || '')}</textarea></div>
        <div class="field full"><label>Достижения</label><textarea data-path="experience.${index}.achievements">${escapeHtml(item.achievements || '')}</textarea></div>
        <div class="field full"><label>Технологии / стек</label><input data-path="experience.${index}.stack" value="${escapeHtml(item.stack || '')}" /></div>
      </div>
    </div>
  `).join('');
}

function renderEducationList() {
  const container = document.getElementById('educationList');
  container.innerHTML = state.education.map((item, index) => `
    <div class="entry-card">
      <div class="entry-head"><span>Образование ${index + 1}</span><button class="mini-btn" data-remove-education="${item.id}">Удалить</button></div>
      <div class="field-grid">
        <div class="field"><label>Учебное заведение</label><input data-path="education.${index}.institution" value="${escapeHtml(item.institution || '')}" /></div>
        <div class="field"><label>Специальность</label><input data-path="education.${index}.specialty" value="${escapeHtml(item.specialty || '')}" /></div>
        <div class="field"><label>Степень</label><input data-path="education.${index}.degree" value="${escapeHtml(item.degree || '')}" /></div>
        <div class="field"><label>Период</label><input data-path="education.${index}.period" value="${escapeHtml(item.period || '')}" /></div>
        <div class="field"><label>Город</label><input data-path="education.${index}.city" value="${escapeHtml(item.city || '')}" /></div>
        <div class="field full"><label>Средний балл / достижения</label><textarea data-path="education.${index}.details">${escapeHtml(item.details || '')}</textarea></div>
      </div>
    </div>
  `).join('');
}

function renderVersionList() {
  const versions = JSON.parse(localStorage.getItem('resume-builder-versions') || '[]');
  const list = document.getElementById('versionList');
  list.innerHTML = versions.length ? versions.map((version, index) => `
    <div class="toggle-item" style="justify-content: space-between;">
      <span>${escapeHtml(version.name)}</span>
      <button class="mini-btn" data-load-version="${index}">Загрузить</button>
    </div>
  `).join('') : '<div style="color: var(--muted);">Нет сохранённых версий</div>';
}

function renderProgress() {
  const entries = [
    state.profile.fullName,
    state.profile.position,
    state.profile.phone,
    state.profile.email,
    state.summary.about,
    state.summary.summary,
    state.experience.some(exp => exp.position || exp.company),
    state.education.some(edu => edu.institution || edu.specialty),
    state.skills.professional,
    state.skills.languages
  ];
  const filled = entries.filter(Boolean).length;
  const percent = Math.min(100, Math.round((filled / entries.length) * 100));
  document.getElementById('progressBar').style.width = `${percent}%`;
  document.getElementById('progressValue').textContent = `${percent}%`;
}

function renderResume() {
  const preview = document.getElementById('resumePreview');
  preview.className = `resume-canvas template-${state.template}`;
  preview.style.setProperty('--accent', state.design.accentColor || '#2f6bff');
  preview.style.setProperty('font-size', `${state.design.fontSize || 15}px`);
  preview.style.fontFamily = state.design.font === 'serif' ? 'Georgia, serif' : state.design.font === 'mono' ? 'Courier New, monospace' : 'Segoe UI, sans-serif';

  const links = [
    state.profile.linkedin && `LinkedIn: ${state.profile.linkedin}`,
    state.profile.github && `GitHub: ${state.profile.github}`,
    state.profile.portfolio && `Portfolio: ${state.profile.portfolio}`
  ].filter(Boolean);

  const content = buildSectionMarkup();

  const side = `
    <div class="column-side">
      <div class="side-box">
        <h4>Контакты</h4>
        <div class="meta-list">
          <div>${escapeHtml(state.profile.city || '')}</div>
          <div>${escapeHtml(state.profile.phone || '')}</div>
          <div>${escapeHtml(state.profile.email || '')}</div>
        </div>
      </div>
      <div class="side-box">
        <h4>Ссылки</h4>
        <div class="link-list">${links.map(link => `<div>${escapeHtml(link)}</div>`).join('')}</div>
      </div>
      <div class="side-box">
        <h4>Профиль</h4>
        <div class="summary-block">${escapeHtml(state.summary.summary || '')}</div>
      </div>
      <div class="side-box">
        <h4>Навыки</h4>
        <div class="chip-list">${(state.skills.technical || '').split(',').filter(Boolean).map(item => `<span class="chip">${escapeHtml(item.trim())}</span>`).join('')}</div>
      </div>
    </div>
  `;

  const photo = state.profile.photo && state.design.photoMode !== 'hidden'
    ? `<div class="photo-box"><img src="${escapeHtml(state.profile.photo)}" alt="Фото" /></div>`
    : '<div class="photo-box" style="display:none;">Фото</div>';

  preview.innerHTML = `
    <div class="resume-header">
      ${photo}
      <div class="header-copy">
        <h1>${escapeHtml(state.profile.fullName || 'Ваше имя')}</h1>
        <h2>${escapeHtml(state.profile.position || 'Ваша должность')}</h2>
        <div class="basic-meta">
          <span>${escapeHtml(state.profile.city || '')}</span>
          <span>${escapeHtml(state.profile.phone || '')}</span>
          <span>${escapeHtml(state.profile.email || '')}</span>
        </div>
      </div>
    </div>
    <div class="resume-body ${state.design.layout === 'two' ? 'two-col' : 'one-col'}">
      <div class="column-main">${content}</div>
      ${state.design.layout === 'two' ? side : ''}
    </div>
  `;
}

function updateDesignControls() {
  document.getElementById('accentColorInput').value = state.design.accentColor || '#2f6bff';
  document.getElementById('fontSelect').value = state.design.font || 'sans';
  document.getElementById('fontSizeInput').value = state.design.fontSize || 15;
  document.getElementById('fontSizeLabel').textContent = `${state.design.fontSize || 15}px`;
  document.getElementById('photoModeSelect').value = state.design.photoMode || 'right';
  document.getElementById('layoutSelect').value = state.design.layout || 'two';
  document.getElementById('focusSelect').value = state.design.focus || 'skills';
}

function renderAll() {
  saveState();
  renderExperienceList();
  renderEducationList();
  renderVersionList();
  renderProgress();
  renderSectionOrder();
  renderResume();
  updateDesignControls();
  document.querySelectorAll('.template-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.template === state.template));
  document.querySelectorAll('.profession-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.profession === state.profession));
}

function addExperience() {
  state.experience.push({ id: Date.now() + Math.random(), position: '', company: '', period: '', city: '', duties: '', achievements: '', stack: '' });
  renderAll();
}

function addEducation() {
  state.education.push({ id: Date.now() + Math.random(), institution: '', degree: '', specialty: '', period: '', city: '', details: '' });
  renderAll();
}

function saveVersion() {
  const versions = JSON.parse(localStorage.getItem('resume-builder-versions') || '[]');
  const name = `Вариант ${versions.length + 1}`;
  versions.push({ name, data: JSON.parse(JSON.stringify(state)) });
  localStorage.setItem('resume-builder-versions', JSON.stringify(versions));
  renderVersionList();
  alert('Текущая версия сохранена');
}

function bindEvents() {
  document.addEventListener('input', event => {
    const target = event.target;
    if (target.matches('[data-path]')) {
      setByPath(state, target.dataset.path, target.value);
      renderAll();
    }
    if (target.id === 'accentColorInput') {
      state.design.accentColor = target.value;
      renderAll();
    }
    if (target.id === 'fontSizeInput') {
      state.design.fontSize = Number(target.value);
      document.getElementById('fontSizeLabel').textContent = `${target.value}px`;
      renderAll();
    }
  });

  document.addEventListener('change', event => {
    const target = event.target;
    if (target.matches('[data-toggle]')) {
      state.extras[target.dataset.toggle] = target.checked;
      renderAll();
    }
    if (target.id === 'fontSelect') {
      state.design.font = target.value;
      renderAll();
    }
    if (target.id === 'photoModeSelect') {
      state.design.photoMode = target.value;
      renderAll();
    }
    if (target.id === 'layoutSelect') {
      state.design.layout = target.value;
      renderAll();
    }
    if (target.id === 'focusSelect') {
      state.design.focus = target.value;
      renderAll();
    }
    if (target.matches('[data-section-toggle]')) {
      const key = target.dataset.sectionToggle;
      if (target.checked && !state.sectionOrder.includes(key)) {
        state.sectionOrder.push(key);
      }
      if (!target.checked && state.sectionOrder.includes(key)) {
        state.sectionOrder = state.sectionOrder.filter(item => item !== key);
      }
      renderAll();
    }
  });

  document.addEventListener('click', event => {
    const target = event.target;
    if (target.matches('.template-btn')) {
      state.template = target.dataset.template;
      renderAll();
    }
    if (target.matches('.profession-btn')) {
      applyProfessionPreset(target.dataset.profession);
    }
    if (target.id === 'addExperienceBtn') addExperience();
    if (target.id === 'addEducationBtn') addEducation();
    if (target.id === 'saveDraftBtn') {
      saveState();
      alert('Черновик сохранён');
    }
    if (target.id === 'copyVersionBtn') saveVersion();
    if (target.id === 'pdfBtn') window.print();
    if (target.id === 'wordBtn') {
      const html = document.getElementById('resumePreview').outerHTML;
      const blob = new Blob([html], { type: 'application/msword' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'resume.doc';
      link.click();
    }
    if (target.id === 'shareBtn') {
      const payload = btoa(unescape(encodeURIComponent(JSON.stringify(state))));
      const shareText = `${window.location.origin}${window.location.pathname}#resume=${encodeURIComponent(payload)}`;
      navigator.clipboard.writeText(shareText);
      alert('Ссылка на текущую версию скопирована');
    }
    if (target.matches('[data-remove-experience]')) {
      const id = Number(target.dataset.removeExperience);
      state.experience = state.experience.filter(item => item.id !== id);
      renderAll();
    }
    if (target.matches('[data-remove-education]')) {
      const id = Number(target.dataset.removeEducation);
      state.education = state.education.filter(item => item.id !== id);
      renderAll();
    }
    if (target.matches('[data-load-version]')) {
      const versions = JSON.parse(localStorage.getItem('resume-builder-versions') || '[]');
      const selected = versions[Number(target.dataset.loadVersion)];
      if (selected) {
        state = JSON.parse(JSON.stringify(selected.data));
        renderAll();
      }
    }
  });
}

function restoreFromHash() {
  const hash = window.location.hash;
  if (!hash || !hash.startsWith('#resume=')) return;
  try {
    const encoded = decodeURIComponent(hash.replace('#resume=', ''));
    const restored = JSON.parse(decodeURIComponent(escape(atob(encoded))));
    state = { ...structuredClone(defaultState), ...restored, profile: { ...defaultState.profile, ...(restored.profile || {}) }, summary: { ...defaultState.summary, ...(restored.summary || {}) }, skills: { ...defaultState.skills, ...(restored.skills || {}) }, design: { ...defaultState.design, ...(restored.design || {}) }, extras: { ...defaultState.extras, ...(restored.extras || {}) }, sectionOrder: Array.isArray(restored.sectionOrder) && restored.sectionOrder.length ? restored.sectionOrder : defaultState.sectionOrder };
  } catch (e) {
    console.warn('Restore failed', e);
  }
}

function init() {
  restoreFromHash();
  bindEvents();
  renderAll();
}

init();
