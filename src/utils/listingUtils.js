export const NEEDS_SHEET_NAME = "Form Responses 1"

export const NEEDS_SHEET_COLUMN_INDICES = {
  createdAt: 0,
  name: 2,
  pronouns: 3,
  location: 4,
  preferredContactMethod: 5,
  contact: 6,
  neighborhoodName: 8,
  public: 9,
  isFirstNeed: 11,

  // FINANCIAL NEED
  isFinancialNeed: 12,
  financial_needFrequency: 13,
  financial_needTiming: 14,
  financial_minFundingNeed: 17,
  financial_maxFundingNeed: 18,
  financial_fundingMethod: 19,

  // SUPPIES/ERRANDS NEED
  isSuppliesNeed: 20,
  supplies_needFrequency: 21,
  supplies_needTiming: 22,
  supplies_details: 23,
  supplies_neighborhood: 24,
  supplies_store: 25,
  supplies_shoppingList: 26,
}

export const NEED_TYPES = {
  FINANCIAL: "Financial",
  SUPPLIES: "Supplies",
}
