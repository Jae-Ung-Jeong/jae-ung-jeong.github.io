import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // TODO(#23): 배포 도메인으로 변경
  const baseUrl = 'https://junheedot.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/ko`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];
}
