import { StoryWrapper } from '../StoryWrapper/StoryWrapper'
import { AuthenticationForm } from './AuthenticationForm'
import attributes from './attributes.json'

export default { title: 'AuthenticationForm' }

export function Usage() {
    return <StoryWrapper attributes={attributes} component={AuthenticationForm} />
}
