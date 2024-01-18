import FuseExample from '@fuse/core/FuseExample';
                   import FuseHighlight from '@fuse/core/FuseHighlight';
                   import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
                   import Button from '@mui/material/Button';
                   import Icon from '@mui/material/Icon';
                   import Typography from '@mui/material/Typography';
				   import DocumentationPageBreadcrumb from '../../DocumentationPageBreadcrumb';
                   import ListDividersComponent from '../components/dividers/ListDividers';
import ListDividersRaw from '../components/dividers/ListDividers.tsx?raw';
import InsetDividersComponent from '../components/dividers/InsetDividers';
import InsetDividersRaw from '../components/dividers/InsetDividers.tsx?raw';
import SubheaderDividersComponent from '../components/dividers/SubheaderDividers';
import SubheaderDividersRaw from '../components/dividers/SubheaderDividers.tsx?raw';
import MiddleDividersComponent from '../components/dividers/MiddleDividers';
import MiddleDividersRaw from '../components/dividers/MiddleDividers.tsx?raw';
import DividerTextComponent from '../components/dividers/DividerText';
import DividerTextRaw from '../components/dividers/DividerText.tsx?raw';
import VerticalDividersComponent from '../components/dividers/VerticalDividers';
import VerticalDividersRaw from '../components/dividers/VerticalDividers.tsx?raw';
import VerticalDividerMiddleComponent from '../components/dividers/VerticalDividerMiddle';
import VerticalDividerMiddleRaw from '../components/dividers/VerticalDividerMiddle.tsx?raw';
import VerticalDividerTextComponent from '../components/dividers/VerticalDividerText';
import VerticalDividerTextRaw from '../components/dividers/VerticalDividerText.tsx?raw';
                   
                   function DividersDoc(props) {
                     return (
                       
                <>
					<div className="flex flex-1 sm:flex-row flex-col items-start justify-center grow-0 md:items-center md:justify-end md:space-between">
					  <DocumentationPageBreadcrumb />
					  <Button 
							className="normal-case"
							variant="contained"
                            color="secondary"
							component="a" 
							href="https://mui.com/components/dividers" 
							target="_blank"
							role="button"
							size="small"
							startIcon={<FuseSvgIcon size={20}>heroicons-outline:external-link</FuseSvgIcon>}
							>
							Reference
						</Button>
					</div>
                     <Typography className="text-32 my-16 font-700" component="h1">Divider</Typography>
<Typography className="description">A divider is a thin line that groups content in lists and layouts.</Typography>

<Typography className="text-14 mb-32" component="div">Dividers separate content into clear groups.</Typography>
<Typography className="text-24 mt-24 mb-10 font-700" component="h2">List dividers</Typography>
<Typography className="text-14 mb-32" component="div">The divider renders as an <code>{`<hr>`}</code> by default.
You can save rendering this DOM element by using the <code>{`divider`}</code> prop on the <code>{`ListItem`}</code> component.</Typography>
<Typography className="text-14 mb-32" component="div"><FuseExample
                    name="ListDividers.js"
                    className="my-16"
                    iframe={false}
                    component={ListDividersComponent} 
                    raw={ListDividersRaw}
                    /></Typography>
<Typography className="text-24 mt-24 mb-10 font-700" component="h2">HTML5 specification</Typography>
<Typography className="text-14 mb-32" component="div">In a list, you should ensure the <code>{`Divider`}</code> is rendered as an <code>{`<li>`}</code> to match the HTML5 specification.
The examples below show two ways of achieving this.</Typography>
<Typography className="text-24 mt-24 mb-10 font-700" component="h2">Inset dividers</Typography>
<Typography className="text-14 mb-32" component="div"><FuseExample
                    name="InsetDividers.js"
                    className="my-16"
                    iframe={false}
                    component={InsetDividersComponent} 
                    raw={InsetDividersRaw}
                    /></Typography>
<Typography className="text-24 mt-24 mb-10 font-700" component="h2">Subheader dividers</Typography>
<Typography className="text-14 mb-32" component="div"><FuseExample
                    name="SubheaderDividers.js"
                    className="my-16"
                    iframe={false}
                    component={SubheaderDividersComponent} 
                    raw={SubheaderDividersRaw}
                    /></Typography>
<Typography className="text-24 mt-24 mb-10 font-700" component="h2">Middle divider</Typography>
<Typography className="text-14 mb-32" component="div"><FuseExample
                    name="MiddleDividers.js"
                    className="my-16"
                    iframe={false}
                    component={MiddleDividersComponent} 
                    raw={MiddleDividersRaw}
                    /></Typography>
<Typography className="text-24 mt-24 mb-10 font-700" component="h2">Dividers with text</Typography>
<Typography className="text-14 mb-32" component="div">You can also render a divider with content.</Typography>
<Typography className="text-14 mb-32" component="div"><FuseExample
                    name="DividerText.js"
                    className="my-16"
                    iframe={false}
                    component={DividerTextComponent} 
                    raw={DividerTextRaw}
                    /></Typography>
<Typography className="text-14 mb-32" component="div">:::warning
When using the <code>{`Divider`}</code> component for visual decoration, such as in a heading, explicitly specify <code>{`role="presentation"`}</code> to the divider to make sure screen readers can announce its content:</Typography>

<FuseHighlight component="pre" className="language-js">
{` 
<Divider component="div" role="presentation">
  {/* any elements nested inside the role="presentation" preserve their semantics. */}
  <Typography variant="h2">My Heading</Typography>
</Divider>
`}
</FuseHighlight>
<Typography className="text-14 mb-32" component="div">:::</Typography>
<Typography className="text-24 mt-24 mb-10 font-700" component="h2">Vertical divider</Typography>
<Typography className="text-14 mb-32" component="div">You can also render a divider vertically using the <code>{`orientation`}</code> prop.</Typography>
<Typography className="text-14 mb-32" component="div"><FuseExample
                    name="VerticalDividers.js"
                    className="my-16"
                    iframe={false}
                    component={VerticalDividersComponent} 
                    raw={VerticalDividersRaw}
                    /></Typography>
<div className="border border-1 p-16 rounded-16 my-12">

<Typography className="text-14 mb-32" component="div">Note the use of the <code>{`flexItem`}</code> prop to accommodate for the flex container.</Typography>
</div>

<Typography className="text-16 mt-20 mb-10 font-700" component="h3">Vertical with variant middle</Typography>
<Typography className="text-14 mb-32" component="div">You can also render a vertical divider with <code>{`variant="middle"`}</code>.</Typography>
<Typography className="text-14 mb-32" component="div"><FuseExample
                    name="VerticalDividerMiddle.js"
                    className="my-16"
                    iframe={false}
                    component={VerticalDividerMiddleComponent} 
                    raw={VerticalDividerMiddleRaw}
                    /></Typography>
<Typography className="text-16 mt-20 mb-10 font-700" component="h3">Vertical with text</Typography>
<Typography className="text-14 mb-32" component="div">You can also render a vertical divider with content.</Typography>
<Typography className="text-14 mb-32" component="div"><FuseExample
                    name="VerticalDividerText.js"
                    className="my-16"
                    iframe={false}
                    component={VerticalDividerTextComponent} 
                    raw={VerticalDividerTextRaw}
                    /></Typography>

                </>
    
                     );
                   }
                   
                   export default DividersDoc;
                   