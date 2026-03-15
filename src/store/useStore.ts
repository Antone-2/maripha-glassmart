import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
    id: string;
    name: string;
    price: string;
    quantity: number;
    image: string;
}

interface User {
    id: string;
    email: string;
    name: string;
    phone: string;
}

interface AppState {
    // Cart
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    cartTotal: () => number;

    // UI State
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
    closeMobileMenu: () => void;

    // Wishlist
    wishlist: string[];
    addToWishlist: (id: string) => void;
    removeFromWishlist: (id: string) => void;
    isInWishlist: (id: string) => boolean;

    // Loading states
    isLoading: boolean;
    setLoading: (loading: boolean) => void;

    // Auth
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
}

export const useStore = create<AppState>()(
    persist(
        (set, get) => ({
            // Cart
            cart: [],
            addToCart: (item) => set((state) => {
                const existingItem = state.cart.find((i) => i.id === item.id);
                if (existingItem) {
                    return {
                        cart: state.cart.map((i) =>
                            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                        ),
                    };
                }
                return { cart: [...state.cart, { ...item, quantity: 1 }] };
            }),
            removeFromCart: (id) => set((state) => ({
                cart: state.cart.filter((item) => item.id !== id),
            })),
            updateQuantity: (id, quantity) => set((state) => ({
                cart: state.cart.map((item) =>
                    item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
                ).filter((item) => item.quantity > 0),
            })),
            clearCart: () => set({ cart: [] }),
            cartTotal: () => get().cart.reduce((total, item) => total + item.quantity, 0),

            // UI State
            isMobileMenuOpen: false,
            toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
            closeMobileMenu: () => set({ isMobileMenuOpen: false }),

            // Wishlist
            wishlist: [],
            addToWishlist: (id) => set((state) => ({
                wishlist: state.wishlist.includes(id) ? state.wishlist : [...state.wishlist, id],
            })),
            removeFromWishlist: (id) => set((state) => ({
                wishlist: state.wishlist.filter((itemId) => itemId !== id),
            })),
            isInWishlist: (id) => get().wishlist.includes(id),

            // Loading states
            isLoading: false,
            setLoading: (loading) => set({ isLoading: loading }),

            // Auth
            user: null,
            token: null,
            isAuthenticated: false,
            login: (user, token) => set({ user, token, isAuthenticated: true }),
            logout: () => set({ user: null, token: null, isAuthenticated: false }),
        }),
        {
            name: 'maripha-storage',
            partialize: (state) => ({
                cart: state.cart,
                wishlist: state.wishlist,
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
