
import React, { useState } from "react";
import { CartProvider, useCart } from "./CartContext";

const shoes = [
  {
    id: 1,
    name: "Campus Men's Sneakers",
    price: 50,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Campus Men's OG-43 Sneakers",
    price: 75,
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Classic White Sneakers",
    price: 60,
    image:
      "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Running Sports Shoes",
    price: 85,
    image:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=600&q=80",
  },
];

function Navbar({ openShopping, openPayment, page }) {
  const { cartCount } = useCart();

  return (
    <nav className="flex flex-wrap items-center justify-between gap-4 bg-white px-6 py-5 shadow-sm">
      <button
        onClick={openShopping}
        className="text-2xl font-bold"
      >
        Shoe<span className="text-amber-700">Store</span>
      </button>

      {page === "shop" ? (
        <>
          <div className="hidden gap-6 sm:flex">
            <a href="#home">Home</a>
            <a href="#products">Products</a>
            <a href="#about">About Us</a>
          </div>

          <button
            onClick={openPayment}
            className="rounded-lg bg-amber-700 px-4 py-2 text-white"
          >
            Cart ({cartCount})
          </button>
        </>
      ) : (
        <button
          onClick={openShopping}
          className="rounded-lg border border-stone-300 px-4 py-2"
        >
          ← Continue Shopping
        </button>
      )}
    </nav>
  );
}

