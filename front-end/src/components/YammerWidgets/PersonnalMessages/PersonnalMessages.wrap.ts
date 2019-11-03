import {connect} from "react-redux";
import {PersonnalMessagesWrapper} from "./PersonnalMessages";

const mapStateToProps = (state: any) => {
    return {
        services: state.services.services
    }
}


export default connect(mapStateToProps, null)(PersonnalMessagesWrapper);