import { StoryWrapper } from '../StoryWrapper/StoryWrapper'
import { UserInfoAction } from './UserInfoAction'
import attributes from './attributes.json'

export default { title: 'UserInfoAction' }

export function Usage() {
    return <StoryWrapper attributes={attributes} component={UserInfoAction} />
}
