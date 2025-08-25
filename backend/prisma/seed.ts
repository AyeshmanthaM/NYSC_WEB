import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create namespaces
  console.log('📂 Creating translation namespaces...');
  const namespaces = [
    { name: 'common', description: 'Common translations used across the site', sortOrder: 1 },
    { name: 'header', description: 'Header navigation and branding', sortOrder: 2 },
    { name: 'dropdown', description: 'Dropdown menu items', sortOrder: 3 },
    { name: 'home', description: 'Homepage content', sortOrder: 4 },
    { name: 'services', description: 'Services section content', sortOrder: 5 },
    { name: 'courses', description: 'Courses and training content', sortOrder: 6 },
    { name: 'testimonials', description: 'User testimonials', sortOrder: 7 },
    { name: 'newsevents', description: 'News and events content', sortOrder: 8 },
    { name: 'footer', description: 'Footer links and information', sortOrder: 9 },
  ];

  for (const namespace of namespaces) {
    await prisma.translationNamespace.upsert({
      where: { name: namespace.name },
      update: {},
      create: namespace
    });
  }

  // Create admin user
  console.log('👤 Creating admin user...');
  const hashedPassword = await bcryptjs.hash('admin123', 12);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@nysc.lk' },
    update: {},
    create: {
      email: 'admin@nysc.lk',
      password: hashedPassword,
      name: 'System Administrator',
      role: 'ADMIN',
      isActive: true
    }
  });

  // Seed translations from existing JSON files
  console.log('🌐 Seeding translations from files...');
  
  const frontendLocalesPath = path.join(__dirname, '../../frontend/src/locales');
  const languages = ['en', 'si', 'ta'];
  
  let totalTranslations = 0;

  for (const language of languages) {
    for (const namespace of namespaces) {
      const filePath = path.join(frontendLocalesPath, language, `${namespace.name}.json`);
      
      try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const translations = JSON.parse(fileContent);
        
        for (const [key, value] of Object.entries(translations)) {
          if (typeof value === 'string') {
            // Check if translation already exists
            const existing = await prisma.translation.findUnique({
              where: {
                namespace_key_language: {
                  namespace: namespace.name,
                  key,
                  language
                }
              }
            });

            if (!existing) {
              // Create translation
              const translation = await prisma.translation.create({
                data: {
                  namespace: namespace.name,
                  key,
                  language,
                  value: value as string
                }
              });

              // Create initial version
              await prisma.translationVersion.create({
                data: {
                  translationId: translation.id,
                  version: 1,
                  value: value as string,
                  createdBy: adminUser.id
                }
              });

              // Create audit log
              await prisma.translationAudit.create({
                data: {
                  translationId: translation.id,
                  action: 'CREATE',
                  newValue: value as string,
                  userId: adminUser.id,
                  ipAddress: '127.0.0.1',
                  userAgent: 'Database Seeder'
                }
              });

              totalTranslations++;
            }
          }
        }
        
        console.log(`  ✅ Loaded ${language}/${namespace.name}`);
      } catch (error) {
        console.log(`  ⚠️  Could not load ${language}/${namespace.name}: ${error}`);
      }
    }
  }

  console.log(`🎉 Seeding completed!`);
  console.log(`📊 Statistics:`);
  console.log(`   - Namespaces: ${namespaces.length}`);
  console.log(`   - Languages: ${languages.length}`);
  console.log(`   - New translations: ${totalTranslations}`);
  console.log(`   - Admin user: admin@nysc.lk (password: admin123)`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });