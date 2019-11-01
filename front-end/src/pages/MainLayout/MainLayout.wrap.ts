import { connect } from "react-redux";
import { MainLayoutWrapper } from "./MainLayout";
import { checkToken } from "../../redux/MainLayout/MainLayout.actions";
import {getServices} from "../../redux/services/services.actions";

const mapStateToProps = (state: any) => {
	return {
		userData: state.checkAuth.userData,
		services: state.services.services
	};
};

const mapDispatchToProps = {
	checkToken,
	getServices
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainLayoutWrapper);
