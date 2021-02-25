import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
const LinkButton = ({ src, children, small = false }) => {
  return (
    <Link to={src}>
      <Button className={` ${small ? "w-30" : "w-100"} mt-2 `}>
        {children}
      </Button>
    </Link>
  );
};

export default LinkButton;
