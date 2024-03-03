import { StoryWrapper } from '../StoryWrapper/StoryWrapper'
import { GetInTouch } from './GetInTouch'
import attributes from './attributes.json'

export default { title: 'GetInTouch' }

export function Usage() {
    return <StoryWrapper attributes={attributes} component={GetInTouch} />
}
