import { selected } from "../types";

const OnDisplay = chosen => dispatch => {
    dispatch({
      type: selected,
      payload: chosen
    })
}

export default OnDisplay;