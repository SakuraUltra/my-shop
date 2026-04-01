import Link from "next/link";

const trackingSteps = [
  { status: "Order delivered", time: "April 5, 2026 14:30", current: true },
  { status: "Out for delivery", time: "April 5, 2026 08:15", current: false },
  { status: "Arrived at local facility", time: "April 4, 2026 22:00", current: false },
  { status: "In transit", time: "April 3, 2026 16:45", current: false },
  { status: "Shipped", time: "April 2, 2026 10:30", current: false },
  { status: "Order placed", time: "April 1, 2026 09:00", current: false },
];

export default function TrackingPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      {/* Header */}
      <h1 className="text-2xl font-semibold">Order tracking</h1>
      <div className="mt-2 space-y-0.5 text-sm text-neutral-500 dark:text-neutral-400">
        <p>Order #ORD-20260401-DEMO</p>
        <p>Carrier: DHL Express · Tracking: 1234567890</p>
      </div>

      {/* Timeline */}
      <div className="mt-10">
        {trackingSteps.map((step, idx) => {
          const isLast = idx === trackingSteps.length - 1;

          return (
            <div key={idx} className="relative flex gap-6 pb-6">
              {/* Dot + line */}
              <div className="flex flex-col items-center">
                <div
                  className={`h-3 w-3 flex-shrink-0 rounded-full ${
                    step.current ? "bg-green-500" : "border-2 border-neutral-300"
                  }`}
                />
                {!isLast && <div className="w-0 flex-1 border-l-2 border-neutral-200 dark:border-neutral-700" />}
              </div>

              {/* Content */}
              <div className="-mt-0.5 pb-2">
                <p className={`text-sm ${step.current ? "font-semibold text-neutral-900 dark:text-white" : "text-neutral-700 dark:text-neutral-300"}`}>
                  {step.status}
                </p>
                <p className="mt-0.5 text-xs text-neutral-400 dark:text-neutral-500 sm:mt-0">{step.time}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Back button */}
      <Link
        href="/orders/demo-order"
        className="mt-4 inline-block rounded-lg border px-6 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
      >
        Back to order
      </Link>
    </div>
  );
}
