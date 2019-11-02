import { connect } from "react-redux";
import { ModulesWrapper } from "./Modules";

const mapStateToProps = (state: any) => {
	return {
		services: state.services.services
	};
};

export default connect(
	mapStateToProps,
	null
)(ModulesWrapper);
