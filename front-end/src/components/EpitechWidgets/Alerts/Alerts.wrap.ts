import { connect } from "react-redux";
import { AlertsWrapper } from "./Alerts";

const mapStateToProps = (state: any) => {
	return {
		services: state.services.services
	};
};

export default connect(
	mapStateToProps,
	null
)(AlertsWrapper);
