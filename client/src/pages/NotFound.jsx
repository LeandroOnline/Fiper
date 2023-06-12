import { Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="Lo sentimos, pagina no encontrada"
      subTitle={<button onClick={()=>navigate("/")}>Back Home</button>}
    />
  );
};
export default NotFound;
