"use client";

import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cart";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutContent() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const clearCart = useCartStore((s) => s.clearCart);

  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsLoggedIn(localStorage.getItem("auth") === "true");
  }, []);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    router.push("/orders/demo-order");
  };

  const subtotal = mounted ? totalPrice() : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-8 text-2xl font-semibold">Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="flex flex-col gap-12 md:flex-row">
        {/* Left — Form */}
        <div className="md:w-3/5">
          {/* Contact */}
          <section>
            <h2 className="mb-4 text-lg font-semibold">Contact</h2>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Email
            </label>
            <Input
              id="email"
              type="email"
              required
              defaultValue={isLoggedIn ? "demo@example.com" : ""}
              disabled={isLoggedIn}
              className="mt-1 h-10"
            />
          </section>

          {/* Shipping address */}
          <section className="mt-8">
            <h2 className="mb-4 text-lg font-semibold">Shipping address</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Name
                </label>
                <Input id="name" required className="mt-1 h-10" />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Address
                </label>
                <Input id="address" required className="mt-1 h-10" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    City
                  </label>
                  <Input id="city" required className="mt-1 h-10" />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    State
                  </label>
                  <Input id="state" required className="mt-1 h-10" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    ZIP code
                  </label>
                  <Input id="zip" required className="mt-1 h-10" />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Country
                  </label>
                  <select
                    id="country"
                    required
                    className="mt-1 h-10 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:border-neutral-700 dark:bg-neutral-900"
                  >
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Payment */}
          <section className="mt-8">
            <h2 className="mb-4 text-lg font-semibold">Payment method</h2>
            <p className="mb-3 text-xs text-neutral-400">Visa · Mastercard · Amex</p>
            <div className="space-y-4 rounded-lg border p-4 dark:border-neutral-700">
              <div>
                <label htmlFor="card" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Card number
                </label>
                <Input id="card" placeholder="4242 4242 4242 4242" required className="mt-1 h-10" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Expiry
                  </label>
                  <Input id="expiry" placeholder="MM/YY" required className="mt-1 h-10" />
                </div>
                <div>
                  <label htmlFor="cvc" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    CVC
                  </label>
                  <Input id="cvc" placeholder="123" required className="mt-1 h-10" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right — Order summary */}
        <div className="md:w-2/5">
          <div className="h-fit rounded-lg border bg-neutral-50 p-6 md:sticky md:top-24 dark:border-neutral-700 dark:bg-neutral-900">
            <h2 className="text-lg font-semibold">Order summary</h2>

            {mounted && items.length > 0 ? (
              <ul className="mt-4">
                {items.map((item) => (
                  <li key={item.variantId} className="flex gap-3 border-b py-3 dark:border-neutral-700">
                    <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded bg-neutral-200 dark:bg-neutral-800">
                      {item.image ? (
                        <Image src={item.image} alt={item.productName} fill className="object-cover" />
                      ) : (
                        <div className="h-full w-full" />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <p className="text-sm font-medium">{item.productName}</p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          {item.color} / {item.size}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">Qty {item.quantity}</span>
                        <span className="text-sm font-medium">
                          ${((item.price * item.quantity) / 100).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">No items in cart</p>
            )}

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Subtotal</span>
                <span>${(subtotal / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Shipping</span>
                <span>Free</span>
              </div>
            </div>

            <div className="mt-4 border-t pt-4 dark:border-neutral-700">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${(subtotal / 100).toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 w-full cursor-pointer rounded-lg bg-black py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              Place order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
