const fs = require('fs');
const path = require('path');

// Ethiopian names
const firstNames = [
  'Abebe', 'Alem', 'Alemayehu', 'Amanuel', 'Ashenafi', 'Bereket', 'Dawit', 'Elias',
  'Fikru', 'Girma', 'Habtamu', 'Kebede', 'Mekonnen', 'Mesfin', 'Mulugeta', 'Samuel',
  'Tadesse', 'Tesfaye', 'Yohannes', 'Zerihun', 'Adanech', 'Aster', 'Birtukan', 'Desta',
  'Etenesh', 'Fikirte', 'Genet', 'Hirut', 'Kebebush', 'Mekdes', 'Meseret', 'Mulu',
  'Rahel', 'Selam', 'Tigist', 'Wubalem', 'Yordanos', 'Zewditu'
];

const lastNames = [
  'Abebe', 'Adane', 'Alemayehu', 'Assefa', 'Bekele', 'Desta', 'Fikadu', 'Gebre',
  'Hailu', 'Kebede', 'Lemma', 'Mekonnen', 'Nigatu', 'Sisay', 'Tadesse', 'Wolde',
  'Yohannes', 'Zerihun', 'Alem', 'Bekele', 'Desta', 'Fikru', 'Girma', 'Hailu',
  'Kebede', 'Lemma', 'Mekonnen', 'Nigatu', 'Sisay', 'Tadesse', 'Wolde', 'Yohannes'
];

// Ethiopian email domains
const emailDomains = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'ethionet.et', 'ethiotelecom.et',
  'aau.edu.et', 'addisababa.gov.et', 'ethiopianairlines.com'
];

// Helper functions
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomDate = (start, end) => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
};

const getRandomName = () => {
  const firstName = firstNames[getRandomInt(0, firstNames.length - 1)];
  const lastName = lastNames[getRandomInt(0, lastNames.length - 1)];
  return `${firstName} ${lastName}`;
};

const generateEmail = (fullName) => {
  const [firstName, lastName] = fullName.split(' ');
  const domain = emailDomains[getRandomInt(0, emailDomains.length - 1)];
  
  // Common Ethiopian email patterns
  const patterns = [
    `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
    `${firstName.toLowerCase()}${lastName.toLowerCase()}`,
    `${firstName.toLowerCase()}${lastName.charAt(0).toLowerCase()}`,
    `${lastName.toLowerCase()}.${firstName.toLowerCase()}`,
    `${firstName.charAt(0).toLowerCase()}${lastName.toLowerCase()}`,
    `${firstName.toLowerCase()}${getRandomInt(1, 99)}`
  ];
  
  const username = patterns[getRandomInt(0, patterns.length - 1)];
  return `${username}@${domain}`;
};

// Membership types and their corresponding package types
const membershipTypes = ['Standard', 'Premium', 'Lifetime'];
const packageTypes = ['Basic', 'Standard', 'Premium', 'Elite'];

// Discount types and their possible amounts
const discountTypes = [
  { type: 'Food & Beverage', min: 5, max: 30 },
  { type: 'Retail', min: 5, max: 25 },
  { type: 'Services', min: 10, max: 35 },
  { type: 'Events', min: 15, max: 40 },
  { type: 'Spa', min: 10, max: 30 },
  { type: 'Golf', min: 5, max: 20 }
];

// Generate a single member
const generateMember = (id) => {
  const fullName = getRandomName();
  const email = generateEmail(fullName);
  const membershipType = membershipTypes[getRandomInt(0, membershipTypes.length - 1)];
  const packageType = packageTypes[getRandomInt(0, packageTypes.length - 1)];
  const subscriptionDuration = getRandomInt(1, 5);
  
  const startDate = new Date(2018, 0, 1);
  const endDate = new Date(2025, 11, 31);
  const subscriptionStartDate = getRandomDate(startDate, endDate);
  const subscriptionEndDate = new Date(subscriptionStartDate);
  subscriptionEndDate.setFullYear(subscriptionEndDate.getFullYear() + subscriptionDuration);
  
  // Generate discounts based on package type
  const numDiscounts = getRandomInt(2, 4);
  const availableDiscounts = [...discountTypes];
  const discounts = [];
  
  for (let i = 0; i < numDiscounts; i++) {
    const discountIndex = getRandomInt(0, availableDiscounts.length - 1);
    const discountType = availableDiscounts[discountIndex];
    const amount = getRandomInt(discountType.min, discountType.max);
    discounts.push({
      discountType: discountType.type,
      discountAmount: amount
    });
    availableDiscounts.splice(discountIndex, 1);
  }

  return {
    id: `M${String(id).padStart(3, '0')}`,
    userInfo: {
      fullName: fullName,
      email: email,
      password: `hashed_password_${id}`,
      isMember: true,
      subscriptionStartDate: subscriptionStartDate,
      subscriptionEndDate: subscriptionEndDate.toISOString().split('T')[0],
      subscriptionDuration: subscriptionDuration
    },
    points: getRandomInt(500, 5000),
    membershipType: membershipType,
    packageInfo: {
      packageType: packageType,
      discounts: discounts
    }
  };
};

// Generate 100 members
const members = Array.from({ length: 100 }, (_, i) => generateMember(i + 1));

// Write to file
const data = { members };
fs.writeFileSync(
  path.join(__dirname, '../data/members.json'),
  JSON.stringify(data, null, 2)
);

console.log('Generated 100 members with Ethiopian names and emails successfully!'); 