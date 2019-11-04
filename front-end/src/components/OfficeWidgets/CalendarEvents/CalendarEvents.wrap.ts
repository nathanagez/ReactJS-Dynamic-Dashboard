import { connect } from "react-redux";
import { CalendarWrapper } from "./CalendarEvents";

const mapStateToProps = (state: any) => {
	return {
		services: state.services.services
	};
};
export default connect(
	mapStateToProps,
	null
)(CalendarWrapper);
