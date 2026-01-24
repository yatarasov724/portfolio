const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Настройки оптимизации
const config = {
  png: {
    quality: 80,
    compressionLevel: 9,
  },
  jpg: {
    quality: 85,
    progressive: true,
  },
  maxWidth: 1920, // Максимальная ширина для изображений
};

// Найти все PNG и JPG файлы
function findImages(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findImages(filePath, fileList);
    } else if (/\.(png|jpg|jpeg)$/i.test(file)) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Оптимизировать изображение
async function optimizeImage(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const fileName = path.basename(filePath);
    const originalSize = fs.statSync(filePath).size;
    
    // Создаем временный файл
    const tempPath = filePath + '.tmp';
    
    let processor = sharp(filePath);
    
    // Получаем метаданные
    const metadata = await processor.metadata();
    
    // Уменьшаем размер если нужно
    if (metadata.width > config.maxWidth) {
      processor = processor.resize(config.maxWidth, null, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }
    
    // Применяем сжатие
    if (ext === '.png') {
      processor = processor.png({
        quality: config.png.quality,
        compressionLevel: config.png.compressionLevel,
        adaptiveFiltering: true,
      });
    } else if (ext === '.jpg' || ext === '.jpeg') {
      processor = processor.jpeg({
        quality: config.jpg.quality,
        progressive: config.jpg.progressive,
        mozjpeg: true,
      });
    }
    
    // Сохраняем во временный файл
    await processor.toFile(tempPath);
    
    const newSize = fs.statSync(tempPath).size;
    const savings = ((1 - newSize / originalSize) * 100).toFixed(1);
    
    // Заменяем только если размер меньше
    if (newSize < originalSize) {
      fs.renameSync(tempPath, filePath);
      console.log(`✅ ${fileName}: ${(originalSize / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB (${savings}% меньше)`);
      return { optimized: true, savedBytes: originalSize - newSize };
    } else {
      fs.unlinkSync(tempPath);
      console.log(`⏭️  ${fileName}: уже оптимизирован`);
      return { optimized: false, savedBytes: 0 };
    }
    
  } catch (error) {
    console.error(`❌ Ошибка при оптимизации ${filePath}:`, error.message);
    return { optimized: false, savedBytes: 0 };
  }
}

// Главная функция
async function main() {
  console.log('🔍 Поиск изображений...\n');
  
  const imagesDir = path.join(__dirname, '..', 'public', 'cases');
  const images = findImages(imagesDir);
  
  console.log(`Найдено ${images.length} изображений\n`);
  console.log('🚀 Начинаем оптимизацию...\n');
  
  let totalSaved = 0;
  let optimizedCount = 0;
  
  for (const imagePath of images) {
    const result = await optimizeImage(imagePath);
    if (result.optimized) {
      optimizedCount++;
      totalSaved += result.savedBytes;
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`✅ Оптимизировано: ${optimizedCount} из ${images.length}`);
  console.log(`💾 Сэкономлено: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
  console.log('='.repeat(60));
}

main().catch(console.error);
