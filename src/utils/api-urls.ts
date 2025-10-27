// utils/api-urls.ts
export const getApiUrls = () => {
  const isClient = typeof window !== 'undefined';
  
  if (!isClient) {
    // Server-side: use HTTPS by default
    return {
      api_urls: process.env.NEXT_PUBLIC_API_URL_HTTPS || 'https://your-api-domain.com/',
      web_urls: process.env.NEXT_PUBLIC_API_URL_HTTPS || 'your-domain.com/',
      kundli_urls: process.env.NEXT_PUBLIC_KUNDLI_URL || 'https://kundli2.astrosetalk.com/'
    };
  }

  // Client-side: check protocol
  const protocol = window.location.protocol;
  const api_urls = protocol === 'http:' 
    ? process.env.NEXT_PUBLIC_API_URL_HTTP 
    : process.env.NEXT_PUBLIC_API_URL_HTTPS;

    const web_urls = protocol === 'http:' 
    ? process.env.NEXT_PUBLIC_API_URL_HTTPS 
    : process.env.NEXT_PUBLIC_API_URL_HTTPS;

  return {
    api_urls: api_urls || 'https://your-api-domain.com/',
    web_urls: web_urls || '/',
    kundli_urls: process.env.NEXT_PUBLIC_KUNDLI_URL || 'https://kundli2.astrosetalk.com/'
  };
};

export const { api_urls, web_urls, kundli_urls } = getApiUrls();
