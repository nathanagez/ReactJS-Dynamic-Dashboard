import { connect } from "react-redux";
import {PrivateRouteWrapper} from "./Protected";

const mapStateToProps = (state: any) => {
    return {
        user: state.login.user
    }
}

export default connect<{}, null, any>(mapStateToProps,null)(PrivateRouteWrapper);