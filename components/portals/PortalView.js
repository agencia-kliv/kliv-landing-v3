"use client";

import { useMemo, useState } from "react";

const TABS = [
  { id: "resumen", label: "Resumen" },
  { id: "campanas", label: "Campañas" },
  { id: "cambios", label: "Registro de cambios" },
  { id: "reuniones", label: "Reuniones" },
];

function fmtInt(n) {
  try {
    return new Intl.NumberFormat("es-AR").format(n);
  } catch {
    return String(n);
  }
}

function fmtMoney(n) {
  try {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `$${fmtInt(Math.round(n))} ARS`;
  }
}

function fmtDate(iso) {
  try {
    const d = new Date(`${iso}T00:00:00`);
    return new Intl.DateTimeFormat("es-AR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(d);
  } catch {
    return iso;
  }
}

function Metric({ label, value }) {
  return (
    <div>
      <div className="text-[10.5px] font-[600] uppercase tracking-[.04em] text-kliv-text-4">
        {label}
      </div>
      <div className="mt-[3px] text-[14.5px] font-[650] text-kliv-text-1">
        {value ?? "—"}
      </div>
    </div>
  );
}

function CampaignCard({ campaign }) {
  const isActive = campaign.status === "ACTIVE";
  return (
    <div className="border-b border-kliv-text-6 p-[16px] last:border-b-0 lg:p-[18px]">
      <div className="flex flex-wrap items-start justify-between gap-[12px]">
        <div>
          <div className="text-[14.5px] font-[650] text-kliv-text-1">{campaign.name}</div>
          <div className="mt-[2px] text-[12px] text-kliv-text-4">{campaign.objective}</div>
        </div>
        <span
          className={`whitespace-nowrap rounded-full px-[9px] py-[3px] text-[11px] font-[700] tracking-[.02em] ${
            isActive
              ? "bg-kliv-lightgreen text-kliv-primary"
              : "border border-kliv-text-6 bg-kliv-sand text-kliv-text-4"
          }`}
        >
          {isActive ? "Activa" : "Pausada"}
        </span>
      </div>

      <div className="mt-[14px] grid grid-cols-2 gap-[10px] xs:grid-cols-3 lg:grid-cols-6">
        <Metric label="Invertido" value={campaign.spend} />
        <Metric label="Impresiones" value={campaign.impressions} />
        <Metric label="Clics" value={campaign.clicks} />
        <Metric label="CTR" value={campaign.ctr} />
        <Metric label="CPC" value={campaign.cpc} />
        <Metric label="Alcance" value={campaign.reach} />
      </div>

      {campaign.result_label && (
        <div className="mt-[12px] border-t border-dashed border-kliv-text-6 pt-[12px] text-[12.5px] text-kliv-text-3">
          {campaign.result_label}: <b className="text-kliv-text-1">{campaign.result_value}</b>{" "}
          · costo por resultado <b className="text-kliv-text-1">{campaign.cost_per_result}</b>
        </div>
      )}
    </div>
  );
}

function EmptyState({ icon, children }) {
  return (
    <div className="px-[18px] py-[32px] text-center text-[13.5px] text-kliv-text-4">
      <div className="mb-[8px] text-[26px]">{icon}</div>
      {children}
    </div>
  );
}

export default function PortalView({ data }) {
  const [activeTab, setActiveTab] = useState("resumen");

  const kpis = useMemo(() => {
    const m = data.meta;
    return [
      { label: "Inversión (30d)", value: typeof m.spend_ars === "number" ? fmtMoney(m.spend_ars) : m.spend_ars },
      { label: "Resultados totales", value: fmtInt(m.results_total) },
      { label: "Impresiones", value: fmtInt(m.impressions_total) },
      { label: "Clics", value: fmtInt(m.clicks_total) },
    ];
  }, [data.meta]);

  const changelog = useMemo(
    () => [...data.changelog].sort((a, b) => (a.date < b.date ? 1 : -1)),
    [data.changelog]
  );
  const meetings = useMemo(
    () => [...data.meetings].sort((a, b) => (a.date < b.date ? 1 : -1)),
    [data.meetings]
  );

  const activeCount = data.campaigns.length;
  const pausedCount = data.campaigns_paused.length;

  return (
    <div className="mx-auto w-full max-w-[1040px] px-[20px] py-[36px] lg:py-[48px]">
      <div className="mb-[22px] flex flex-wrap items-start justify-between gap-[16px]">
        <div className="flex items-center gap-[12px]">
          <div className="flex h-[44px] w-[44px] flex-shrink-0 items-center justify-center rounded-[12px] bg-kliv-primary text-[16px] font-[700] tracking-[.02em] text-white">
            {data.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="text-[20px] font-[650] tracking-[-.01em] text-kliv-text-1">
              {data.name}
            </div>
            <div className="mt-[1px] text-[12.5px] text-kliv-text-4">
              Portal de campañas · gestionado por Agencia KLIV
            </div>
          </div>
        </div>
        <div className="text-right text-[12px] text-kliv-text-4">
          Actualizado por <b className="font-[600] text-kliv-text-3">Agencia KLIV</b>
          <br />
          Cuenta Meta Ads · {data.name}
        </div>
      </div>

      <nav className="mb-[24px] flex gap-[6px] overflow-x-auto border-b border-kliv-text-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`mr-[22px] whitespace-nowrap border-b-2 py-[10px] text-[14px] font-[600] transition-colors duration-150 ${
              activeTab === tab.id
                ? "border-kliv-primary text-kliv-primary"
                : "border-transparent text-kliv-text-4 hover:text-kliv-text-3"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {activeTab === "resumen" && (
        <section>
          <div className="mb-[14px] flex items-center gap-[6px] text-[11.5px] text-kliv-text-4">
            <span className="h-[6px] w-[6px] rounded-full bg-kliv-primary" />
            {data.meta.period_label}
          </div>

          <div className="grid grid-cols-2 gap-[10px] xs:grid-cols-4">
            {kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-[14px] border border-kliv-text-6 bg-white p-[14px_16px] shadow-header"
              >
                <div className="text-[11.5px] font-[600] uppercase tracking-[.04em] text-kliv-text-4">
                  {kpi.label}
                </div>
                <div className="mt-[6px] text-[21px] font-[650] tracking-[-.01em] text-kliv-text-1">
                  {kpi.value}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-[12px] mt-[28px] text-[15px] font-[650] text-kliv-text-1">
            Qué se está haciendo ahora
          </div>
          <div className="rounded-[14px] border border-kliv-text-6 bg-white p-[16px_18px] shadow-header">
            <p className="text-[13.5px] leading-[1.55] text-kliv-text-3">
              <b className="text-kliv-text-1">{activeCount}</b> campaña{activeCount === 1 ? "" : "s"} activa
              {activeCount === 1 ? "" : "s"} generando resultados ahora mismo, enfocadas en leads de formulario web y
              conversaciones por WhatsApp. {pausedCount} campaña{pausedCount === 1 ? "" : "s"} pausada
              {pausedCount === 1 ? "" : "s"} recientemente. Ver el detalle completo en la pestaña{" "}
              <b className="text-kliv-text-1">Campañas</b>.
            </p>
          </div>

          <div className="mt-[18px] rounded-[14px] border border-dashed border-kliv-text-6 bg-kliv-sand p-[14px_16px] text-[12.5px] leading-[1.5] text-kliv-text-3">
            <b className="text-kliv-text-1">Nota:</b> este panel se actualiza periódicamente desde KLIV con los datos
            de Meta Ads. Cuando conectemos Google Calendar, los resúmenes de las reuniones de Meet se van a poder
            cargar acá automáticamente.
          </div>
        </section>
      )}

      {activeTab === "campanas" && (
        <section>
          <div className="mb-[4px] text-[15px] font-[650] text-kliv-text-1">Campañas activas</div>
          <div className="mb-[14px] text-[12.5px] text-kliv-text-4">
            Período: últimos 30 días · cuenta en pesos argentinos (ARS)
          </div>
          <div className="rounded-[14px] border border-kliv-text-6 bg-white shadow-header">
            {data.campaigns.length ? (
              data.campaigns.map((c) => <CampaignCard key={c.id} campaign={c} />)
            ) : (
              <EmptyState icon="—">No hay campañas en este estado.</EmptyState>
            )}
          </div>

          <div className="mb-[4px] mt-[28px] text-[15px] font-[650] text-kliv-text-1">
            Pausadas recientemente
          </div>
          <div className="rounded-[14px] border border-kliv-text-6 bg-white shadow-header">
            {data.campaigns_paused.length ? (
              data.campaigns_paused.map((c) => <CampaignCard key={c.id} campaign={c} />)
            ) : (
              <EmptyState icon="—">No hay campañas en este estado.</EmptyState>
            )}
          </div>
        </section>
      )}

      {activeTab === "cambios" && (
        <section>
          <div className="mb-[4px] text-[15px] font-[650] text-kliv-text-1">Registro de cambios</div>
          <div className="mb-[14px] text-[12.5px] text-kliv-text-4">
            Qué se fue ajustando en la cuenta, en orden cronológico.
          </div>
          <div className="rounded-[14px] border border-kliv-text-6 bg-white shadow-header">
            {changelog.length ? (
              <div className="px-[18px] py-[6px]">
                {changelog.map((item, i) => (
                  <div
                    key={`${item.date}-${i}`}
                    className="flex gap-[12px] border-t border-kliv-text-6 py-[12px] first:border-t-0"
                  >
                    <span className="mt-[6px] h-[8px] w-[8px] flex-shrink-0 rounded-full bg-kliv-primary" />
                    <div>
                      <div className="text-[11px] font-[600] uppercase tracking-[.03em] text-kliv-text-4">
                        {fmtDate(item.date)}
                      </div>
                      <div className="mt-[2px] text-[13.5px] leading-[1.45] text-kliv-text-1">
                        {item.tag && (
                          <span className="mr-[7px] inline-block rounded-[6px] bg-kliv-lightgreen px-[7px] py-[1px] align-[1px] text-[10.5px] font-[700] text-kliv-primary">
                            {item.tag}
                          </span>
                        )}
                        {item.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState icon="🗒️">Todavía no hay cambios registrados.</EmptyState>
            )}
          </div>
        </section>
      )}

      {activeTab === "reuniones" && (
        <section>
          <div className="mb-[4px] text-[15px] font-[650] text-kliv-text-1">Resúmenes de reuniones</div>
          <div className="mb-[14px] text-[12.5px] text-kliv-text-4">
            Notas y acuerdos de las reuniones con KLIV.
          </div>
          {meetings.length ? (
            <div className="flex flex-col gap-[14px]">
              {meetings.map((mtg, i) => (
                <div
                  key={`${mtg.date}-${i}`}
                  className="rounded-[14px] border border-kliv-text-6 bg-white p-[16px_18px] shadow-header"
                >
                  <div className="flex flex-wrap justify-between gap-[10px]">
                    <div className="text-[14px] font-[650] text-kliv-text-1">{mtg.title || "Reunión"}</div>
                    <div className="text-[11.5px] font-[600] text-kliv-text-4">{fmtDate(mtg.date)}</div>
                  </div>
                  <div className="mt-[8px] whitespace-pre-wrap text-[13px] leading-[1.55] text-kliv-text-3">
                    {mtg.summary}
                  </div>
                  {mtg.attendees && (
                    <div className="mt-[10px] text-[11.5px] text-kliv-text-4">
                      Participantes: {mtg.attendees}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-[14px] border border-kliv-text-6 bg-white shadow-header">
              <EmptyState icon="📅">
                Todavía no hay resúmenes de reuniones cargados.
                <br />
                Cuando conectemos Google Calendar / notas de Meet, van a aparecer acá automáticamente.
              </EmptyState>
            </div>
          )}
        </section>
      )}

      <footer className="mt-[34px] flex flex-wrap justify-between gap-[8px] border-t border-kliv-text-6 pt-[16px] text-[11.5px] text-kliv-text-4">
        <span>
          {data.name} × Agencia KLIV
        </span>
        <span>Actualizado: {fmtDate(data.meta.updated_at)}</span>
      </footer>
    </div>
  );
}
