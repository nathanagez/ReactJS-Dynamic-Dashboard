import { connect } from "react-redux";
import { SchoolNotesWrapper } from "./SchoolNotes";

const mapStateToProps = (state: any) => {
	return {
		services: state.services.services
	};
};

export default connect(
	mapStateToProps,
	null
)(SchoolNotesWrapper);
