import attributes from './attributes.json';
import { StoryWrapper } from '../StoryWrapper/StoryWrapper';
import { AuthenticationForm } from './AuthenticationForm';

export default { title: 'AuthenticationForm' };

export function Usage() {
	return <StoryWrapper attributes={attributes} component={AuthenticationForm} />;
}
