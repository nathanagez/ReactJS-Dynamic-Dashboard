import { connect } from "react-redux";
import { Wrapper } from "./Login";
import { logUserIn } from "../../redux/login/login.actions";

const mapStateToProps = (state: any) => {
	return {
		user: state.login.user,
		loading: state.login.loading
	};
};

const mapDispatchToProps = {
	logUserIn
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Wrapper);
