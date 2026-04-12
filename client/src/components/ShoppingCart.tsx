import { useState, useMemo } from "react";
import { ShoppingCart as CartIcon, X, Plus, Minus } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

interface CartItem {
  bookId: number;
  title: string;
  price: number;
  quantity: number;
}

export function ShoppingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { user } = useAuth();
  const checkoutMutation = trpc.stripe.createCheckoutSession.useMutation();

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const addToCart = (bookId: number, title: string, price: number) => {
    const existing = cartItems.find((item) => item.bookId === bookId);
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.bookId === bookId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { bookId, title, price, quantity: 1 }]);
    }
  };

  const removeFromCart = (bookId: number) => {
    setCartItems(cartItems.filter((item) => item.bookId !== bookId));
  };

  const updateQuantity = (bookId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.bookId === bookId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0 || !user) return;

    // Checkout first book in cart
    const firstItem = cartItems[0];

    try {
      const session = await checkoutMutation.mutateAsync({
        bookId: firstItem.bookId,
        customerEmail: user.email || "customer@example.com",
        customerName: user.name || "Customer",
        origin: window.location.origin,
      });
      if (session.sessionUrl) {
        window.open(session.sessionUrl, "_blank");
        setCartItems([]);
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <>
      {/* Cart Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <CartIcon size={24} style={{ color: "#1A1A1A" }} />
        {cartItems.length > 0 && (
          <span
            className="absolute top-0 right-0 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white"
            style={{ backgroundColor: "#B8963E" }}
          >
            {cartItems.length}
          </span>
        )}
      </button>

      {/* Cart Panel */}
      {isOpen && (
        <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "#D1C9BB" }}>
            <h2 className="font-display text-xl font-bold" style={{ color: "#1A1A1A" }}>
              Shopping Cart
            </h2>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded">
              <X size={20} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <p style={{ color: "#6B7280" }}>Your cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.bookId} className="flex gap-4 pb-4 border-b" style={{ borderColor: "#D1C9BB" }}>
                  <div className="flex-1">
                    <h3 className="font-semibold" style={{ color: "#1A1A1A" }}>
                      {item.title}
                    </h3>
                    <p style={{ color: "#6B7280" }}>${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.bookId, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.bookId, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.bookId)}
                    className="p-1 hover:bg-red-100 rounded text-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-6 space-y-4" style={{ borderColor: "#D1C9BB" }}>
              <div className="flex justify-between text-lg font-bold" style={{ color: "#1A1A1A" }}>
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={checkoutMutation.isPending || !user}
                className="w-full py-3 rounded font-ui font-medium text-white transition-all disabled:opacity-50"
                style={{ backgroundColor: "#B8963E" }}
              >
                {checkoutMutation.isPending ? "Processing..." : !user ? "Sign in to checkout" : "Checkout"}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
