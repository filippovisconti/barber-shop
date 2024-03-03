import attributes from './attributes.json'
import { StoryWrapper } from '../StoryWrapper/StoryWrapper'
import { EmailBanner } from './EmailBanner'

export default { title: 'EmailBanner' }

export function Usage() {
    return <StoryWrapper attributes={attributes} component={EmailBanner} />
}
