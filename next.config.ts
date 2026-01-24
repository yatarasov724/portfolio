import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Статический экспорт для GitHub Pages
  output: 'export',
  
  // basePath НЕ нужен для кастомного домена
  // basePath: '/portfolio', // Закомментировано для работы с yaroslavtarasov.com
  
  // Оптимизация изображений
  images: {
    unoptimized: true, // Обязательно для GitHub Pages
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Компрессия
  compress: true,
  
  // Экспериментальные оптимизации
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
