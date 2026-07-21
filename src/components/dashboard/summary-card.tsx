import type { LucideIcon } from "lucide-react";

type SummaryCardProps = {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
};

export function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
}: SummaryCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <strong className="mt-2 block text-3xl text-slate-900">
            {value}
          </strong>

          <span className="mt-2 block text-sm text-slate-400">
            {description}
          </span>
        </div>

        <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
          <Icon size={22} />
        </div>
      </div>
    </article>
  );
}
