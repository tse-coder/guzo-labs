export interface Discount {
  discountType: string;
  discountAmount: number;
}

export interface PackageInfo {
  packageType: string;
  discounts: Discount[];
}

export interface UserInfo {
  fullName: string;
  email: string;
  password: string;
  isMember: boolean;
  subscriptionStartDate: string;
  subscriptionEndDate: string;
  subscriptionDuration: number;
}

export interface Member {
  id: string;
  userInfo: UserInfo;
  points: number;
  membershipType: string;
  packageInfo: PackageInfo;
}

// Ethiopian names
const firstNames = [
  'Abebe', 'Alem', 'Alemayehu', 'Amanuel', 'Ashenafi', 'Bereket', 'Dawit', 'Elias',
  'Fikru', 'Girma', 'Habtamu', 'Kebede', 'Mekonnen', 'Mesfin', 'Mulugeta', 'Samuel',
  'Tadesse', 'Tesfaye', 'Yohannes', 'Zerihun', 'Adanech', 'Aster', 'Birtukan', 'Desta',
  'Etenesh', 'Fikirte', 'Genet', 'Hirut', 'Kebebush', 'Mekdes', 'Meseret', 'Mulu',
  'Rahel', 'Selam', 'Tigist', 'Wubalem', 'Yordanos', 'Zewditu', 'Abel', 'Addis',
  'Aklilu', 'Amare', 'Assefa', 'Bekele', 'Berhanu', 'Desta', 'Endale', 'Fasil',
  'Gebre', 'Hailu', 'Kassa', 'Lemma', 'Nigatu', 'Sisay', 'Tadesse', 'Wolde',
  'Yohannes', 'Zerihun', 'Alem', 'Bekele', 'Desta', 'Fikru', 'Girma', 'Hailu',
  'Kebede', 'Lemma', 'Mekonnen', 'Nigatu', 'Sisay', 'Tadesse', 'Wolde', 'Yohannes',
  'Zerihun', 'Adanech', 'Aster', 'Birtukan', 'Desta', 'Etenesh', 'Fikirte', 'Genet',
  'Hirut', 'Kebebush', 'Mekdes', 'Meseret', 'Mulu', 'Rahel', 'Selam', 'Tigist',
  'Wubalem', 'Yordanos', 'Zewditu'
];

const lastNames = [
  'Abebe', 'Adane', 'Alemayehu', 'Assefa', 'Bekele', 'Desta', 'Fikadu', 'Gebre',
  'Hailu', 'Kebede', 'Lemma', 'Mekonnen', 'Nigatu', 'Sisay', 'Tadesse', 'Wolde',
  'Yohannes', 'Zerihun', 'Alem', 'Bekele', 'Desta', 'Fikru', 'Girma', 'Hailu',
  'Kebede', 'Lemma', 'Mekonnen', 'Nigatu', 'Sisay', 'Tadesse', 'Wolde', 'Yohannes',
  'Zerihun', 'Adane', 'Alemayehu', 'Assefa', 'Bekele', 'Desta', 'Fikadu', 'Gebre',
  'Hailu', 'Kebede', 'Lemma', 'Mekonnen', 'Nigatu', 'Sisay', 'Tadesse', 'Wolde',
  'Yohannes', 'Zerihun'
];

// Ethiopian email domains
const emailDomains = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'ethionet.et', 'ethiotelecom.et',
  'aau.edu.et', 'addisababa.gov.et', 'ethiopianairlines.com'
];

// Helper functions
const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomDate = (start: Date, end: Date) => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
};

const getRandomName = () => {
  const firstName = firstNames[getRandomInt(0, firstNames.length - 1)];
  const lastName = lastNames[getRandomInt(0, lastNames.length - 1)];
  return `${firstName} ${lastName}`;
};

const generateEmail = (fullName: string) => {
  const [firstName, lastName] = fullName.split(' ');
  const domain = emailDomains[getRandomInt(0, emailDomains.length - 1)];
  
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

// Generate 100 members
const generateMembers = (): Member[] => {
  const members: Member[] = [];
  const startDate = new Date(2018, 0, 1);
  const endDate = new Date(2025, 11, 31);
  
  for (let i = 1; i <= 100; i++) {
    const fullName = getRandomName();
    const email = generateEmail(fullName);
    const membershipType = ['Standard', 'Premium', 'Lifetime'][getRandomInt(0, 2)];
    const packageType = ['Basic', 'Standard', 'Premium', 'Elite'][getRandomInt(0, 3)];
    const subscriptionDuration = getRandomInt(1, 5);
    const subscriptionStartDate = getRandomDate(startDate, endDate);
    const subscriptionEndDate = new Date(subscriptionStartDate);
    subscriptionEndDate.setFullYear(subscriptionEndDate.getFullYear() + subscriptionDuration);
    
    // Generate discounts
    const numDiscounts = getRandomInt(2, 4);
    const availableDiscounts = [
      { type: 'Food & Beverage', min: 5, max: 30 },
      { type: 'Retail', min: 5, max: 25 },
      { type: 'Services', min: 10, max: 35 },
      { type: 'Events', min: 15, max: 40 },
      { type: 'Spa', min: 10, max: 30 },
      { type: 'Golf', min: 5, max: 20 }
    ];
    
    const discounts: Discount[] = [];
    for (let j = 0; j < numDiscounts; j++) {
      const discountIndex = getRandomInt(0, availableDiscounts.length - 1);
      const discountType = availableDiscounts[discountIndex];
      const amount = getRandomInt(discountType.min, discountType.max);
      discounts.push({
        discountType: discountType.type,
        discountAmount: amount
      });
      availableDiscounts.splice(discountIndex, 1);
    }

    members.push({
      id: `M${String(i).padStart(3, '0')}`,
      userInfo: {
        fullName,
        email,
        password: `hashed_password_${i}`,
        isMember: true,
        subscriptionStartDate,
        subscriptionEndDate: subscriptionEndDate.toISOString().split('T')[0],
        subscriptionDuration
      },
      points: getRandomInt(500, 5000),
      membershipType,
      packageInfo: {
        packageType,
        discounts
      }
    });
  }
  
  return members;
};

export const members: Member[] = generateMembers(); 