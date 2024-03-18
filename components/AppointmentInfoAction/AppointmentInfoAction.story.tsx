import { StoryWrapper } from '../StoryWrapper/StoryWrapper'
import { AppointmentInfoAction } from './AppointmentInfoAction'
import attributes from './attributes.json'

export default { title: 'AppointmentInfoAction' }

export function Usage() {
    return <StoryWrapper attributes={attributes} component={AppointmentInfoAction} />
}
