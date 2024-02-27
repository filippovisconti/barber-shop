import attributes from './attributes.json';
import { StoryWrapper } from '../StoryWrapper/StoryWrapper';
import { ImageActionBanner } from './ImageActionBanner';

export default { title: 'ImageActionBanner' };

export function Usage() {
	return <StoryWrapper attributes={attributes} component={ImageActionBanner} />;
}
