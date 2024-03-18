import { StoryWrapper } from '../StoryWrapper/StoryWrapper'
import { ServiceInfoAction } from './ServiceInfoAction'
import attributes from './attributes.json'

export default { title: 'ServiceInfoAction' }

export function Usage() {
    return <StoryWrapper attributes={attributes} component={ServiceInfoAction} />
}
