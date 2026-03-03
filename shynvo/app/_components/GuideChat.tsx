'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

type Msg = { role: 'user' | 'guide'; text: string };

function clampShort(s: string, max = 240) {
  const t = s.trim();
  if (t.length <= max) return t;
  return t.slice(0, max).trimEnd() + '…';
}

// lightweight language heuristic (fast + no deps)
function detectLang(text: string): 'ar' | 'fr' | 'es' | 'en' {
  if (/[؀-ۿ]/.test(text)) return 'ar';
  if (/[àâçéèêëîïôûùüÿœæ]/i.test(text)) return 'fr';
  if (/[ñáéíóúü¡¿]/i.test(text)) return 'es';
  return 'en';
}

function pick(lang: string, en: string, ar: string, fr: string, es: string) {
  if (lang === 'ar') return ar;
  if (lang === 'fr') return fr;
  if (lang === 'es') return es;
  return en;
}

export default function GuideChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: 'guide', text: 'Hi — I’m Guide. Ask where to start or what each building does.' },
  ]);

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [open, msgs]);

  const quick = useMemo(
    () => [
      { k: 'Start', q: 'Where should I start?' },
      { k: 'OS', q: 'What is Shynvo OS?' },
      { k: 'University', q: 'What is University Hub?' },
      { k: 'Robot', q: 'What is the cinematic robot?' },
      { k: 'Pricing', q: 'Explain pricing and trial.' },
    ],
    []
  );

  function reply(userText: string): string {
    const lang = detectLang(userText);
    const low = userText.toLowerCase();

    if (low.includes('start') || low.includes('begin') || low.includes('where')) {
      return pick(
        lang,
        'Start with University Hub for learning, or Shynvo OS for execution and planning. Study or productivity?',
        'ابدأ بـ University Hub للتعلّم، أو Shynvo OS للتنفيذ والتخطيط. دراسة أم إنتاجية؟',
        'Commence par University Hub pour apprendre, ou Shynvo OS pour exécuter et planifier. Études ou productivité ?',
        'Empieza con University Hub para aprender, o Shynvo OS para ejecutar y planificar. ¿Estudio o productividad?'
      );
    }

    if (low.includes('os') || low.includes('cockpit') || low.includes('terminal')) {
      return pick(
        lang,
        'Shynvo OS is the cockpit: Missions → Timeline → Focus → Momentum → Logbook. Built for execution.',
        'Shynvo OS هو قمرة القيادة: Missions → Timeline → Focus → Momentum → Logbook. للتنفيذ.',
        'Shynvo OS est le cockpit : Missions → Timeline → Focus → Momentum → Logbook. Conçu pour exécuter.',
        'Shynvo OS es el cockpit: Missions → Timeline → Focus → Momentum → Logbook. Hecho para ejecutar.'
      );
    }

    if (low.includes('university') || low.includes('hub') || low.includes('study') || low.includes('exam')) {
      return pick(
        lang,
        'University Hub is the academic building: Study Lab, Exam Arena, Career Launchpad, Visual Concept Forge.',
        'University Hub مبنى أكاديمي: Study Lab و Exam Arena و Career Launchpad و Visual Concept Forge.',
        'University Hub est le bâtiment académique : Study Lab, Exam Arena, Career Launchpad, Visual Concept Forge.',
        'University Hub es el edificio académico: Study Lab, Exam Arena, Career Launchpad, Visual Concept Forge.'
      );
    }

    if (low.includes('experiment') || low.includes('beta')) {
      return pick(
        lang,
        'Experiments is a country of standalone AI worlds (BETA). Each mode has independent logic.',
        'Experiments “بلد” لعوالم AI مستقلة (بيتا). كل تجربة لها منطقها الخاص.',
        'Experiments est un “pays” de mondes IA indépendants (BETA). Chaque mode a sa logique.',
        'Experiments es un “país” de mundos IA independientes (BETA). Cada modo tiene su propia lógica.'
      );
    }

    if (low.includes('robot') || low.includes('cinematic')) {
      return pick(
        lang,
        'The cinematic robot is optional. Full robot experience is in /robot and inside Shynvo OS.',
        'الروبوت السينمائي اختياري. التجربة الكاملة في /robot وداخل Shynvo OS.',
        'Le robot cinématique est optionnel. L’expérience complète est sur /robot et dans Shynvo OS.',
        'El robot cinemático es opcional. La experiencia completa está en /robot y dentro de Shynvo OS.'
      );
    }

    if (low.includes('price') || low.includes('pricing') || low.includes('trial') || low.includes('30')) {
      return pick(
        lang,
        'Starter Access is free for 30 days. After that, upgrade is required to continue using Shynvo.',
        'الوصول مجاني 30 يومًا. بعد ذلك الترقية مطلوبة للاستمرار.',
        'Accès gratuit pendant 30 jours. Ensuite, une offre payante est requise pour continuer.',
        'Acceso gratis por 30 días. Después debes actualizar para seguir usando Shynvo.'
      );
    }

    return pick(
      lang,
      'Tell me your goal in one sentence (study, work, team). I’ll route you to the right building.',
      'قل هدفك بجملة واحدة (دراسة/عمل/فريق) وسأرشدك للمبنى المناسب.',
      'Dis-moi ton objectif en une phrase (études, travail, équipe) et je te dirai où aller.',
      'Dime tu objetivo en una frase (estudio, trabajo, equipo) y te diré a dónde ir.'
    );
  }

  function send(text: string) {
    const q = text.trim();
    if (!q) return;
    const a = clampShort(reply(q));
    setMsgs((m) => [...m, { role: 'user', text: q }, { role: 'guide', text: a }]);
    setInput('');
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="rounded-2xl border border-white/10 bg-[#0B0F14]/90 px-4 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur hover:bg-[#0B0F14]"
        >
          Guide
        </button>
      ) : (
        <div className="w-[320px] overflow-hidden rounded-3xl border border-white/10 bg-[#0B0F14]/95 text-white shadow-2xl backdrop-blur">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div>
              <div className="text-sm font-semibold">Guide</div>
              <div className="text-[11px] text-white/60">Short answers • onboarding help</div>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-xl px-2 py-1 text-white/70 hover:bg-white/5">
              ✕
            </button>
          </div>

          <div ref={listRef} className="max-h-[320px] space-y-2 overflow-auto px-4 py-3">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === 'user'
                    ? 'ml-auto w-fit max-w-[85%] rounded-2xl bg-white/10 px-3 py-2 text-sm text-white'
                    : 'mr-auto w-fit max-w-[85%] rounded-2xl bg-white/5 px-3 py-2 text-sm text-white/85'
                }
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 px-4 py-3">
            <div className="mb-2 flex flex-wrap gap-2">
              {quick.map((q) => (
                <button
                  key={q.k}
                  onClick={() => send(q.q)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/80 hover:bg-white/10"
                >
                  {q.k}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask…"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
                onKeyDown={(e) => e.key === 'Enter' && send(input)}
              />
              <button
                onClick={() => send(input)}
                className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-white/90"
              >
                Send
              </button>
            </div>

            <div className="mt-2 text-[11px] text-white/50">Try: “Where should I start?” • “Explain pricing”</div>
          </div>
        </div>
      )}
    </div>
  );
}
