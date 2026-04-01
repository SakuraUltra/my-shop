import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function OrderConfirmationPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
      <h1 className="mt-4 text-2xl font-semibold">Order confirmed!</h1>
      <p className="mt-2 text-neutral-500 dark:text-neutral-400">Thank you for your purchase</p>
      <p className="mt-1 text-sm text-neutral-400 dark:text-neutral-500">Order #ORD-20260401-DEMO</p>

      {/* Order details card */}
      <div className="mt-8 rounded-lg border p-6 text-left dark:border-neutral-700">
        <h2 className="text-lg font-semibold">Order details</h2>

        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-neutral-500 dark:text-neutral-400">Date</dt>
            <dd>April 1, 2026</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-neutral-500 dark:text-neutral-400">Shipping address</dt>
            <dd className="text-right">123 Demo Street, New York, NY 10001</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-neutral-500 dark:text-neutral-400">Payment</dt>
            <dd>Visa ending in 4242</dd>
          </div>
        </dl>

        <div className="mt-6 border-t pt-4 dark:border-neutral-700">
          <h3 className="text-sm font-medium">Items</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li className="flex justify-between">
              <span className="text-neutral-600 dark:text-neutral-400">Classic Cotton Tee — Black / M × 1</span>
              <span>$29.99</span>
            </li>
            <li className="flex justify-between">
              <span className="text-neutral-600 dark:text-neutral-400">Wool Blend Scarf — Camel / One Size × 1</span>
              <span>$49.99</span>
            </li>
          </ul>
        </div>

        <div className="mt-4 flex justify-between border-t pt-4 text-lg font-semibold dark:border-neutral-700">
          <span>Total</span>
          <span>$79.98</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <Link
          href="/orders/demo-order/tracking"
          className="rounded-lg border px-6 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          Track order
        </Link>
        <Link
          href="/"
          className="rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
