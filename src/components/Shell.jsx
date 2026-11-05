import { t, useLang } from '../i18n.js';

const NAV = [
  { id: 'projetos', label: 'Projetos' },
  { id: 'leads', label: 'Leads e clientes' },
  { id: 'sistemas', label: 'Sistemas' },
  { id: 'orcamentos', label: 'Orçamentos' },
  { id: 'usuarios', label: 'Usuários' },
];

export function Shell({ active, go, title, action, children }) {
  useLang();
  return (
    <div className="flex h-full bg-neutral-50 text-neutral-900">
      <aside className="flex w-60 flex-col border-r border-neutral-200 bg-white p-4">
        <div className="mb-6 px-2 text-lg font-semibold">Skye Advantage</div>
        <nav className="flex flex-col gap-1">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className={`h-10 rounded px-3 text-left text-sm ${
                active === n.id ? 'bg-neutral-900 font-medium text-white' : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              {t(n.label)}
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto p-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">{t(title)}</h1>
          {action && <button className="h-10 rounded bg-neutral-900 px-4 text-sm font-medium text-white">{t(action)}</button>}
        </div>
        {children}
      </main>
    </div>
  );
}

export function Table({ cols, rows }) {
  useLang();
  return (
    <div className="overflow-hidden rounded border border-neutral-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-neutral-100 text-neutral-700">
          <tr>{cols.map((c) => <th key={c} className="px-4 py-3 font-medium">{t(c)}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-neutral-200">
              {r.map((v, j) => <td key={j} className="px-4 py-3">{typeof v === 'string' ? t(v) : v}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Tag({ children }) {
  useLang();
  return <span className="rounded-full border border-neutral-300 bg-neutral-100 px-2 py-0.5 text-xs text-neutral-800">{typeof children === 'string' ? t(children) : children}</span>;
}

export function Stat({ label, value }) {
  useLang();
  return (
    <div className="rounded border border-neutral-200 bg-white p-4">
      <div className="text-sm text-neutral-600">{t(label)}</div>
      <div className="mt-1 text-2xl font-semibold">{t(value)}</div>
    </div>
  );
}
