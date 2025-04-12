export interface Discount {
  type: string;
  value: number;
  validUntil: string;
}

export interface Member {
  id: string;
  fullName: string;
  email: string;
  password: string;
  membershipType: "Premium" | "Gold" | "Silver";
  packageType: "Annual" | "Monthly" | "Quarterly";
  subscriptionDate: string;
  subscriptionDuration: number;
  points: number;
  discounts: Discount[];
} 