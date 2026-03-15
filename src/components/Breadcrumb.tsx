import { Link, useLocation } from "react-router-dom";
import { Home, ChevronRight } from "lucide-react";

interface BreadcrumbItem {
    label: string;
    path?: string;
}

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    const getBreadcrumbs = (): BreadcrumbItem[] => {
        const breadcrumbs: BreadcrumbItem[] = [
            { label: "Home", path: "/" }
        ];

        const routeNames: Record<string, string> = {
            "products": "Products",
            "product-detail": "Product Details",
            "services": "Services",
            "gallery": "Gallery",
            "quote": "Get Quote",
            "contact": "Contact Us",
            "about": "About Us",
            "faq": "FAQ",
            "privacy-policy": "Privacy Policy",
            "terms-of-service": "Terms of Service",
            "return-policy": "Return Policy",
            "cart": "Shopping Cart",
            "wishlist": "Wishlist",
        };

        pathnames.forEach((path, index) => {
            // Check if it's a product detail page with ID
            if (path === "product-detail" && pathnames[index + 1]) {
                breadcrumbs.push({
                    label: "Product Details",
                    path: `/product-detail`
                });
                breadcrumbs.push({
                    label: "View Product",
                    path: undefined // Current page, no link
                });
            } else if (pathnames[index + 1]) {
                // Has children
                const label = routeNames[path] || path;
                breadcrumbs.push({
                    label: label.charAt(0).toUpperCase() + label.slice(1),
                    path: `/${path}`
                });
            } else {
                // Current page
                const label = routeNames[path] || path;
                breadcrumbs.push({
                    label: label.charAt(0).toUpperCase() + label.slice(1),
                    path: undefined
                });
            }
        });

        return breadcrumbs;
    };

    const breadcrumbs = getBreadcrumbs();

    // Don't show on home page
    if (pathnames.length === 0) return null;

    return (
        <nav className="bg-muted/30 py-3 px-4">
            <div className="container mx-auto">
                <ol className="flex items-center gap-1 text-sm flex-wrap">
                    {breadcrumbs.map((item, index) => {
                        const isLast = index === breadcrumbs.length - 1;

                        return (
                            <li key={index} className="flex items-center gap-1">
                                {index > 0 && (
                                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                )}

                                {item.path && !isLast ? (
                                    <Link
                                        to={item.path}
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {index === 0 ? (
                                            <Home className="w-4 h-4" />
                                        ) : (
                                            item.label
                                        )}
                                    </Link>
                                ) : (
                                    <span
                                        className={`${isLast
                                                ? "text-primary font-medium"
                                                : "text-muted-foreground"
                                            }`}
                                    >
                                        {index === 0 ? (
                                            <Home className="w-4 h-4" />
                                        ) : (
                                            item.label
                                        )}
                                    </span>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </div>
        </nav>
    );
};

export default Breadcrumb;
