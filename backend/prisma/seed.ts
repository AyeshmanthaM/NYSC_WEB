import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create default admin user
  const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@nysc.lk';
  const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'SecurePassword123!';
  const adminFirstName = process.env.DEFAULT_ADMIN_FIRST_NAME || 'System';
  const adminLastName = process.env.DEFAULT_ADMIN_LAST_NAME || 'Administrator';

  // Hash password
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        firstName: adminFirstName,
        lastName: adminLastName,
        role: Role.SUPER_ADMIN,
        isActive: true,
        emailVerified: true,
        profile: {
          create: {
            bio: 'System Administrator with full access to NYSC platform.',
          },
        },
      },
      include: {
        profile: true,
      },
    });

    console.log(`✅ Created SUPER_ADMIN user: ${admin.email}`);
  } else {
    console.log(`👤 SUPER_ADMIN user already exists: ${adminEmail}`);
  }

  // Create additional test users for development
  if (process.env.NODE_ENV === 'development') {
    const testUsers = [
      {
        email: 'editor@nysc.lk',
        password: 'EditorPass123!',
        firstName: 'Content',
        lastName: 'Editor',
        role: Role.EDITOR,
        bio: 'Content editor responsible for news and events.',
      },
      {
        email: 'moderator@nysc.lk',
        password: 'ModeratorPass123!',
        firstName: 'Content',
        lastName: 'Moderator',
        role: Role.MODERATOR,
        bio: 'Content moderator with approval permissions.',
      },
      {
        email: 'admin2@nysc.lk',
        password: 'AdminPass123!',
        firstName: 'Site',
        lastName: 'Admin',
        role: Role.ADMIN,
        bio: 'Site administrator with user management access.',
      },
      {
        email: 'user@nysc.lk',
        password: 'UserPass123!',
        firstName: 'Test',
        lastName: 'User',
        role: Role.USER,
        bio: 'Regular user for testing purposes.',
      },
    ];

    for (const userData of testUsers) {
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (!existingUser) {
        const hashedUserPassword = await bcrypt.hash(userData.password, 12);
        
        const user = await prisma.user.create({
          data: {
            email: userData.email,
            password: hashedUserPassword,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: userData.role,
            isActive: true,
            emailVerified: true,
            profile: {
              create: {
                bio: userData.bio,
              },
            },
          },
        });

        console.log(`✅ Created ${userData.role} user: ${user.email}`);
      }
    }
  }

  // Create default system settings
  const defaultSettings = [
    {
      key: 'site_name',
      value: 'NYSC Sri Lanka',
      type: 'string',
      description: 'Official name of the website',
    },
    {
      key: 'site_description',
      value: 'National Youth Services Council of Sri Lanka - Empowering Youth Through Development Programs',
      type: 'string',
      description: 'Site description for SEO',
    },
    {
      key: 'contact_email',
      value: 'info@nysc.lk',
      type: 'string',
      description: 'Primary contact email address',
    },
    {
      key: 'contact_phone',
      value: '+94 11 234 5678',
      type: 'string',
      description: 'Primary contact phone number',
    },
    {
      key: 'office_address',
      value: '123 Parliament Road, Colombo 07, Sri Lanka',
      type: 'string',
      description: 'Main office address',
    },
    {
      key: 'maintenance_mode',
      value: 'false',
      type: 'boolean',
      description: 'Enable/disable maintenance mode',
    },
    {
      key: 'user_registration',
      value: 'true',
      type: 'boolean',
      description: 'Allow new user registrations',
    },
    {
      key: 'max_file_size',
      value: '10485760',
      type: 'number',
      description: 'Maximum file upload size in bytes (10MB)',
    },
    {
      key: 'allowed_file_types',
      value: 'jpg,jpeg,png,gif,pdf,doc,docx,xls,xlsx',
      type: 'string',
      description: 'Comma-separated list of allowed file extensions',
    },
    {
      key: 'session_timeout',
      value: '86400000',
      type: 'number',
      description: 'Session timeout in milliseconds (24 hours)',
    },
  ];

  for (const setting of defaultSettings) {
    const existingSetting = await prisma.setting.findUnique({
      where: { key: setting.key },
    });

    if (!existingSetting) {
      await prisma.setting.create({
        data: setting,
      });
      console.log(`⚙️ Created setting: ${setting.key}`);
    }
  }

  // Create sample news articles (development only)
  if (process.env.NODE_ENV === 'development') {
    const adminUser = await prisma.user.findFirst({
      where: { role: Role.SUPER_ADMIN },
    });

    if (adminUser) {
      const sampleArticles = [
        {
          title: 'NYSC Launches New Youth Development Program',
          slug: 'nysc-launches-new-youth-development-program',
          content: `
            <p>The National Youth Services Council of Sri Lanka is proud to announce the launch of our comprehensive Youth Development Program, designed to empower young Sri Lankans with essential skills and opportunities for personal and professional growth.</p>
            
            <p>This innovative program includes:</p>
            <ul>
              <li>Vocational training in high-demand sectors</li>
              <li>Leadership development workshops</li>
              <li>Entrepreneurship support and mentoring</li>
              <li>Community service projects</li>
            </ul>
            
            <p>Applications are now open for the first cohort, which will begin in March 2025. We encourage all eligible youth aged 18-25 to apply and take advantage of this transformative opportunity.</p>
          `,
          excerpt: 'NYSC announces a comprehensive Youth Development Program to empower young Sri Lankans with essential skills and opportunities.',
          category: 'Program Launch',
          tags: '["youth-development", "training", "leadership", "entrepreneurship"]',
          featured: true,
          publishedAt: new Date(),
        },
        {
          title: 'Youth Parliament Session Successfully Concluded',
          slug: 'youth-parliament-session-successfully-concluded',
          content: `
            <p>The 2024 Youth Parliament session has been successfully concluded with remarkable participation from young representatives across all provinces of Sri Lanka.</p>
            
            <p>Key highlights of this session include:</p>
            <ul>
              <li>Discussion on youth employment initiatives</li>
              <li>Proposals for educational reforms</li>
              <li>Environmental conservation projects</li>
              <li>Digital literacy programs</li>
            </ul>
            
            <p>The session provided valuable experience for young parliamentarians and generated actionable recommendations that will be forwarded to relevant government ministries.</p>
          `,
          excerpt: 'The 2024 Youth Parliament session concluded successfully with young representatives discussing key national issues.',
          category: 'Events',
          tags: '["youth-parliament", "governance", "participation"]',
          featured: false,
          publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        },
      ];

      for (const article of sampleArticles) {
        const existingArticle = await prisma.newsArticle.findUnique({
          where: { slug: article.slug },
        });

        if (!existingArticle) {
          await prisma.newsArticle.create({
            data: {
              ...article,
              authorId: adminUser.id,
              status: 'PUBLISHED',
            },
          });
          console.log(`📰 Created news article: ${article.title}`);
        }
      }
    }
  }

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });