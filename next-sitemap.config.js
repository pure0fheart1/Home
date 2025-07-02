/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://yourname.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/admin/*', '/api/*', '/private/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/private/'],
      },
    ],
    additionalSitemaps: [
      `${process.env.SITE_URL || 'https://yourname.com'}/sitemap.xml`,
    ],
  },
  transform: async (config, path) => {
    // Custom priority and change frequency
    const priority = path === '/' ? 1.0 : 0.8;
    const changefreq = path === '/' ? 'daily' : 'weekly';
    
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
}; 