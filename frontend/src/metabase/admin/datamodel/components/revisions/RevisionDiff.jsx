import React, { Component, PropTypes } from "react";

import TextDiff from "./TextDiff.jsx";
import QueryDiff from "./QueryDiff.jsx";

import Icon from "metabase/components/Icon.jsx";

export default class RevisionDiff extends Component {
    static propTypes = {
        property: PropTypes.string.isRequired,
        diff: PropTypes.object.isRequired,
        tableMetadata: PropTypes.object.isRequired
    };

    render() {
        let { diff: { before, after }, tableMetadata} = this.props;

        let icon;
        if (before != null && after != null) {
            icon = <Icon name="pencil" className="text-brand" size={16} />
        } else if (before != null) {
            icon = <Icon name="add" className="text-error" size={16} />
        } else {
            // TODO: "minus" icon
            icon = <Icon name="add" className="text-green" size={16} />
        }

        return (
            <div className="bordered rounded my2" style={{borderWidth: 2, overflow: 'hidden', maxWidth: 860}}>
                <div className="flex align-center scroll-x scroll-show scroll-show-horizontal">
                    <div className="m3" style={{lineHeight: 0}}>
                        {icon}
                    </div>
                    <div>
                        { this.props.property === "definition" ?
                            <QueryDiff diff={this.props.diff} tableMetadata={tableMetadata}/>
                        :
                            <TextDiff diff={this.props.diff}/>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
