import { connect } from "react-redux";
import { UserProfile } from "./UserProfile";
import { saveServiceToken, getServices, saveOfficeToken } from "../../redux/services/services.actions";

const mapDispatchToProps = {
    saveServiceToken,
    getServices,
    saveOfficeToken
};

const mapStateToProps = (state: any) => {
	return {
        name: state.services.name,
        services: state.services.services,
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserProfile);
