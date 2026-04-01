import { RotateCcw, ShieldCheck, Truck } from "lucide-react";

const signals = [
  {
    icon: Truck,
    title: "Free shipping",
    description: "Orders over $49",
  },
  {
    icon: RotateCcw,
    title: "Easy returns",
    description: "30-day policy",
  },
  {
    icon: ShieldCheck,
    title: "Secure payment",
    description: "SSL encrypted",
  },
];

export default function TrustSignals() {
  return (
    <section className="mx-auto max-w-7xl border-y px-4 py-12">
      <div className="grid grid-cols-3 gap-4">
        {signals.map((signal) => (
          <div key={signal.title} className="text-center">
            <signal.icon className="mx-auto h-6 w-6 text-neutral-600" />
            <p className="mt-2 text-sm font-medium">{signal.title}</p>
            <p className="text-xs text-neutral-400">{signal.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
