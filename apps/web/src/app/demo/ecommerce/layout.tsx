import { CartProvider } from "@/components/providers/cart-provider";
import { CartDrawer } from "@/components/ecommerce/cart-drawer";
import { CartButton } from "@/components/ecommerce/cart-button";

export default function EcommerceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      {/* Store nav bar */}
      <div className="sticky top-10 z-40 border-b bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-6">
          <span className="text-sm font-semibold tracking-tight">Maison Artisan</span>
          <CartButton />
        </div>
      </div>

      {children}

      {/* Cart drawer lives at layout level so it's always accessible */}
      <CartDrawer />
    </CartProvider>
  );
}
