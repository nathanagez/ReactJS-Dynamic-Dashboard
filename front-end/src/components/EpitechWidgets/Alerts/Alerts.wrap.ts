import { connect } from "react-redux";
import { AlertsWrapper } from "./Alerts";
import {closeWidget} from "../../../redux/widgets/widgets.actions";

const mapStateToProps = (state: any) => {
	return {
		services: state.services.services
	};
};

const mapDispatchToProps = {
	closeWidget
}

export default connect<any, any, any>(
	mapStateToProps,
	mapDispatchToProps
)(AlertsWrapper);
