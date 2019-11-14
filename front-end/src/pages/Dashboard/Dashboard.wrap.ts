import {connect} from "react-redux";
import {Dashboard} from "./Dashboard";

const mapStateToProps = (state: any) => {
    return {
        services: state.services.services,
    }
}

export default connect(mapStateToProps, null)(Dashboard);