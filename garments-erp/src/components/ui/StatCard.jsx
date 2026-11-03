export default function StatCard({ title, value, note, icon: Icon, color }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-bold">{value}</p>
        </div>
        <div className={`rounded-lg p-3 ${color}`}>
          <Icon size={20} />
        </div>
      </div>
      {note && <p className="mt-3 text-xs text-slate-400">{note}</p>}
    </div>
  );
}
