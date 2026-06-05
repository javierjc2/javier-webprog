/**
 * seed.js
 * Run once after deploying to populate MongoDB Atlas:
 *   node seed.js
 */
require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const User     = require('./models/User');
const Article  = require('./models/Article');

const users = [
    { firstName: 'Alicia',  lastName: 'Reyes',   age: '29', gender: 'female', contactNumber: '09171234567', email: 'alicia.reyes@javier.dev',   role: 'admin',  username: 'aliciareyes',   password: 'Alicia123!',  address: 'Sampaloc, Manila, Metro Manila',  isActive: true  },
    { firstName: 'Marco',   lastName: 'Santos',  age: '31', gender: 'male',   contactNumber: '09182345678', email: 'marco.santos@javier.dev',   role: 'viewer', username: 'marcosantos',   password: 'Marco123!',   address: 'Tondo, Manila, Metro Manila',     isActive: true  },
    { firstName: 'Bianca',  lastName: 'Cruz',    age: '26', gender: 'female', contactNumber: '09193456789', email: 'bianca.cruz@javier.dev',    role: 'editor', username: 'biancacruz',    password: 'Bianca123!',  address: 'Quezon City, Metro Manila',       isActive: false },
    { firstName: 'Nathan',  lastName: 'Diaz',    age: '34', gender: 'male',   contactNumber: '09214567890', email: 'nathan.diaz@javier.dev',    role: 'viewer', username: 'nathandiaz',    password: 'Nathan123!',  address: 'Pasig City, Metro Manila',        isActive: true  },
    { firstName: 'Jasmine', lastName: 'Garcia',  age: '28', gender: 'female', contactNumber: '09225678901', email: 'jasmine.garcia@javier.dev', role: 'editor', username: 'jasminegarcia', password: 'Jasmine123!', address: 'Makati City, Metro Manila',       isActive: false },
    { firstName: 'Ethan',   lastName: 'Lopez',   age: '33', gender: 'male',   contactNumber: '09236789012', email: 'ethan.lopez@javier.dev',    role: 'viewer', username: 'ethanlopez',    password: 'Ethan123!',   address: 'Taguig City, Metro Manila',       isActive: true  },
];

const articles = [
    { slug: 'react',           title: 'Why My First React Project Almost Broke Me',        paragraphs: 1, preview: 'The struggles, debugging sessions, and lessons I learned while building my first React application.',               isActive: true },
    { slug: 'tailwind-css',    title: 'Building Clean UI Without Losing My Mind',           paragraphs: 1, preview: 'How Tailwind CSS helped me create responsive and modern interfaces with cleaner and faster styling.',              isActive: true },
    { slug: 'debugging',       title: 'The Bug Disappeared the Moment I Asked for Help',   paragraphs: 1, preview: 'A normal developer experience where the error magically fixed itself after explaining it to someone else.',         isActive: true },
    { slug: 'web-development', title: 'Things I Wish I Knew Before Learning Web Dev',       paragraphs: 1, preview: 'Important lessons and beginner mistakes I discovered throughout my coding journey.',                              isActive: true },
    { slug: 'ui-ux',           title: 'Why Good Spacing Makes Websites Look Professional', paragraphs: 1, preview: 'Learning how spacing, typography, and layout improved the quality of my website designs.',                         isActive: true },
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB Atlas');

        // Clear existing data
        await User.deleteMany({});
        await Article.deleteMany({});
        console.log('Cleared existing data');

        // Hash passwords then insert users
        const hashedUsers = await Promise.all(
            users.map(async (u) => ({
                ...u,
                password: await bcrypt.hash(u.password, 10),
            }))
        );
        await User.insertMany(hashedUsers);
        console.log(`✅ Seeded ${hashedUsers.length} users`);

        await Article.insertMany(articles);
        console.log(`✅ Seeded ${articles.length} articles`);

        console.log('\nSeed complete. You can now log in with:');
        console.log('  Admin  → alicia.reyes@javier.dev / Alicia123!');
        console.log('  Editor → bianca.cruz@javier.dev  / Bianca123! (inactive)');
        console.log('  Viewer → marco.santos@javier.dev / Marco123!  (login blocked)\n');

        process.exit(0);
    } catch (err) {
        console.error('Seed failed:', err.message);
        process.exit(1);
    }
};

seed();
