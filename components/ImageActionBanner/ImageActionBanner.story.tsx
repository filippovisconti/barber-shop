import { StoryWrapper } from '../StoryWrapper/StoryWrapper'
import { ImageActionBanner } from './ImageActionBanner'
import attributes from './attributes.json'

export default { title: 'ImageActionBanner' }

export function Usage() {
    return <StoryWrapper attributes={attributes} component={ImageActionBanner} />
}
