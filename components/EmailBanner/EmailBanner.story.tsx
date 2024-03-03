import { StoryWrapper } from '../StoryWrapper/StoryWrapper'
import { EmailBanner } from './EmailBanner'
import attributes from './attributes.json'

export default { title: 'EmailBanner' }

export function Usage() {
    return <StoryWrapper attributes={attributes} component={EmailBanner} />
}
