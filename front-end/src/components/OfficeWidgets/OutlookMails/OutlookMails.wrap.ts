import { connect } from "react-redux";
import { OutlookMailsWrapper } from "./OutlookMails";

const mapStateToProps = (state: any) => {
    return {
        services: state.services.services
    };
};

export default connect(mapStateToProps, null)(OutlookMailsWrapper);