export interface helpSupportDetailProps {
  selectedItemIndex;
}

export interface FaqProps {
  selectedItemIndex: number | null;
  faqData: any;
  staticFaqData: any;
  loading: boolean;
  refreshing: boolean;
  linkData: any;
  search: string;
}
