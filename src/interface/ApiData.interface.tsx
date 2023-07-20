import { CheckboxValueType } from "antd/es/checkbox/Group";

//응답데이터 interface
interface AnalysisData {
  startDate: string;
  endDate: string;
  timeUnit: string;
  results: Result[];
}

interface Result {
  title: string;
  keyword: string[];
  data: Data[];
}

interface Data {
  period: string;
  group: string;
  ratio: number;
}

interface FormData {
  startDate: string;
  endDate: string;
  timeUnit: string;
  category: string;
  keyword: string;
  device?: string;
  gender?: string;
  ages?: CheckboxValueType[];
}

interface GraphDataState {
  formData?: "";
  isSearched: boolean;
  graphData: Data[];
  loading: boolean;
  error: string | null;
}

interface CategoryOption {
  label: string;
  value: string;
}

//네이버 쇼핑 카테고리
export const categories: CategoryOption[] = [
  {
    value: "50000008",
    label: "패션/의류",
  },
  {
    value: "50000000",
    label: "생활/건강",
  },
  {
    value: "50000005",
    label: "출산/육아",
  },
  {
    value: "50000003",
    label: "디지털/가전",
  },
  {
    value: "50000004",
    label: "가구/인테리어",
  },
  {
    value: "50000001",
    label: "패션/잡화",
  },
  {
    value: "50000007",
    label: "스포츠/레저",
  },
  {
    value: "50000002",
    label: "화장품/미용",
  },
  {
    value: "50000006",
    label: "식품",
  },
  {
    value: "50005542",
    label: "도서",
  },
  {
    value: "50000009",
    label: "여가/생활편의",
  },
  {
    value: "50000010",
    label: "면세점",
  },
];

//네이버 쇼핑 나이선택
export const agesOption: string[] = ["10", "20", "30", "40", "50", "60"];

export type { AnalysisData, Result, Data, FormData, GraphDataState };
