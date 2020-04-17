export const NEEDS_SHEET_NAME = "Public needs responses"
export const NEED_TYPES = {
  FINANCIAL: "Financial",
  SUPPLIES: "Supplies",
  TRANSPORTATION: "Transportation",
  HOUSING: "Housing",
  CHILDCARE_PETCARE: "Childcare/Petcare",
  EMOTIONAL_SUPPORT: "Emotional Support",
  RESOURCE_SUPPORT: "Resource Support",
}
export const NEEDS_SHEET_COLUMN_INDICES = {
  shared: {
    createdAt: 0,
    onBehalfOf: 1,
    name: 2,
    pronouns: 3,
    location: 4,
    preferredContactMethod: 5,
    contact: 6,
    interestedInConnecting: 7,
    neighborhoodName: 8,
  },

  // FINANCIAL NEED
  [NEED_TYPES.FINANCIAL]: {
    id: 9,
    meta: {
      needFrequency: 10,
      needTiming: 11,
      minFundingNeed: 14,
      maxFundingNeed: 15,
      fundingMethod: 16,
    },
  },

  // SUPPIES/ERRANDS NEED
  [NEED_TYPES.SUPPLIES]: {
    id: 18,
    meta: {
      needFrequency: 19,
      needTiming: 20,
      costCoverage: 21,
      details: 22,
      neighborhood: 23,
      store: 24,
      shoppingList: 25,
    },
  },

  // TRANSPORTATION
  [NEED_TYPES.TRANSPORTATION]: {
    id: 26,
    meta: {
      needFrequency: 27,
      needTiming: 28,
      details: 29,
      neighborhood: 30,
      comments: 31,
    },
  },

  // HOUSING
  [NEED_TYPES.HOUSING]: {
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

  [NEED_TYPES.CHILDCARE_PETCARE]: {
    id: 47,
    meta: {
      ageAndNumberOfKids: 48,
      typeOfRequest: 49,
      typeOfActivities: 50,
      needFrequency: 51,
      needTiming: 52,
      comments: 53,
      kindOfPets: 54,
      supportType: 55,
      petNeedFrequency: 56,
      petNeedTiming: 57,
      petComments: 58,
    },
  },

  [NEED_TYPES.EMOTIONAL_SUPPORT]: {
    id: 59,
    meta: {
      supportType: 60,
    },
  },

  [NEED_TYPES.RESOURCE_SUPPORT]: {
    id: 61,
    meta: {
      resourceSupportDetails: 62,
      otherCommunitySupport: 63,
      anythingToShare: 64,
    },
  },
}
