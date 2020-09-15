import styled from "styled-components";

import Sizings from "../../styles/sizings";

const Card = styled.div`
  background-color: white;

  -webkit-box-shadow: 0px 3px 40px -1px rgba(107, 107, 107, 0.38);
  -moz-box-shadow: 0px 3px 40px -1px rgba(107, 107, 107, 0.38);
  box-shadow: 0px 3px 40px -1px rgba(107, 107, 107, 0.38);

  padding: ${Sizings.MARGIN_3};
  border-radius: ${Sizings.BORDER_RADIUS};
`;

export default Card;
