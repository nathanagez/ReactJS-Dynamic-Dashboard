import {connect} from "react-redux";
import {NavbarWrapper} from "./Navbar";
import {logUserOut} from "../../redux/login/login.actions";

const mapStateToProps = (state: any) => {
    return {
        user: state.login.user
    };
};

const mapDispatchToProps = {
    logUserOut
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarWrapper);