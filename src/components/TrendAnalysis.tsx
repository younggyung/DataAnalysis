import { useState } from "react";
import GraphView from "./GraphView";
import {
  FormData,
  agesOption,
  categories,
} from "../interface/ApiData.interface";
import { fetchDataRequest } from "../store/GraphDataSlice";
import { useAppDispatch } from "../store/hooks";
import {
  Button,
  Layout,
  Typography,
  Input,
  DatePicker,
  Select,
  Checkbox,
  Form,
} from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import dayjs from "dayjs";

const { Header, Content } = Layout;
const { Title } = Typography;
const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "black",
  height: 200,
  paddingInline: 100,
  lineHeight: "40px",
  backgroundColor: "white",
  marginTop: 10,
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  backgroundColor: "white",
  marginTop: 100,
};

function TrendAnalysis() : JSX.Element {
  const dispatch = useAppDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [timeUnit, setTimeUnit] = useState("date");
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const [device, setDevice] = useState("");
  const [gender, setGender] = useState("");
  const [ages, setAges] = useState<CheckboxValueType[]>([]);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const formData: FormData = {
      startDate: startDate,  //필수
      endDate: endDate,     //필수
      timeUnit: timeUnit,   //초기값(date)
      category: category,   //필수
      keyword: keyword,   //필수
      device: device,
      gender: gender,
      ages: ages,
    };

    //데이터 입력검증
    if (!startDate) {
      alert("시작일자를 입력해주세요");
      return;
    }
    if (!endDate) {
      alert("종료일자를 입력해주세요");
      return;
    }
    if (!category) {
      alert("카테고리를 설정해주세요");
      return;
    }
    dispatch(fetchDataRequest(formData));
  };

  const setAgesHandler = (checkedValues: CheckboxValueType[]) => {
    setAges(checkedValues);
  };

  return (
    <>
      <Layout style={{ backgroundColor: "white" }}>
        <Header style={headerStyle}>
          <Title level={2}>쇼핑 인사이트 키워드 연령별 트렌드 조회</Title>
          <form onSubmit={submitHandler}>
            <div className="essential-container">
              <label htmlFor="startDate">시작일자:</label>
              <DatePicker
                style={{ marginInline: "5px" }}
                onChange={(date, dateString) => setStartDate(dateString)}
              />
              <label htmlFor="endDate">종료일자:</label>
              <DatePicker
                style={{ marginInline: "5px" }}
                disabledDate={(currentDate) =>
                  currentDate.isAfter(dayjs(), "day")
                }
                onChange={(date, dateString) => setEndDate(dateString)}
              />

              <Select
                style={{ marginInline: "5px" }}
                defaultValue="카테고리"
                onChange={(value) => {
                  setCategory(value);
                }}
                options={categories}
              />

              <Input
                placeholder="키워드를 입력하세요"
                required
                style={{ width: 200, marginInline:"5px" }}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>

            <div className="option-container">
              <span style={{ paddingRight: "10px", fontSize: "12pt" }}>
                나이 :
              </span>
              <Checkbox.Group options={agesOption} onChange={setAgesHandler} />

              <Select
                style={{ marginInline: "5px" }}
                onChange={(value) => setGender(value)}
                defaultValue="성별"
                options={[
                  { value: "", label: "전체" },
                  { value: "m", label: "남성" },
                  { value: "f", label: "여성" },
                ]}
              />

              <Select
                style={{ marginInline: "5px" }}
                onChange={(value) => setDevice(value)}
                defaultValue="디바이스"
                options={[
                  { value: "", label: "전체" },
                  { value: "pc", label: "PC" },
                  { value: "mo", label: "Mobile" },
                ]}
              />
            </div>
            <Select
              onChange={(value) => setTimeUnit(value)}
              defaultValue="일간별"
              options={[
                { value: "date", label: "일간별" },
                { value: "week", label: "주간별" },
                { value: "month", label: "월간별" },
              ]}
            />
            <Button htmlType="submit">조회</Button>
          </form>
        </Header>
        <Content style={contentStyle}>
          <GraphView />
        </Content>
      </Layout>
    </>
  );
}

export default TrendAnalysis;
