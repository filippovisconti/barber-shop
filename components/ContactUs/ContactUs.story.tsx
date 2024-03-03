import { StoryWrapper } from '../StoryWrapper/StoryWrapper'
import { ContactUs } from './ContactUs'
import attributes from './attributes.json'

export default { title: 'ContactUs' }

export function Usage() {
    return <StoryWrapper attributes={attributes} component={ContactUs} />
}