function ShoppingPage({ openPayment }) {
  const {
    cart,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    total,
  } = useCart();

  return (
    <>
      <header
        id="home"
        className="mx-4 mt-6 rounded-2xl bg-[#e4d2ae] px-6 py-10 sm:mx-8 sm:px-10"
      >
        <p className="text-sm uppercase tracking-widest">
          Step into your style
        </p>

        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
          Find Your Perfect Pair
        </h1>

        <p className="mt-3 max-w-lg text-stone-700">
          Discover comfortable sneakers and sports shoes for every occasion.
        </p>

        <a
          href="#products"
          className="mt-5 inline-block rounded-lg bg-stone-900 px-5 py-3 text-white"
        >
          Shop Now
        </a>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-8 lg:grid-cols-[1fr_320px]">
        <section id="products">
          <h2 className="mb-5 text-2xl font-bold">
            Available Shoes
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            {shoes.map((shoe) => (
              <article
                key={shoe.id}
                className="overflow-hidden rounded-xl bg-white p-4 shadow-sm"
              >
                <img
                  src={shoe.image}
                  alt={shoe.name}
                  className="h-48 w-full rounded-lg bg-stone-100 object-cover"
                />

                <h3 className="mt-4 font-semibold">{shoe.name}</h3>

                <p className="mt-2 text-lg font-bold">
                  ${shoe.price.toFixed(2)}
                </p>

                <button
                  onClick={() => addToCart(shoe)}
                  className="mt-4 w-full rounded-lg bg-[#d7c39a] px-4 py-2 font-semibold hover:bg-[#c4ad7d]"
                >
                  Add to Cart
                </button>
              </article>
            ))}
          </div>
        </section>

        <aside
          id="cart"
          className="h-fit rounded-xl bg-white p-5 shadow-sm lg:sticky lg:top-5"
        >
          <h2 className="text-xl font-bold">Shopping Cart</h2>

          {cart.length === 0 ? (
            <p className="mt-5 rounded-lg bg-stone-50 p-6 text-center text-stone-500">
              Your cart is empty.
            </p>
          ) : (
            <div className="mt-5 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-stone-200 pb-4"
                >
                  <h3 className="font-semibold">{item.name}</h3>

                  <p className="mt-1 text-sm text-stone-500">
                    ${item.price.toFixed(2)} each
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="rounded border px-3 py-1"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => addToCart(item)}
                      className="rounded border px-3 py-1"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto text-sm text-red-600"
                    >
                      Remove
                    </button>
                  </div>

                  <p className="mt-2 text-sm font-medium">
                    Item total: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 border-t pt-4">
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              onClick={openPayment}
              disabled={cart.length === 0}
              className="mt-4 w-full rounded-lg bg-stone-900 px-4 py-3 text-white disabled:cursor-not-allowed disabled:bg-stone-300"
            >
              Proceed to Payment →
            </button>
          </div>
        </aside>
      </main>

      <section
        id="about"
        className="mx-4 mb-8 rounded-xl bg-white p-6 sm:mx-8"
      >
        <h2 className="text-xl font-bold">About Our Store</h2>
        <p className="mt-2 text-stone-600">
          Find shoes that match your comfort, style, and everyday needs.
        </p>
      </section>
    </>
  );
}

function PaymentPage({ openShopping, finishPayment }) {
  const { cart, total, removeFromCart, addToCart } = useCart();
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [message, setMessage] = useState("");

  function handlePayment(event) {
    event.preventDefault();
    setMessage("");

    const digits = cardNumber.replace(/\s/g, "");

    if (!/^\d{16}$/.test(digits)) {
      setMessage("Please enter a valid 16-digit demo card number.");
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      setMessage("Enter expiry in MM/YY format.");
      return;
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      setMessage("Please enter a valid 3 or 4 digit demo CVV.");
      return;
    }

    setMessage("Demo payment successful! No real payment was processed.");
    finishPayment();
  }

  if (cart.length === 0) {
    return (
      <main className="mx-auto my-16 max-w-xl rounded-xl bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-3 text-stone-600">
          Add some shoes before proceeding to payment.
        </p>
        <button
          onClick={openShopping}
          className="mt-6 rounded-lg bg-amber-700 px-5 py-3 text-white"
        >
          Return to Shopping
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-2">
      <section className="h-fit rounded-xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Order Summary</h1>
        <p className="mt-2 text-sm text-stone-500">
          Review your items before payment.
        </p>

        <div className="mt-6 space-y-5">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 border-b border-stone-200 pb-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-20 w-20 rounded-lg bg-stone-100 object-cover"
              />

              <div className="flex-1">
                <h2 className="font-semibold">{item.name}</h2>
                <p className="mt-1 text-sm text-stone-500">
                  Quantity: {item.quantity}
                </p>
                <p className="mt-1 font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <div className="mt-2 flex gap-3 text-sm">
                  <button
                    onClick={() => addToCart(item)}
                    className="text-blue-700"
                  >
                    + Add
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between border-t pt-4 text-lg font-bold">
          <span>Total Amount</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <button
          onClick={openShopping}
          className="mt-5 w-full rounded-lg border border-stone-300 px-4 py-3 font-semibold hover:bg-stone-50"
        >
          ← Return to Shopping
        </button>
      </section>

      <section className="h-fit rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold">Credit Card Payment</h2>
        <p className="mt-2 text-sm text-stone-500">
          Enter demo details to test the payment form.
        </p>

        <form onSubmit={handlePayment} className="mt-6 space-y-4">
          <label className="block text-sm font-medium">
            Cardholder Name
            <input
              type="text"
              value={cardName}
              onChange={(event) => setCardName(event.target.value)}
              placeholder="Name on card"
              autoComplete="cc-name"
              required
              className="mt-2 w-full rounded-lg border border-stone-300 p-3 outline-none focus:border-amber-700"
            />
          </label>

          <label className="block text-sm font-medium">
            Card Number
            <input
              type="text"
              inputMode="numeric"
              value={cardNumber}
              onChange={(event) =>
                setCardNumber(
                  event.target.value.replace(/\D/g, "").slice(0, 16)
                )
              }
              placeholder="16-digit demo number"
              autoComplete="off"
              required
              className="mt-2 w-full rounded-lg border border-stone-300 p-3 outline-none focus:border-amber-700"
            />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="block text-sm font-medium">
              Expiry (MM/YY)
              <input
                type="text"
                value={expiry}
                onChange={(event) => setExpiry(event.target.value.slice(0, 5))}
                placeholder="MM/YY"
                autoComplete="off"
                required
                className="mt-2 w-full rounded-lg border border-stone-300 p-3 outline-none focus:border-amber-700"
              />
            </label>

            <label className="block text-sm font-medium">
              CVV
              <input
                type="password"
                inputMode="numeric"
                value={cvv}
                onChange={(event) =>
                  setCvv(event.target.value.replace(/\D/g, "").slice(0, 4))
                }
                placeholder="CVV"
                autoComplete="off"
                required
                className="mt-2 w-full rounded-lg border border-stone-300 p-3 outline-none focus:border-amber-700"
              />
            </label>
          </div>

          {message && (
            <p role="status" className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-amber-700 px-4 py-3 font-semibold text-white hover:bg-amber-800"
          >
            Pay ${total.toFixed(2)}
          </button>

          <p className="text-xs leading-5 text-stone-500">
            Demo only: this form does not contact a bank or process real
            payments. Do not enter real card details.
          </p>
        </form>
      </section>
    </main>
  );
}

function StoreApp() {
  const [page, setPage] = useState("shop");
  const [paymentMessage, setPaymentMessage] = useState("");
  const { cart, total } = useCart();

  function openShopping() {
    setPage("shop");
    setPaymentMessage("");
  }

  function openPayment() {
    if (cart.length === 0) return;
    setPage("payment");
    setPaymentMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function finishPayment() {
    // Demo only: do not clear cart or claim a real transaction occurred.
    setPaymentMessage("Payment form tested. No real transaction was made.");
  }

  return (
    <div className="min-h-screen bg-stone-100 text-stone-800">
      <Navbar
        openShopping={openShopping}
        openPayment={openPayment}
        page={page}
      />

      {page === "shop" ? (
        <ShoppingPage openPayment={openPayment} />
      ) : (
        <>
          {paymentMessage && (
            <div className="mx-auto mt-4 max-w-6xl px-4 text-sm text-green-700">
              {paymentMessage}
            </div>
          )}
          <PaymentPage
            openShopping={openShopping}
            finishPayment={finishPayment}
          />
        </>
      )}

      <footer className="bg-stone-900 px-4 py-5 text-center text-white">
        © 2026 ShoeStore. All rights reserved.
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <StoreApp />
    </CartProvider>
  );
}
