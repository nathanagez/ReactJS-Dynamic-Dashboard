import { connect } from "react-redux";
import { MainLayoutWrapper } from "./MainLayout";
import { checkToken } from "../../redux/MainLayout/MainLayout.actions";

const mapStateToProps = (state: any) => {
	return {
		userData: state.checkAuth.userData
	};
};

const mapDispatchToProps = {
	checkToken
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainLayoutWrapper);
