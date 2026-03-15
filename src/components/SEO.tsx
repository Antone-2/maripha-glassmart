import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    author?: string;
    type?: 'website' | 'article' | 'product';
    publishedTime?: string;
    modifiedTime?: string;
}

const SITE_NAME = 'Maripha Glassmart';
const SITE_URL = 'https://mariphaglass.co.ke';
const DEFAULT_IMAGE = '/og-image.jpg';
const DEFAULT_DESCRIPTION = 'Maripha Glassmart - Your trusted supplier of quality glass, paints, and sanitary ware in Busia, Kenya. Expert glass cutting, mirrors, paints, sinks, toilets, and showers.';
const DEFAULT_KEYWORDS = 'glass, mirrors, paints, sanitary ware, Busia, Kenya, glass cutting, windows, doors, showers, sinks, toilets';

export const SEO = ({
    title,
    description = DEFAULT_DESCRIPTION,
    keywords = DEFAULT_KEYWORDS,
    image = DEFAULT_IMAGE,
    url = SITE_URL,
    author = 'Maripha Glassmart',
    type = 'website',
    publishedTime,
    modifiedTime,
}: SEOProps) => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const fullUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;
    const fullImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <meta name="robots" content="index, follow" />
            <meta name="googlebot" content="index, follow" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:site_name" content={SITE_NAME} />

            {publishedTime && <meta property="article:published_time" content={publishedTime} />}
            {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={fullUrl} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={fullImage} />

            {/* Canonical */}
            <link rel="canonical" href={fullUrl} />

            {/* Additional SEO */}
            <meta name="theme-color" content="#0f766e" />
            <meta name="msapplication-TileColor" content="#0f766e" />
        </Helmet>
    );
};

// Structured Data for Organization
export const OrganizationSchema = () => (
    <Helmet>
        <script type="application/ld+json">
            {JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Maripha Glassmart',
                url: SITE_URL,
                logo: `${SITE_URL}/logo.png`,
                description: DEFAULT_DESCRIPTION,
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Main Street, Busia Town',
                    addressLocality: 'Busia',
                    addressRegion: 'Busia County',
                    addressCountry: 'KE',
                },
                contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: '+254728508906',
                    contactType: 'customer service',
                    availableLanguage: ['en', 'sw'],
                },
                sameAs: [
                    'https://facebook.com/mariphaglass',
                    'https://instagram.com/mariphaglass',
                ],
            })}
        </script>
    </Helmet>
);

// Structured Data for Local Business
export const LocalBusinessSchema = () => (
    <Helmet>
        <script type="application/ld+json">
            {JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: 'Maripha Glassmart',
                image: `${SITE_URL}/logo.png`,
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Main Street, Busia Town',
                    addressLocality: 'Busia',
                    addressRegion: 'Busia County',
                    postalCode: '',
                    addressCountry: 'KE',
                },
                geo: {
                    '@type': 'GeoCoordinates',
                    latitude: '0.4604',
                    longitude: '34.1069',
                },
                openingHoursSpecification: [
                    {
                        '@type': 'OpeningHoursSpecification',
                        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                        opens: '08:00',
                        closes: '18:00',
                    },
                    {
                        '@type': 'OpeningHoursSpecification',
                        dayOfWeek: 'Saturday',
                        opens: '08:00',
                        closes: '17:00',
                    },
                ],
                telephone: '+254728508906',
                priceRange: 'KSH',
            })}
        </script>
    </Helmet>
);

export default SEO;
