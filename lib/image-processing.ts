import sharp from 'sharp';

export interface ImageProcessingOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  filter?: 'none' | 'vintage' | 'warm' | 'cool' | 'bright';
}

export async function processImage(
  imageBuffer: Buffer,
  options: ImageProcessingOptions = {}
): Promise<Buffer> {
  const {
    width = 1200,
    height = 800,
    quality = 85,
    format = 'webp',
    fit = 'cover',
    filter = 'none',
  } = options;

  let pipeline = sharp(imageBuffer).resize(width, height, {
    fit,
    position: 'center',
  });

  // Apply filters
  switch (filter) {
    case 'vintage':
      pipeline = pipeline
        .modulate({ saturation: 0.7, brightness: 1.1 })
        .tint({ r: 255, g: 220, b: 180 });
      break;
    case 'warm':
      pipeline = pipeline
        .modulate({ saturation: 1.2 })
        .tint({ r: 255, g: 240, b: 220 });
      break;
    case 'cool':
      pipeline = pipeline
        .modulate({ saturation: 1.1 })
        .tint({ r: 220, g: 235, b: 255 });
      break;
    case 'bright':
      pipeline = pipeline.modulate({ brightness: 1.2, saturation: 1.1 });
      break;
  }

  // Convert to desired format
  if (format === 'jpeg') {
    pipeline = pipeline.jpeg({ quality });
  } else if (format === 'png') {
    pipeline = pipeline.png({ quality });
  } else if (format === 'webp') {
    pipeline = pipeline.webp({ quality });
  }

  return await pipeline.toBuffer();
}

export async function createThumbnail(
  imageBuffer: Buffer,
  size: number = 300
): Promise<Buffer> {
  return await sharp(imageBuffer)
    .resize(size, size, {
      fit: 'cover',
      position: 'center',
    })
    .webp({ quality: 80 })
    .toBuffer();
}

export async function autoEnhance(imageBuffer: Buffer): Promise<Buffer> {
  return await sharp(imageBuffer)
    .normalize() // Auto-adjust contrast
    .sharpen() // Enhance sharpness
    .toBuffer();
}
