export interface eventFiltersInfo {
  sedCompanyCount: number;
  companyLimit: number;
}

export interface HistogramsRequestParams {
  intervalType: "month";
  histogramTypes: ["totalDocuments", "riskFactors"];
  similarMode: "none";
  limit: number;
  sortType: "issueDate";
  sortDirectionType: "desc";
  attributeFilters: {
    excludeTechNews: boolean;
    excludeAnnouncements: boolean;
    excludeDigests: boolean;
  };
  issueDateInterval: {
    startDate: string;
    endDate: string;
  };
  searchContext: {
    targetSearchEntitiesContext: {
      targetSearchEntities: [TargetSearchEntity];
    };
  };
  tonality: "any" | "negative" | "positive";
  onlyMainRole: boolean;
  onlyWithRiskFactors: boolean;
}

export interface TargetSearchEntity {
  type: "company";
  isBuisnessNews: boolean | null;
  sparkId: number | null;
  entityId: number | null;
  inn: string;
  maxFulness: boolean;
}

export type HistogramData = Array<{
  data: Array<{ date: string; value: number }>;
  histogramType: "totalDocuments" | "riskFactiors";
}>;

export interface DocumentsRequest {
  ids: Array<string>;
}
