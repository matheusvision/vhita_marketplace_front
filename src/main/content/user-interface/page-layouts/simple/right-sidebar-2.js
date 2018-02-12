import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {FusePageSimple, DemoContent, DemoSidebarContent} from '@fuse';


const styles = theme => ({
    layoutRoot: {}
});

class SimpleRightSidebar2Sample extends Component {

    render()
    {
        const {classes} = this.props;
        return (
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                    <h4>Header</h4>
                }
                contentToolbar={
                    <h4>Content Toolbar</h4>
                }
                content={
                    <div>
                        <h4>Content</h4>
                        <br/>
                        <DemoContent/>
                    </div>
                }
                rightSidebarHeader={
                    <h4>Sidebar Header</h4>
                }
                rightSidebarContent={
                    <div>
                        <h4>Sidebar Content</h4>
                        <br/>
                        <DemoSidebarContent/>
                    </div>
                }
                singleScroll
            />
        )
    };
}

export default withStyles(styles, {withTheme: true})(SimpleRightSidebar2Sample);