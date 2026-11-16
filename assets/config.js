/* ==========================================================
   CONFIGURAÇÃO CENTRAL — edite aqui e a página inteira muda
   (header, hero, menu, rodapé, mapa, horários, WhatsApp).
   - Campo vazio ("") = o item some / mantém o texto padrão do HTML.
   - Os links do menu (nav) apontam para âncoras (#sobre) ou páginas.
   ========================================================== */
window.SITE = {
  // ---------- Identidade ----------
  title: "Chenia Barbosa | Psicóloga Clínica MG",   // título da aba do navegador
  brand: "Chenia Barbosa",
  initials: "CB",                                   // aparece no círculo da marca
  tagline: "Psicóloga clínica",
  specialty: "ansiedade, autoestima e relacionamentos",
  description: "Atendimento presencial para adultos, com acolhimento, ética e escuta cuidadosa.",
  registry: "CRP 00/000000",                        // troque pelo registro real
  photo: "assets/foto-principal.jpg",                                        // ex.: "assets/foto-principal.jpg" (retrato vertical funciona melhor)
  accent: "",                                       // opcional: cor de destaque, ex.: "#3d7a5c"

  // ---------- Contato ----------
  email: "contato@seusite.com.br",
  phone: "+55 35 8847-9860",
  whatsapp: "553588479860",                        // DDI + DDD + número, só dígitos
  whatsappMessage: "Olá, Chenia! Gostaria de agendar uma conversa.",
  cta: { label: "Agendar conversa" },              // href opcional; por padrão abre o WhatsApp

  // ---------- Endereço e horários ----------
  timezone: "America/Sao_Paulo",
  address: {
    line1: "Rua Exemplo, 000 — sala 00",
    line2: "Bairro, Cidade – UF",
    mapsUrl: "https://maps.google.com/"
  },
  // Domingo → Sábado. Use null para "Fechado". Formato 24h.
  hours: [
    null,
    ["08:00", "19:00"],
    ["08:00", "19:00"],
    ["08:00", "19:00"],
    ["08:00", "19:00"],
    ["08:00", "18:00"],
    ["08:00", "12:00"]
  ],

  // ---------- Redes (deixe "" para ocultar) ----------
  social: {
    instagram: "https://instagram.com/",
    linkedin: "",
    youtube: "",
    facebook: ""
  },

  // ---------- Menu ----------
  // mega: true → este item abre o mega menu com os serviços
  nav: [
    { label: "Início",      href: "#inicio" },
    { label: "Sobre",       href: "#sobre" },
    { label: "Atendimento", href: "#atendimento", mega: true },
    { label: "Dúvidas",     href: "#duvidas" },
    { label: "Contato",     href: "#contato" }
  ],

  // ---------- Serviços (mega menu e rodapé) ----------
  // message = texto pré-preenchido no WhatsApp quando a pessoa clica no serviço (seção Atendimento)
  services: [
    { title: "Terapia individual",     desc: "Sessões presenciais de 50 minutos, em um espaço acolhedor.", icon: "user",     href: "#atendimento", message: "Olá, Chenia! Gostaria de agendar uma sessão de terapia individual." },
    { title: "Terapia de casal",       desc: "Comunicação, vínculo e acordos saudáveis.",                   icon: "heart",    href: "#atendimento", message: "Olá, Chenia! Gostaria de saber mais sobre a terapia de casal e agendar um horário." },
    { title: "Orientação de carreira", desc: "Clareza para decisões profissionais.",                        icon: "brief",    href: "#atendimento", message: "Olá, Chenia! Gostaria de agendar uma conversa sobre orientação de carreira." },
    { title: "Avaliação inicial",      desc: "Um primeiro encontro para entender sua demanda e traçar o caminho.", icon: "calendar", href: "#contato", message: "Olá, Chenia! Gostaria de agendar uma avaliação inicial." }
  ],

  // ---------- Faixa animada (entre Atendimento e Dúvidas) ----------
  marquee: ["Escuta", "Cuidado", "Ética", "Acolhimento", "Presença"],

  legal: "Todos os direitos reservados."
};
