import { NextRequest, NextResponse } from 'next/server';
import { processImage } from '@/lib/image-processing';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const filter = formData.get('filter') as string || 'none';

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Process image
    const processedBuffer = await processImage(buffer, {
      width: 1200,
      height: 800,
      quality: 85,
      format: 'webp',
      fit: 'cover',
      filter: filter as any,
    });

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (error) {
      // Directory already exists
    }

    // Save processed image
    const filename = `${Date.now()}-${file.name.replace(/\.[^/.]+$/, '')}.webp`;
    const filepath = path.join(uploadsDir, filename);
    await writeFile(filepath, processedBuffer);

    // Return public URL
    const url = `/uploads/${filename}`;

    return NextResponse.json({
      url,
      filename,
      size: processedBuffer.length,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
