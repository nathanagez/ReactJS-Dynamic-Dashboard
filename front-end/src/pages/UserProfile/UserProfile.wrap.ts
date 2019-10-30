import { connect } from "react-redux";
import { UserProfile } from "./UserProfile";
import { saveServiceToken, getServices } from "../../redux/services/services.actions";

const mapDispatchToProps = {
    saveServiceToken,
    getServices
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
