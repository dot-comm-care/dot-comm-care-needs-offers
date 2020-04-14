export const NEEDS_SHEET_NAME = "Public needs responses"

export const NEEDS_SHEET_COLUMN_INDICES = {
  createdAt: 0,
  onBehalfOf: 1,
  name: 2,
  pronouns: 3,
  location: 4,
  preferredContactMethod: 5,
  contact: 6,
  interestedInConnecting: 7,
  neighborhoodName: 8,

  // FINANCIAL NEED
  isFinancialNeed: 9,
  financial_needFrequency: 10,
  financial_needTiming: 11,
  financial_minFundingNeed: 14,
  financial_maxFundingNeed: 15,
  financial_fundingMethod: 16,

  // SUPPIES/ERRANDS NEED
  isSuppliesNeed: 18,
  supplies_needFrequency: 19,
  supplies_needTiming: 21,
  supplies_details: 22,
  supplies_neighborhood: 23,
  supplies_store: 24,
  supplies_shoppingList: 25,

  // TRANSPORTATION
  isTransportationNeed: 26,
  transportation_needFrequency: 27,
  transporation_needTiming: 28,
  transportation_details: 29,
  transportation_neighborhood: 30,
  transportation_comments: 31,

  // HOUSING
  housing: {
    id: 32,
    meta: {
      whatKindOfSpace: 33,
      needTiming: 34,
      needTransportationToHousing: 35,
      bedPreferences: 36,
      petAllergies: 37,
      dietaryRestrictions: 38,
      mobility: 39,
      neighborhood: 40,
      ageGenderPreference: 41,
      comments: 42,
      storageQuantity: 43,
      climateControlled: 44,
      storageNeedTiming: 45,
      storageComments: 46,
    },
  },
}

export const NEED_TYPES = {
  FINANCIAL: "Financial",
  SUPPLIES: "Supplies",
  TRANSPORTATION: "Transportation",
  HOUSING: "Housing",
}
