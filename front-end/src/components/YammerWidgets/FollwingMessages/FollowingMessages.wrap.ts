import { connect } from "react-redux";
import {FollowingMessagesWrapper} from "./FollowingMessages";

const mapStateToProps = (state: any) => {
    return {
        services: state.services.services
    }
}

export default connect(mapStateToProps, null)(FollowingMessagesWrapper);