/* ============================================================
   Biosite — Mizael Anjos / Oficina AngelCode
   Vanilla JS. Tudo configurável no objeto `config` abaixo:
   trocar URLs aqui é a única manutenção necessária.
   Narrativa: contexto-estrategico.md (motor / oficina / performance).
   ============================================================ */

const config = {
  whatsapp: "5548996986794",
  whatsappMsg: "Oi Mizael! Vim pelo seu biosite e quero aumentar a performance da minha operação.",
  instagram: "https://www.instagram.com/mizael.anjos_/",
  youtube: "", // preencher quando existir — vazio mostra "em breve"
  email: "businessmizael@gmail.com",
  site: "https://angelcode.com.br", // site AngelCode no ar

  // contato (vCard "salvar contato")
  vcard: {
    name: "Mizael dos Anjos",
    org: "AngelCode",
    title: "Performance operacional — sistemas, automação e IA",
  },
};

const waUrl = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(config.whatsappMsg)}`;
const waDiagnostico = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
  "Quero agendar o diagnóstico da minha operação."
)}`;
const waSobMedida = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
  "Preciso de um sistema sob medida pro meu negócio."
)}`;

/*
 * Links da bio — url vazia ("") = produto ainda sem página: mostra
 * toast "na bancada" ao tocar, sem quebrar a experiência.
 */
const links = [
  {
    icon: "gauge",
    title: "Scanner Operacional™",
    tag: "diagnóstico",
    subtitle: "Abra o capô: diagnóstico completo da sua operação",
    url: waDiagnostico,
    featured: true,
  },
  {
    icon: "wrench",
    title: "Oficina AngelCode",
    tag: "em breve",
    subtitle: "A oficina de alta performance para negócios",
    url: "",
    outline: true,
  },
  {
    icon: "blueprint",
    title: "Sistema sob medida",
    subtitle: "CRM, automações e agentes feitos pro seu motor",
    url: waSobMedida,
  },
  {
    icon: "globe",
    title: "Site AngelCode",
    subtitle: "Conheça a oficina por dentro",
    url: config.site,
  },
  {
    icon: "wallet",
    title: "Checkinmoney",
    subtitle: "Meu sistema de gestão financeira",
    url: "https://www.checkinmoney.com/",
  },
  {
    icon: "chat",
    title: "WhatsApp",
    subtitle: "Fala direto comigo, de operador pra operador",
    url: waUrl,
  },
];

/* ---------- ícones ---------- */

const icons = {
  gauge:
    '<path d="M5 19a9 9 0 1 1 14 0"/><path d="m12 13 3.5-3.5"/><circle cx="12" cy="13" r="1" fill="currentColor" stroke="none"/>',
  globe:
    '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/>',
  wrench:
    '<path d="M14.7 6.3a4.5 4.5 0 0 0-6 6L3 18a2.1 2.1 0 0 0 3 3l5.7-5.7a4.5 4.5 0 0 0 6-6L14.5 12 12 9.5Z"/>',
  blueprint:
    '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h6V3"/><path d="M9 21v-6h12"/><path d="M14 9h4M14 12h2"/>',
  zap: '<path d="M13 2 4.5 13.5H11L9.5 22 18 10.5h-6.5Z"/>',
  cpu:
    '<rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9.5" y="9.5" width="5" height="5"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>',
  wallet:
    '<path d="M20 7H5a2 2 0 0 1 0-4h13v4"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1"/><path d="M16 13h2"/>',
  chat: '<path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H7l-4 4v-6.5A8.5 8.5 0 1 1 21 11.5Z"/>',
};

const icon = (name) =>
  `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || ""}</svg>`;

/* ---------- render dos links ---------- */

function renderLinks() {
  const nav = document.getElementById("links");
  if (!nav) return;

  nav.innerHTML = links
    .map((l, i) => {
      const cls = `link${l.featured ? " link--featured" : ""}${l.outline ? " link--outline" : ""}`;
      const tag = l.tag ? `<span class="link__tag">${l.tag}</span>` : "";
      const href = l.url || "#";
      const ext = l.url ? ` target="_blank" rel="noopener"` : ` data-soon="true"`;
      return `
        <a class="${cls}" style="--i:${i}" href="${href}"${ext}>
          <span class="link__icon">${icon(l.icon)}</span>
          <span class="link__body">
            <span class="link__title">${l.title}${tag}</span>
            <p class="link__sub">${l.subtitle}</p>
          </span>
          <svg class="link__arrow" viewBox="0 0 24 24"><path d="M7 17 17 7"/><path d="M9 7h8v8"/></svg>
        </a>`;
    })
    .join("");

  // links sem URL ainda: toast em vez de navegação
  nav.querySelectorAll("[data-soon]").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      toast("Na bancada da oficina — em breve por aqui.");
    });
  });
}

/* ---------- toast ---------- */

let toastTimer;
function toast(text) {
  const el = document.querySelector("[data-toast]");
  if (!el) return;
  el.textContent = text;
  el.classList.add("is-on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("is-on"), 2400);
}

/* ---------- compartilhar ---------- */

function setupShare() {
  const btn = document.querySelector("[data-share]");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    const data = {
      title: "Mizael Anjos · Oficina AngelCode",
      text: "Seu negócio não precisa trabalhar mais. Precisa trabalhar melhor.",
      url: location.href,
    };
    if (navigator.share) {
      try { await navigator.share(data); } catch (_) { /* usuário cancelou */ }
      return;
    }
    try {
      await navigator.clipboard.writeText(location.href);
      toast("Link copiado.");
    } catch (_) {
      toast(location.href);
    }
  });
}

/* ---------- salvar contato (vCard) ---------- */

function setupVcard() {
  const btn = document.querySelector("[data-vcard]");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const v = config.vcard;
    const vcf = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${v.name}`,
      `ORG:${v.org}`,
      `TITLE:${v.title}`,
      `TEL;TYPE=CELL:+${config.whatsapp}`,
      `EMAIL:${config.email}`,
      `URL:${config.instagram}`,
      "END:VCARD",
    ].join("\r\n");

    const blob = new Blob([vcf], { type: "text/vcard;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "mizael-anjos.vcf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);
    toast("Contato salvo — confere seus downloads.");
  });
}

/* ---------- links sociais ---------- */

function applySocial() {
  document.querySelectorAll("[data-instagram]").forEach((a) => (a.href = config.instagram));
  document.querySelectorAll("[data-mail]").forEach((a) => (a.href = `mailto:${config.email}`));
  document.querySelectorAll("[data-youtube]").forEach((a) => {
    if (config.youtube) {
      a.href = config.youtube;
      a.target = "_blank";
      a.rel = "noopener";
    } else {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        toast("Canal em construção — em breve.");
      });
    }
  });
}

/* ---------- boot ---------- */

renderLinks();
setupShare();
setupVcard();
applySocial();
