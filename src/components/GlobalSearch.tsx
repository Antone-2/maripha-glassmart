import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Products data (same as Products page)
const allProducts = [
    { id: 1, name: "Clear Float Glass", category: "glass", price: "From KSH 800/sqm", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=75&fit=crop" },
    { id: 2, name: "Tinted Glass", category: "glass", price: "From KSH 1,200/sqm", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=75&fit=crop" },
    { id: 3, name: "Frameless Wall Mirror", category: "glass", price: "From KSH 3,200", image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=100&h=75&fit=crop" },
    { id: 4, name: "Glass Shelves", category: "glass", price: "From KSH 1,500", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=100&h=75&fit=crop" },
    { id: 5, name: "Interior Emulsion Paint", category: "paints", price: "KSH 2,500/20L", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=100&h=75&fit=crop" },
    { id: 6, name: "Exterior Weather Shield", category: "paints", price: "KSH 3,500/20L", image: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=100&h=75&fit=crop" },
    { id: 7, name: "Primer & Undercoat", category: "paints", price: "KSH 1,800/20L", image: "https://images.unsplash.com/photo-1558618047-f6e7c5b1e7e3?w=100&h=75&fit=crop" },
    { id: 8, name: "Stainless Steel Kitchen Sink", category: "sinks", price: "KSH 8,500", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=100&h=75&fit=crop" },
    { id: 9, name: "Ceramic Bathroom Basin", category: "sinks", price: "From KSH 4,500", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=100&h=75&fit=crop" },
    { id: 10, name: "Kitchen Mixer Tap", category: "sinks", price: "KSH 3,800", image: "https://images.unsplash.com/photo-1584622781867-1c5e27c4b1e5?w=100&h=75&fit=crop" },
    { id: 11, name: "Close-Coupled Toilet Set", category: "toilets", price: "KSH 12,000", image: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=100&h=75&fit=crop" },
    { id: 12, name: "Wall-Hung Toilet", category: "toilets", price: "KSH 25,000", image: "https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?w=100&h=75&fit=crop" },
    { id: 13, name: "Toilet Seat (Soft Close)", category: "toilets", price: "KSH 2,500", image: "https://images.unsplash.com/photo-1584622781867-1c5e27c4b1e5?w=100&h=75&fit=crop" },
    { id: 14, name: "Rain Shower Head", category: "showers", price: "KSH 4,500", image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=100&h=75&fit=crop" },
    { id: 15, name: "Shower Column Set", category: "showers", price: "KSH 18,000", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=100&h=75&fit=crop" },
    { id: 16, name: "Glass Shower Enclosure", category: "showers", price: "From KSH 35,000", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=100&h=75&fit=crop" },
];

const GlobalSearch = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<{ type: string; items: typeof allProducts }>({ type: "", items: [] });
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        if (!query.trim()) {
            setResults({ type: "", items: [] });
            return;
        }

        setIsLoading(true);

        // Simulate search delay
        const timer = setTimeout(() => {
            const searchTerm = query.toLowerCase();

            const matchedProducts = allProducts.filter(
                (product) =>
                    product.name.toLowerCase().includes(searchTerm)
            );

            setResults({
                type: "results",
                items: matchedProducts as any,
            });
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    const handleSelect = (item: any) => {
        setIsOpen(false);
        setQuery("");
        if (item.path) {
            navigate(item.path);
        } else {
            navigate(`/products/${item.id}`);
        }
    };

    return (
        <>
            <Button
                variant="outline"
                className="gap-2 text-muted-foreground"
                onClick={() => setIsOpen(true)}
            >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-2xl p-0 gap-0">
                    <div className="flex items-center border-b px-4">
                        <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                        <Input
                            ref={inputRef}
                            placeholder="Search products..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg h-14"
                        />
                        {isLoading && <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(false)}
                            className="shrink-0"
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    <div className="max-h-[60vh] overflow-y-auto">
                        {query.trim() && results.items.length === 0 && !isLoading && (
                            <div className="p-8 text-center">
                                <p className="text-muted-foreground">No results found for "{query}"</p>
                            </div>
                        )}

                        {query.trim() && results.items.length > 0 && (
                            <div className="p-2">
                                {results.items.map((item: any) => (
                                    <button
                                        key={item.id}
                                        onClick={() => handleSelect(item)}
                                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-left"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-12 h-9 object-cover rounded"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{item.name}</p>
                                            <p className="text-xs text-muted-foreground">{item.price}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="border-t px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <kbd className="rounded border bg-muted px-1.5 py-0.5">↵</kbd>
                            <span>to select</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <kbd className="rounded border bg-muted px-1.5 py-0.5">↑↓</kbd>
                            <span>to navigate</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <kbd className="rounded border bg-muted px-1.5 py-0.5">esc</kbd>
                            <span>to close</span>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default GlobalSearch;
